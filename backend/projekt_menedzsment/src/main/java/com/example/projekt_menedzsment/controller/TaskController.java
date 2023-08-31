package com.example.projekt_menedzsment.controller;

import com.example.projekt_menedzsment.model.Task;
import com.example.projekt_menedzsment.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TaskController {

    private final TaskService taskService;
    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @PutMapping("/{board_column_id}")
    public ResponseEntity<?> updateBoardColumn(@RequestBody Long new_board_id, @PathVariable Long board_column_id){
        System.out.println(new_board_id + board_column_id);
        Task updated = taskService.updateBoardColumn(new_board_id, board_column_id);
        if(updated != null){
            return new  ResponseEntity<>(updated, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @PostMapping("/{boardId}")
    public ResponseEntity<?> newTask(@PathVariable("boardId") Long board_id, @RequestBody Task task){
        Task newTask = taskService.newTask(board_id, task);
        if(newTask != null){
            return ResponseEntity.ok(newTask);
        }
        return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Hiba történt");
    }
}
