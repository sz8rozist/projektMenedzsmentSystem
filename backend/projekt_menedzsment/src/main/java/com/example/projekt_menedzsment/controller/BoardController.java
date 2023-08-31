package com.example.projekt_menedzsment.controller;

import com.example.projekt_menedzsment.model.Board;
import com.example.projekt_menedzsment.model.Task;
import com.example.projekt_menedzsment.service.BoardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BoardController {
    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

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
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Hiba történt");
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> deleteBoard(@PathVariable("boardId") Long board_id) {
        boardService.deleteBoard(board_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
