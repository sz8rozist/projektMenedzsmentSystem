package com.example.projekt_menedzsment.model;

public class AuthUser {
    private Long id;
    private String username;
    private String passwor;
    private String token;

    public Long getId() {
        return id;
    }

    public AuthUser(int id, String username, String passwor, String token) {
        this.id = id;
        this.username = username;
        this.passwor = passwor;
        this.token = token;
    }

    public void setId(L id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswor() {
        return passwor;
    }

    public void setPasswor(String passwor) {
        this.passwor = passwor;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
