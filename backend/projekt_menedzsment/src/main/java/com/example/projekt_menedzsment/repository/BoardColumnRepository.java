package com.example.projekt_menedzsment.repository;

import com.example.projekt_menedzsment.model.BoardColumn;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardColumnRepository extends JpaRepository<BoardColumn, Long> {
    List<BoardColumn> findBoardColumnsByBoard_id(Long board_id);
    Optional<BoardColumn> findById(Long id);
}
