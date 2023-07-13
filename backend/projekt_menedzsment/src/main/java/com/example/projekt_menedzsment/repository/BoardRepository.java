package com.example.projekt_menedzsment.repository;

import com.example.projekt_menedzsment.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findBoardsByProjekt_Id(Long projekt_id);
     void deleteById(Long id);
}
