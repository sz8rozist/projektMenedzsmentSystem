package com.example.projekt_menedzsment.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;
@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;

    @Column(name = "post")
    private String post;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "ip_address")
    private String ipAddress;
    @Column(name = "user_agent")
    private String userAgent;
    @Column(name = "email")
    private String email;

    @Column(name = "img")
    private String img;

    @OneToMany(mappedBy = "user")
    private List<Projekt> projects;
}
