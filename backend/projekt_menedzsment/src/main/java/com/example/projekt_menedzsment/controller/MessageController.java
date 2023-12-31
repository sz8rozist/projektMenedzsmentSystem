package com.example.projekt_menedzsment.controller;

import com.example.projekt_menedzsment.exception.ApiRequestException;
import com.example.projekt_menedzsment.model.Message;
import com.example.projekt_menedzsment.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
@CrossOrigin(origins = "*", maxAge = 0)
public class MessageController {
    @Autowired
    private MessageService messageService;
    @GetMapping("/{senderId}/{receiverId}")
    public ResponseEntity<?> loadMessage(@PathVariable Long senderId, @PathVariable Long receiverId){
        List<Message> messages = messageService.getMessages(senderId, receiverId);
        return ResponseEntity.ok(messages);
    }

    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody Message message){
        Message newMessage = messageService.saveMessage(message);
        if(newMessage != null){
            return ResponseEntity.ok(newMessage);
        }
        throw new ApiRequestException("Sikertelen üzenetküldés!");
    }
    @GetMapping("/readed/{senderId}/{receiverId}")
    public ResponseEntity<?> getReadedMessage(@PathVariable Long senderId, @PathVariable Long receiverId, @RequestParam boolean read){
        List<Message> message = messageService.getReadedMessage(senderId,receiverId,read);
        return ResponseEntity.ok(message.size());
    }

    @GetMapping("/mark/{senderId}/{receiverId}")
    public ResponseEntity<?> markMessage(@PathVariable Long senderId, @PathVariable Long receiverId){
        Boolean markMessage = messageService.markMessage(senderId, receiverId);
        return ResponseEntity.ok(markMessage);
    }
}
