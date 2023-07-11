package com.example.projekt_menedzsment.service;

import com.example.projekt_menedzsment.model.User;
import com.example.projekt_menedzsment.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class UserService {
    private final UserRepository userRepository;
    private static final String SECRET_KEY = "titkoskulcs"; // Titkos kulcs a JWT token aláírásához

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String generateToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 3600000); // 1 órás lejárati idő
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key)
                .compact();
    }

    public User login(String username, String password) {
        // Ellenőrizd a bejelentkezési adatokat és adja vissza a felhasználót, ha sikeres
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}
