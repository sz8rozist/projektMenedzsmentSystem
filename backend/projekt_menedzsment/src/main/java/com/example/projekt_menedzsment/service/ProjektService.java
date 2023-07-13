package com.example.projekt_menedzsment.service;

import com.example.projekt_menedzsment.model.Projekt;
import com.example.projekt_menedzsment.repository.ProjektRepository;
import com.example.projekt_menedzsment.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjektService {
    @Autowired
    private final ProjektRepository projektRepository;

    public ProjektService(ProjektRepository projektRepository) {
        this.projektRepository = projektRepository;
    }

    public List<Projekt> getProjektByUserId(Long id){
        return projektRepository.findProjektsByUser_Id(id);
    }
}
