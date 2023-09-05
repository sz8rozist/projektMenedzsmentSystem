package com.example.projekt_menedzsment.controller;

import com.example.projekt_menedzsment.exception.ApiRequestException;
import com.example.projekt_menedzsment.model.Board;
import com.example.projekt_menedzsment.model.Task;
import com.example.projekt_menedzsment.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BoardController {
    @Autowired
    private BoardService boardService;

    @GetMapping("/{projekt_id}")
    public List<Board> getBoardByProjektId(@PathVariable Long projekt_id){
        return boardService.getBoardByProjektId(projekt_id);
    }


    @PostMapping("/{projekt_id}")
    public ResponseEntity<?> newBoard(@RequestBody Board newBoard, @PathVariable Long projekt_id){
        Board board = boardService.insert(newBoard, projekt_id);
        if(board != null){
            return ResponseEntity.ok(board);
        }
        throw new ApiRequestException("Sikertelen tábla mentés!");
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> deleteBoard(@PathVariable("boardId") Long board_id) {
        boardService.deleteBoard(board_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
