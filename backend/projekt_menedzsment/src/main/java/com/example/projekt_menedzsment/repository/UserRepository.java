package com.example.projekt_menedzsment.repository;
import com.example.projekt_menedzsment.UserProjection;
import com.example.projekt_menedzsment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    User findUserById(Long id);
    @Query(value = "SELECT u.id AS id, u.username AS username, u.email AS email, u.img AS img FROM User u where u.id != :id")
    List<UserProjection> findAllUsersProjected(@Param("id") Long id);
    boolean existsUserByUsername(String username);

}
