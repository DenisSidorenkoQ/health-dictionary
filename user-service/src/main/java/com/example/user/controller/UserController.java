package com.example.user.controller;

import com.example.user.converter.UserConverter;
import com.example.user.dto.GetUserByCredentialsRequest;
import com.example.user.dto.SaveUserRequest;
import com.example.user.dto.UpdateUserInfoRequest;
import com.example.user.dto.UserResponse;
import com.example.user.model.User;

import java.util.Optional;

import com.example.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserConverter converter;

    @PostMapping("/user")
    ResponseEntity save(@RequestBody SaveUserRequest request) {
        User userFromRequest = converter.fromDto(request);
        Optional<User> savedUser = userService.save(userFromRequest);

        return savedUser
                .map(user -> new ResponseEntity(converter.toSaveUserResponseDto(user), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity(HttpStatus.CONFLICT));
    }

    @PutMapping("/user")
    ResponseEntity update(@RequestBody UpdateUserInfoRequest request) {
        Optional<User> updatedUser = userService.updateUserInfo(request);

        return updatedUser
                .map(user -> new ResponseEntity(converter.toUserResponseDto(user), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity(HttpStatus.CONFLICT));
    }

    @GetMapping("/user/{userId}")
    ResponseEntity getById(@PathVariable("userId") final Long userId) {
        Optional<User> foundUser = userService.getUserById(userId);

        return foundUser
                .map(user -> new ResponseEntity(converter.toUserResponseDto(user), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity(HttpStatus.CONFLICT));
    }

    @PostMapping("/user/credentials")
    Optional<UserResponse> getByCredentials(@RequestBody GetUserByCredentialsRequest request) {
        User user = converter.fromDto(request);

        Optional<User> foundUser = userService.getByCredentials(user);
        if (foundUser.isPresent()) {
            UserResponse response = converter.toUserResponseDto(foundUser.get());
            return Optional.of(response);
        }

        return Optional.empty();
    }
}
