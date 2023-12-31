package com.example.projekt_menedzsment.repository;

import com.example.projekt_menedzsment.model.Projekt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProjektRepository extends JpaRepository<Projekt, Long> {
    @Override
    Page<Projekt> findAll(Pageable pageable);

    List<Projekt> findProjektsByUser_Id(Long user_id);
}
