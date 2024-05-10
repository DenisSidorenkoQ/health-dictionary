package com.example.gateway.controller.user;

import com.example.gateway.client.UserClient;
import com.example.gateway.dto.*;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@EnableMethodSecurity
public class UserController {
    private final UserClient userClient;

    @PostMapping("/users")
    ResponseEntity<SaveUserResponse> saveUser(@RequestBody SaveUserRequest request) {
        return userClient.saveUser(request);
    }

    @PutMapping("/users")
    ResponseEntity<UserResponse> updateUser(@RequestBody UpdateUserInfoRequest request) {
        return userClient.updateUser(request);
    }

    @GetMapping("/user/{userId}")
    ResponseEntity<UserResponse> getById(@PathVariable("userId") final Long userId) {
        return userClient.getById(userId);
    }

    @PostMapping("/user/credentials")
    Optional<UserResponse> getByCredentials(@RequestBody GetUserByCredentialsRequest request) {
        return userClient.getByCredentials(request);
    }

    @ExceptionHandler(FeignException.class)
    public ResponseEntity handleException(FeignException exception) {
        return new ResponseEntity(HttpStatus.valueOf(exception.status()));
    }
}
