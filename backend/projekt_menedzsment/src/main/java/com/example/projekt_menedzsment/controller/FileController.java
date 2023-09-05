package com.example.projekt_menedzsment.controller;
import com.example.projekt_menedzsment.exception.ApiRequestException;
import com.example.projekt_menedzsment.model.Projekt;
import com.example.projekt_menedzsment.model.UploadFile;
import com.example.projekt_menedzsment.response.ApiResponse;
import com.example.projekt_menedzsment.service.FileService;
import com.example.projekt_menedzsment.service.ProjektService;
import jakarta.annotation.Resource;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;


@RestController
@RequestMapping("/file")
@CrossOrigin(origins = "*", maxAge = 0)
public class FileController {
    @Autowired
    private FileService fileService;
    @Autowired
    private ProjektService projektService;
    @GetMapping
    public ResponseEntity<List<UploadFile>> getFiles(){
        List<UploadFile> uploadFiles = fileService.getFiles();
        return ResponseEntity.ok(uploadFiles);
    }
    @PostMapping("/upload/{projektId}")
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files") List<MultipartFile> multipartFiles, @PathVariable("projektId") Long projektId) throws  IOException {
        List<String> filenames = new ArrayList<>();
        for(MultipartFile file : multipartFiles) {

            String originalFileName = file.getOriginalFilename();
            String fileName = UUID.randomUUID() + "_" + originalFileName;

            Path path = Paths.get("src/uploads/files/" + File.separator + fileName);
            // Biztonságos másolás a cél mappába
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            filenames.add(fileName);

            Projekt projekt = projektService.getProjektById(projektId);

            // Fájl nevének mentése az adatbázisba
            UploadFile uploadFile = new UploadFile();
            uploadFile.setFileName(fileName);
            uploadFile.setUploadedDate(LocalDate.now());
            uploadFile.setProjekt(projekt);
            uploadFile.setContentType(file.getContentType());
            uploadFile.setOrigName(file.getOriginalFilename());
            fileService.saveFile(uploadFile);
        }
        return ResponseEntity.ok().body(filenames);
    }

    @GetMapping("download/{id}")
    public ResponseEntity<FileSystemResource> downloadFiles(@PathVariable("id") Long id) {
        UploadFile uploadFile = fileService.getFileById(id);
        if(uploadFile == null){
            throw new ApiRequestException("Nem található fájl az adatbázisban");
        }
        String filePath = "src/uploads/files/" + uploadFile.getFileName();
        File file = new File(filePath);
        if(!file.exists()) {
            throw new ApiRequestException(uploadFile.getFileName() + " nem található a szerveren!");
        }
        FileSystemResource resource =  new FileSystemResource(file);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, uploadFile.getContentType())
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + uploadFile.getOrigName() + "\"")
                .body(resource);
    }
}
