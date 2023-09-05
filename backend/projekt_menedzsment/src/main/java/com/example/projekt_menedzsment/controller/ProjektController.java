package com.example.projekt_menedzsment.controller;

import com.example.projekt_menedzsment.exception.ApiRequestException;
import com.example.projekt_menedzsment.response.ApiResponse;
import com.example.projekt_menedzsment.model.Projekt;
import com.example.projekt_menedzsment.service.ProjektService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projekt")
@CrossOrigin(origins = "*", maxAge = 0)
public class ProjektController {
    @Autowired
    private  ProjektService projektService;


    @GetMapping
    public ApiResponse<List<Projekt>> getProjekt(){
        List<Projekt> projekt =  projektService.getProjekt();
        return new ApiResponse<>(projekt.size(), "", projekt);
    }

    @GetMapping("/pagination/{offset}/{pageSize}")
    public ApiResponse<Page<Projekt>> getProjektByPagination(@PathVariable("offset") int offset, @PathVariable("pageSize") int pageSize){
        Page<Projekt> projekt =  projektService.findProjektsWithPaginate(offset, pageSize);
        return new ApiResponse<>(projekt.getContent().size(), "", projekt);
    }

    @PostMapping("/{user_id}")
    public ResponseEntity<?> saveProjekt(@RequestBody Projekt projekt, @PathVariable Long user_id){
        Projekt newProjekt = projektService.insertProjekt(projekt, user_id);
        if(newProjekt != null){
            return ResponseEntity.ok(newProjekt);
        }
        throw new ApiRequestException("Sikertelen projekt mentés!");
    }

    @DeleteMapping("/{projektId}")
    public ResponseEntity<?> delete(@PathVariable Long projektId){
        projektService.deleteProjekt(projektId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("/{projektId}")
    public ResponseEntity<?> update(@PathVariable Long projektId, @RequestBody Projekt projekt){
       Projekt newProjekt = projektService.updateProjekt(projektId, projekt);
       if(newProjekt == null){
           throw new ApiRequestException("Nem található a projekt!");
       }
        return new ResponseEntity<>(newProjekt,HttpStatus.OK);
    }
}
