package com.example.projekt_menedzsment.controller;

import com.example.projekt_menedzsment.Response;
import com.example.projekt_menedzsment.model.Board;
import com.example.projekt_menedzsment.model.BoardColumn;
import com.example.projekt_menedzsment.service.BoardService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BoardController {
    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping("/board/{projekt_id}")
    public List<Board> getBoardByProjektId(@PathVariable Long projekt_id){
        Response response = new Response();
        return boardService.getBoardByProjektId(projekt_id);
    }

    @PutMapping("/boardColumn/{board_column_id}")
    public ResponseEntity<BoardColumn> updateBoardColumn(@RequestBody Long new_board_id, @PathVariable Long board_column_id){
        BoardColumn updated = boardService.updateBoardColumn(new_board_id, board_column_id);
        if(updated != null){
            return ResponseEntity.ok(updated);
        }
        return null;
    }

    @PostMapping("/board/{projekt_id}")
    public ResponseEntity<Board> newBoard(@RequestBody Board newBoard, @PathVariable Long projekt_id){
        System.out.println(newBoard);
        Board board = boardService.insert(newBoard, projekt_id);
        HttpHeaders httpHeaders = new HttpHeaders();
        if(board != null){
            httpHeaders.add("board","/api/board/" + board.getId().toString());
            return new ResponseEntity<>(board,httpHeaders, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(null, httpHeaders, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/board/{boardId}")
    public ResponseEntity<Board> deleteBoard(@PathVariable("boardId") Long board_id) {
        boardService.deleteBoard(board_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
