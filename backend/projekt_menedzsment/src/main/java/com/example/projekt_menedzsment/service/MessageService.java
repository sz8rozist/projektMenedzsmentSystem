package com.example.projekt_menedzsment.service;

import com.example.projekt_menedzsment.model.Message;
import com.example.projekt_menedzsment.model.User;
import com.example.projekt_menedzsment.repository.MessageRepository;
import com.example.projekt_menedzsment.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {
    private MessageRepository messageRepository;
    private UserRepository userRepository;

    public MessageService(MessageRepository messageRepository, UserRepository userRepository){
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    public List<Message> getMessages(Long sender_id, Long receiver_id) {
        User sender = userRepository.findUserById(sender_id);
        User receiver = userRepository.findUserById(receiver_id);
        if(sender != null && receiver != null){
            return messageRepository.findAllBySenderAndReceiverOrReceiverAndSender(sender, receiver, sender, receiver);
        }
        return new ArrayList<>();
    }

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> getReadedMessage(Long senderId, Long receiverId, boolean read) {
        User sender = userRepository.findUserById(senderId);
        User receiver = userRepository.findUserById(receiverId);
        if(sender != null && receiver != null){
            return messageRepository.findAllBySenderAndReceiverAndReaded(sender,receiver,read);
        }
        return new ArrayList<>();
    }

    public Boolean markMessage(Long senderId, Long receiverId) {
        User sender = userRepository.findUserById(senderId);
        User receiver = userRepository.findUserById(receiverId);
        if(sender != null && receiver != null){
            List<Message> readedMessage = messageRepository.findAllBySenderAndReceiverAndReaded(sender,receiver, false);
            for(Message m : readedMessage){
                m.setReaded(true);
            }
            messageRepository.saveAll(readedMessage);
            return true;
        }
        return false;
    }
}
