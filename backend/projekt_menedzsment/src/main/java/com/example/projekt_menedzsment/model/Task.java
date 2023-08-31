package com.example.projekt_menedzsment.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "task")
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Temporal(TemporalType.DATE)
    @Column(name = "deadline")
    private Date deadline;
    @Column(name = "description")
    private String description;
    @ManyToOne
    @JoinColumn(name = "board_id")
    @JsonBackReference
    private Board board;
}
