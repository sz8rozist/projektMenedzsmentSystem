package com.example.projekt_menedzsment.controller;

import com.example.projekt_menedzsment.model.Board;
import com.example.projekt_menedzsment.model.Projekt;
import com.example.projekt_menedzsment.service.ProjektService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projekt")
@CrossOrigin(origins = "*", maxAge = 15555)
public class ProjektController {

    private final ProjektService projektService;

    public ProjektController(ProjektService projektService) {
        this.projektService = projektService;
    }

    @GetMapping("/{user_id}")
    public List<Projekt> getProjektByUser(@PathVariable Long user_id){
        return projektService.getProjektByUserId(user_id);
    }

    @PostMapping("/{user_id}")
    public ResponseEntity<?> saveProjekt(@RequestBody Projekt projekt, @PathVariable Long user_id){
        Projekt newProjekt = projektService.insertProjekt(projekt, user_id);
        if(newProjekt != null){
            return ResponseEntity.ok(newProjekt);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Hiba történt");
    }
}
