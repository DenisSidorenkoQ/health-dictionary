package com.example.user.facade;

import com.example.user.dto.UpdateUserInfoRequest;
import com.example.user.model.User;
import com.example.user.service.UserService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserFacade {
    private final UserService userService;

    public Optional<User> save(final User user) {
        Optional<User> findUser = userService.getUserByLogin(user.getLogin());

        if (findUser.isEmpty()) {
            User savedUser = userService.save(user);

            return Optional.of(savedUser);
        }
        return Optional.empty();
    }

    public Optional<User> update(UpdateUserInfoRequest request) {
        Optional<User> findUser = userService.getUserByLogin(request.getLogin());

        if (findUser.isPresent()) {
            User user = findUser.get();

            if (request.getAge() != null && !request.getAge().equals(user.getAge())) {
                user.setAge(request.getAge());
            }
            if (request.getSex() != null && !request.getSex().equals(user.getSex())) {
                user.setSex(request.getSex());
            }
            if (request.getMail() != null && !request.getMail().equals(user.getMail())) {
                user.setMail(request.getMail());
            }
            if (request.getWeight() != null && !request.getWeight().equals(user.getWeight())) {
                user.setWeight(request.getWeight());
            }
            if (request.getHeight() != null && !request.getHeight().equals(user.getHeight())) {
                user.setHeight(request.getHeight());
            }
            if (request.getPassword() != null && !request.getPassword().equals(user.getPassword())) {
                user.setPassword(request.getPassword());
            }


            return Optional.of(userService.save(user));
        }
        return Optional.empty();
    }

    public Optional<User> getById(final Long userId) {
        return userService.getUserById(userId);
    }

    public Optional<User> getByCredentials(final User user) {
        return userService.getByCredentials(user);
    }
}
