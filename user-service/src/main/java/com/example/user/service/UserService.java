package com.example.user.service;

import com.example.user.model.User;
import com.example.user.repository.UserRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public Optional<User> getUserById(final Long userId) {
        return userRepository.getUserById(userId);
    }

    public Optional<User> getUserByLogin(final String login) {
        return userRepository.getUserByLogin(login);
    }

    public User save(final User user) {
        return userRepository.save(user);
    }

    public Optional<User> getByCredentials(final User user) {
        return userRepository.getUserByLoginAndPassword(user.getLogin(), user.getPassword());
    }
}
