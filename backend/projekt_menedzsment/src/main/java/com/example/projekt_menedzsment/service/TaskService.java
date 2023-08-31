package com.example.projekt_menedzsment.service;

import com.example.projekt_menedzsment.model.Board;
import com.example.projekt_menedzsment.model.Task;
import com.example.projekt_menedzsment.repository.BoardRepository;
import com.example.projekt_menedzsment.repository.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final BoardRepository boardRepository;

    public TaskService(TaskRepository taskRepository, BoardRepository boardRepository){
        this.taskRepository = taskRepository;
        this.boardRepository = boardRepository;
    }

    public Task updateBoardColumn(Long new_board_id, Long board_column_id){
        Task column = taskRepository.findById(board_column_id).orElse(null);
        if (column != null) {
            Board newBoard = boardRepository.findById(new_board_id).orElse(null);
            if (newBoard != null) {
                column.setBoard(newBoard);
                taskRepository.save(column);
                return column;
            }
        }
        return null;
    }

    public Task newTask(Long boardId, Task task) {
        Board board = boardRepository.findById(boardId).orElse(null);
        if(board != null){
            task.setBoard(board);
            return taskRepository.save(task);
        }
        return null;
    }
}
