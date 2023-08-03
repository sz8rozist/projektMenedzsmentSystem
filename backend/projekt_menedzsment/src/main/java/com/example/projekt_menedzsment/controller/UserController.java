package com.example.projekt_menedzsment.controller;

import com.example.projekt_menedzsment.ResponseMap;
import com.example.projekt_menedzsment.UserProjection;
import com.example.projekt_menedzsment.model.User;
import com.example.projekt_menedzsment.service.UserService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", maxAge = 0)
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
        if (user != null) {
            String token = userService.generateToken(user);
            return ResponseEntity.ok().body(ResponseMap.create("token", token, "username", user.getUsername(), "img", user.getImg(), "email", user.getEmail(), "id", user.getId().toString()));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseMap.create("error", "Sikertelen bejelentkezés!"));
    }

    @PostMapping("/image")
    public ResponseEntity<?> uploadImage(@RequestPart("file") MultipartFile file){
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(ResponseMap.create("error","A feltöltendő fájl üres"));
        }
        try {
            // Egyedi fájlnév generálása a képnek
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            // Képfájl mentése a megadott elérési útra
            byte[] bytes = file.getBytes();
            Path path = Paths.get("src/uploads/" + File.separator + fileName);
            Files.write(path, bytes);

            // Sikeres mentés esetén visszatérünk a fájlnévvel
            return ResponseEntity.ok().body(ResponseMap.create("fileName", fileName));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseMap.create("error","A fájl feltöltése sikertelen"));
        }
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> checkUserExists(@PathVariable String username) {
        boolean exsits = userService.userExists(username);
        return ResponseEntity.ok(exsits);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User signupUser) {
        User user = userService.signup(signupUser);
        if (user != null) {
            return ResponseEntity.ok(HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseMap.create("error","Sikertelen regisztráció"));
    }

    @GetMapping("/images/{imageName}")
    public ResponseEntity<?> getImage(@PathVariable String imageName) {
        String imagePath = "src/uploads/" + imageName;
        File imageFile = new File(imagePath);

        // Check if the image file exists
        if (imageFile.exists()) {
            Resource image = new FileSystemResource(imageFile);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + imageName + "\"")
                    .body(image);
        } else {
            // Return a 404 Not Found response when the image is not found
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseMap.create("error", "Nem található a kép!"));
        }
    }

    @GetMapping("/all/{userid}")
    public ResponseEntity<?> loadUsers(@PathVariable Long userid){
        List<UserProjection> users = userService.getAllUsers(userid);
        return ResponseEntity.ok(users);
    }
}
