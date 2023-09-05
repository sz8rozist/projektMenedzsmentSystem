package com.example.projekt_menedzsment.service;

import com.example.projekt_menedzsment.exception.ApiRequestException;
import com.example.projekt_menedzsment.model.Projekt;
import com.example.projekt_menedzsment.model.User;
import com.example.projekt_menedzsment.repository.ProjektRepository;
import com.example.projekt_menedzsment.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Service
public class ProjektService {
    @Autowired
    private  ProjektRepository projektRepository;
    @Autowired
    private  UserRepository userRepository;

    public List<Projekt> getProjekt(){
        return projektRepository.findAll();
    }

    public Projekt insertProjekt(Projekt projekt, Long user_id) {
        User user = userRepository.findUserById(user_id);
        if(user != null){
            projekt.setUser(user);
            return projektRepository.save(projekt);
        }
        return null;
    }

    public List<Projekt> findProjektsWithSorting(String field){
        return projektRepository.findAll(Sort.by(Sort.Direction.ASC, field));
    }

    public Page<Projekt> findProjektsWithPaginate(int offSet, int pageSize){
        return projektRepository.findAll(PageRequest.of(offSet, pageSize));
    }

    public void deleteProjekt(Long projektId) {
        Projekt projekt = projektRepository.findById(projektId)
                .orElseThrow(() -> new ApiRequestException("Nem található projekt!"));
        projektRepository.delete(projekt);
    }

    public Projekt updateProjekt(Long projektId, Projekt newProjekt) {
        Projekt p = projektRepository.findById(projektId).orElse(null);
        if(p != null){
            p.setName(newProjekt.getName());
            p.setDescription(newProjekt.getDescription());
            return projektRepository.save(p);
        }
       return null;
    }

    public Projekt getProjektById(Long id){
        Projekt p = projektRepository.findById(id).orElse(null);
        if(p == null){
            throw new ApiRequestException("Nem található projekt");
        }
        return p;
    }
}
