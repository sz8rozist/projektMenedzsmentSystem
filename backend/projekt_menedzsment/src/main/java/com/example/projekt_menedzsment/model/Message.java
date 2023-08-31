package com.example.projekt_menedzsment.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "messages")
@ToString
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "content")
    private String content;

    @JoinColumn(name = "sender_user_id")
    @ManyToOne
    private User sender;
    @JoinColumn(name = "receiver_user_id")
    @ManyToOne
    private User receiver;
    @Column(name = "readed")
    private Boolean readed;
}
