package com.example.projekt_menedzsment.service;

import com.example.projekt_menedzsment.model.Board;
import com.example.projekt_menedzsment.model.Task;
import com.example.projekt_menedzsment.model.Projekt;
import com.example.projekt_menedzsment.repository.TaskRepository;
import com.example.projekt_menedzsment.repository.BoardRepository;
import com.example.projekt_menedzsment.repository.ProjektRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {
    private final BoardRepository boardRepository;
    private final TaskRepository taskRepository;
    private final ProjektRepository projektRepository;

    public BoardService(BoardRepository boardRepository, TaskRepository taskRepository, ProjektRepository projektRepository
    ) {
        this.boardRepository = boardRepository;
        this.taskRepository = taskRepository;
        this.projektRepository = projektRepository;
    }

    public List<Board> getBoardByProjektId(Long id){
        List<Board> boards = boardRepository.findBoardsByProjekt_Id(id);
        for(Board b : boards){
            b.setTasks(taskRepository.findTasksByBoard_id(b.getId()));
        }
        return boards;
    }


    public Board insert(Board board, Long projekt_id){
        Projekt projekt = projektRepository.findById(projekt_id).orElse(null);
        if(projekt != null){
            board.setProjekt(projekt);
            return boardRepository.save(board);
        }
        return null;
    }

    public void deleteBoard(Long id){
        boardRepository.deleteById(id);
    }
}
