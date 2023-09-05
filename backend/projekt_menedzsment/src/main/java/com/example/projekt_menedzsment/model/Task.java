package com.example.projekt_menedzsment.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

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
    @NotNull
    private String name;
    @Temporal(TemporalType.DATE)
    @Column(name = "deadline")
    @NotNull
    private Date deadline;
    @Column(name = "description")
    private String description;
    @ManyToOne
    @JoinColumn(name = "board_id")
    @JsonBackReference
    private Board board;
}
