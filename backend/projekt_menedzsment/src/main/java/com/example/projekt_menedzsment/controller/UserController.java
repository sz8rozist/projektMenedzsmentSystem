package com.example.projekt_menedzsment.controller;

import com.example.projekt_menedzsment.exception.ApiRequestException;

import com.example.projekt_menedzsment.UserProjection;
import com.example.projekt_menedzsment.model.User;
import com.example.projekt_menedzsment.request.ChangePasswordRequest;
import com.example.projekt_menedzsment.response.LoginResponse;
import com.example.projekt_menedzsment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
@CrossOrigin(origins = "*", maxAge = 16000)
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public LoginResponse<User> login(@RequestBody User loginRequest) {
        User user = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
        if (user != null) {
            String token = userService.generateToken(user);
            return new LoginResponse<>(token, user);
        }
        throw new ApiRequestException("Sikertelen bejelentkezés!");
    }

    @PostMapping("/image")
    public ResponseEntity<?> uploadImage(@RequestPart("file") MultipartFile file){
        if (file.isEmpty()) {
            throw new ApiRequestException("A feltöltendő fájl üres!");
        }
        try {
            // Egyedi fájlnév generálása a képnek
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            // Képfájl mentése a megadott elérési útra
            byte[] bytes = file.getBytes();
            Path path = Paths.get("src/uploads/" + File.separator + fileName);
            Files.write(path, bytes);

            // Sikeres mentés esetén visszatérünk a fájlnévvel
            return ResponseEntity.ok().body(fileName);
        } catch (IOException e) {
            throw new ApiRequestException("A fájl feltöltése sikertelen!");
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
        if (user == null) {
            throw new ApiRequestException("Sikertelen regisztráció!");
        }
        return ResponseEntity.ok(HttpStatus.OK);
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
            throw new ApiRequestException("Nem található a kép!");
        }
    }

    @GetMapping("/all/{userid}")
    public ResponseEntity<?> loadUsers(@PathVariable Long userid){
        List<UserProjection> users = userService.getAllUsers(userid);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/get/{userid}")
    public ResponseEntity<?> getUser(@PathVariable Long userid){
        User user = userService.getUserById(userid);
        if(user == null){
            throw new ApiRequestException("Felhasználó ezzel az azonosítóval: " + userid + " nem található!");
        }
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User user){
        User updatedUser = userService.update(userId, user);
        if(updatedUser == null){
            throw new ApiRequestException("Sikertelen frissítés");
        }
        return ResponseEntity.ok(updatedUser);
    }
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request){
        if (userService.changePassword(request.getUserId(), request.getOldPassword(), request.getNewPassword())) {
            return ResponseEntity.ok("Sikeres jelszóváltoztatás!");
        } else {
            throw new ApiRequestException("Helytelen régi jelszó!");
        }
    }
}
