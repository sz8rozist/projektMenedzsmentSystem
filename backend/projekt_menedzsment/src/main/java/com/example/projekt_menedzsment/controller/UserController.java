package com.example.projekt_menedzsment.controller;

import com.example.projekt_menedzsment.Response;
import com.example.projekt_menedzsment.model.User;
import com.example.projekt_menedzsment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {
    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get")
    public String valami(){
        return "HAHA";
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody User loginRequest) {
        User user = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
        // System.out.println(loginRequest.getUsername());
        Response response = new Response();
        if (user != null) {
            String token = userService.generateToken(user);
            response.setStatusCode(HttpStatus.OK.value());
            response.setMessage("Sikeres bejelentkezés");
            response.setJwtToken(token);
            response.setLoggedUser(user);
            return ResponseEntity.ok(response);
        }
        response.setStatusCode(HttpStatus.UNAUTHORIZED.value());
        response.setMessage("Sikertelen bejelentkezés");
        return ResponseEntity.ok(response);
    }
}
