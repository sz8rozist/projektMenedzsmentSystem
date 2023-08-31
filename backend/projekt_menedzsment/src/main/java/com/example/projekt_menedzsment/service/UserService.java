package com.example.projekt_menedzsment.service;
import com.example.projekt_menedzsment.UserProjection;
import com.example.projekt_menedzsment.model.User;
import com.example.projekt_menedzsment.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private HttpServletRequest request;
    private static final String SECRET_KEY = "titkoskulcs"; // Titkos kulcs a JWT token aláírásához

    public UserService(UserRepository userRepository, HttpServletRequest request) {
        this.userRepository = userRepository;
        this.request = request;
    }

    public String generateToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 3600000); // 1 órás lejárati idő
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        return Jwts.builder()
                .setSubject(String.valueOf(user.getId()))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key)
                .compact();
    }

    public User login(String username, String password) {
        // Ellenőrizd a bejelentkezési adatokat és adja vissza a felhasználót, ha sikeres
        User user = userRepository.findByUsername(username);
        if (user != null && BCrypt.checkpw(password, user.getPassword())) {
            user.setIpAddress(request.getRemoteAddr());
            user.setUserAgent(request.getHeader("User-Agent"));
            userRepository.save(user);
            return user;
        }
        return null;
    }

    public boolean userExists(String username) {
        return userRepository.existsUserByUsername(username);
    }

    public User signup(User user){
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    public List<UserProjection> getAllUsers(Long id) {
        return userRepository.findAllUsersProjected(id);
    }

    public User getUserById(Long userid) {
        return userRepository.findUserById(userid);
    }

    public User update(Long userId, User user) {
        User update = userRepository.findById(userId).orElse(null);
        if(update != null){
            update.setPost(user.getPost());
            update.setUsername(user.getUsername());
            update.setEmail(user.getEmail());
            update.setFirstName(user.getFirstName());
            update.setLastName(user.getLastName());
            return userRepository.save(update);
        }
        return null;
    }

    public boolean changePassword(Long userId, String oldPassword, String newPassword) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null || !BCrypt.checkpw(oldPassword, user.getPassword())) {
            return false; // Sikertelen változtatás, mert rossz régi jelszó vagy felhasználó nem létezik
        }

        user.setPassword(BCrypt.hashpw(newPassword, BCrypt.gensalt()));
        userRepository.save(user);
        return true;
    }
}
