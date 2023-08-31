package com.example.projekt_menedzsment.repository;

import com.example.projekt_menedzsment.model.Message;
import com.example.projekt_menedzsment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllBySenderAndReceiverOrReceiverAndSender(User sender, User receiver, User receiver2, User sender2);
    List<Message> findAllBySenderAndReceiverAndReaded(User sender, User receiver, boolean readed);
}
