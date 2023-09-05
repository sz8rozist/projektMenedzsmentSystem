package com.example.projekt_menedzsment.controller;

import com.example.projekt_menedzsment.exception.ApiRequestException;
import com.example.projekt_menedzsment.model.Task;
import com.example.projekt_menedzsment.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TaskController {

    @Autowired
    private  TaskService taskService;

    @PutMapping("/{board_column_id}")
    public ResponseEntity<?> updateTask(@RequestBody Long new_board_id, @PathVariable Long task_id){
        Task updated = taskService.updateBoardColumn(new_board_id, task_id);
        if(updated != null){
            return ResponseEntity.ok(updated);
        }
        throw new ApiRequestException("Sikertelen feladat frissítés!");
    }


    @PostMapping("/{boardId}")
    public ResponseEntity<?> newTask(@PathVariable("boardId") Long board_id, @RequestBody Task task){
        Task newTask = taskService.newTask(board_id, task);
        if(newTask != null){
            return ResponseEntity.ok(newTask);
        }
        throw new ApiRequestException("Sikertelen feladat hozzáadás!");
    }
}
