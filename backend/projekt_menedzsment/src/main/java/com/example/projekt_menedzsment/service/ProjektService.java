package com.example.projekt_menedzsment.service;

import com.example.projekt_menedzsment.model.Projekt;
import com.example.projekt_menedzsment.model.User;
import com.example.projekt_menedzsment.repository.ProjektRepository;
import com.example.projekt_menedzsment.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjektService {
    @Autowired
    private final ProjektRepository projektRepository;
    @Autowired
    private final UserRepository userRepository;

    public ProjektService(ProjektRepository projektRepository, UserRepository userRepository) {
        this.projektRepository = projektRepository;
        this.userRepository = userRepository;
    }

    public List<Projekt> getProjektByUserId(Long id){
        return projektRepository.findProjektsByUser_Id(id);
    }

    public Projekt insertProjekt(Projekt projekt, Long user_id) {
        User user = userRepository.findUserById(user_id);
        if(user != null){
            projekt.setUser(user);
            return projektRepository.save(projekt);
        }
        return null;
    }
}
