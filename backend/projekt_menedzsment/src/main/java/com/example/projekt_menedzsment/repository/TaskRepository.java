package com.example.projekt_menedzsment.repository;

import com.example.projekt_menedzsment.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findTasksByBoard_id(Long board_id);
    Optional<Task> findById(Long id);
}
