package com.example.projekt_menedzsment.repository;

import com.example.projekt_menedzsment.model.Projekt;
import com.example.projekt_menedzsment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
