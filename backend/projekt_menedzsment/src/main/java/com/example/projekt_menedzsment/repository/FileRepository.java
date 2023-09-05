package com.example.projekt_menedzsment.repository;

import com.example.projekt_menedzsment.model.UploadFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<UploadFile,Long> {
}
