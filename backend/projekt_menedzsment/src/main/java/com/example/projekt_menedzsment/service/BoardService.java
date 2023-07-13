package com.example.projekt_menedzsment.service;

import com.example.projekt_menedzsment.model.Board;
import com.example.projekt_menedzsment.model.BoardColumn;
import com.example.projekt_menedzsment.model.Projekt;
import com.example.projekt_menedzsment.repository.BoardColumnRepository;
import com.example.projekt_menedzsment.repository.BoardRepository;
import com.example.projekt_menedzsment.repository.ProjektRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BoardService {
    @Autowired
    private final BoardRepository boardRepository;
    @Autowired
    private final BoardColumnRepository boardColumnRepository;
    private final ProjektRepository projektRepository;

    public BoardService(BoardRepository boardRepository, BoardColumnRepository boardColumnRepository, ProjektRepository projektRepository
    ) {
        this.boardRepository = boardRepository;
        this.boardColumnRepository = boardColumnRepository;
        this.projektRepository = projektRepository;
    }

    public List<Board> getBoardByProjektId(Long id){
        List<Board> boards = boardRepository.findBoardsByProjekt_Id(id);
        for(Board b : boards){
            b.setBoardColumns(boardColumnRepository.findBoardColumnsByBoard_id(b.getId()));
        }
        return boards;
    }
    public BoardColumn updateBoardColumn(Long new_board_id, Long board_column_id){
        BoardColumn column = boardColumnRepository.findById(board_column_id).orElse(null);
        if (column != null) {
            Board newBoard = boardRepository.findById(new_board_id).orElse(null);
            if (newBoard != null) {
                column.setBoard(newBoard);
                boardColumnRepository.save(column);
                return column;
            }
        }
        return null;
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
