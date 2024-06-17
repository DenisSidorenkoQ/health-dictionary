package com.example.storage.controller;

import com.example.storage.dto.UserDietDto;

import java.time.LocalDateTime;
import java.util.List;

import com.example.storage.service.UserDietService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserDietController {
    private final UserDietService userDietService;

    @PostMapping("/diets")
    UserDietDto saveOrUpdate(@RequestBody UserDietDto request) {
        userDietService.saveUserDiet(request);
        return request;
    }

    @DeleteMapping("/diets")
    void delete(@RequestParam Long id) {
        userDietService.deleteUserDiet(id);
    }

    @GetMapping("/users/{userId}/diets")
    List<UserDietDto> getAllDietsByDate(@PathVariable Long userId, @RequestParam LocalDateTime startDate,
                                        @RequestParam LocalDateTime endDate) {
        return userDietService.findAllDietsByDate(userId, startDate, endDate);
    }
}
