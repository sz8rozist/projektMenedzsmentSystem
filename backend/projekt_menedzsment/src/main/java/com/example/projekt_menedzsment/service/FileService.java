package com.example.projekt_menedzsment.service;

import com.example.projekt_menedzsment.exception.ApiRequestException;
import com.example.projekt_menedzsment.model.Projekt;
import com.example.projekt_menedzsment.model.UploadFile;
import com.example.projekt_menedzsment.repository.FileRepository;
import com.example.projekt_menedzsment.repository.ProjektRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FileService {
    @Autowired
    private FileRepository fileRepository;
    @Autowired
    private ProjektRepository projektRepository;



    public void saveFile(UploadFile uploadFile) {
        fileRepository.save(uploadFile);
    }

    public List<UploadFile> getFiles() {
        return fileRepository.findAll();
    }

    public UploadFile getFileById(Long id){
        return fileRepository.findById(id).orElse(null);
    }
}
