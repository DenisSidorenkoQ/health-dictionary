package com.example.gateway.client;

import com.example.gateway.dto.*;

import java.util.Optional;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "user", url = "${services.user.url}/api/v1")
public interface UserClient {
    //UserController
    @PostMapping("/user")
    ResponseEntity<SaveUserResponse> saveUser(@RequestBody SaveUserRequest request);

    @PutMapping("/user")
    ResponseEntity<UserResponse> updateUser(@RequestBody UpdateUserInfoRequest request);

    @GetMapping("/user/{userId}")
    UserResponse getById(@PathVariable("userId") final Long userId);

    @PostMapping("/user/credentials")
    Optional<UserResponse> getByCredentials(@RequestBody GetUserByCredentialsRequest request);

}