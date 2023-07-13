package com.example.projekt_menedzsment.controller;

import com.example.projekt_menedzsment.Response;
import com.example.projekt_menedzsment.model.Projekt;
import com.example.projekt_menedzsment.model.User;
import com.example.projekt_menedzsment.service.ProjektService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 15555)
public class ProjektController {

    private final ProjektService projektService;

    public ProjektController(ProjektService projektService) {
        this.projektService = projektService;
    }

    @GetMapping("/projekt/{user_id}")
    public List<Projekt> getProjektByUser(@PathVariable Long user_id){
        Response response = new Response();
        return projektService.getProjektByUserId(user_id);
    }
}
