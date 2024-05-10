package com.example.user.repository;

import com.example.user.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> getUserByLogin(String login);

    Optional<User> getUserByLoginAndPassword(String login, String password);

    Optional<User> getUserById(Long id);
}
