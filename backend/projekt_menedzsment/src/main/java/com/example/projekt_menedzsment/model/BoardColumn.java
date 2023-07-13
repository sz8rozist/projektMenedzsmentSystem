package com.example.projekt_menedzsment.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "board_column")
@Getter
@Setter
public class BoardColumn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @ManyToOne
    @JoinColumn(name = "board_id")
    @JsonBackReference
    private Board board;
}
