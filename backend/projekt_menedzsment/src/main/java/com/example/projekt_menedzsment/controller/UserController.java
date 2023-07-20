package com.example.projekt_menedzsment.controller;

import com.example.projekt_menedzsment.model.Response;
import com.example.projekt_menedzsment.model.User;
import com.example.projekt_menedzsment.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 15000)
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
        Response response = new Response();
        if (user != null) {
            String token = userService.generateToken(user);
            response.setToken(token);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.setMessage("Sikertelen bejelentkezés");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
