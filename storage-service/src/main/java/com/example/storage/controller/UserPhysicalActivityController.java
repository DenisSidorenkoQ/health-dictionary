package com.example.storage.controller;

import com.example.storage.dto.UserPhysicalActivityDto;
import com.example.storage.service.UserPhysicalActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserPhysicalActivityController {
    private final UserPhysicalActivityService userPhysicalActivityService;

    @PostMapping("/physical-activity")
    UserPhysicalActivityDto saveOrGet(@RequestBody UserPhysicalActivityDto request) {
        userPhysicalActivityService.saveUserDiet(request);
        return request;
    }

    @DeleteMapping("/physical-activity")
    void delete(@RequestParam Long id) {
        userPhysicalActivityService.deleteUserDoctorVisit(id);
    }

    @GetMapping("/users/{userId}/physical-activity")
    List<UserPhysicalActivityDto> getAllPhysicalActivityByDate(@PathVariable Long userId, @RequestParam LocalDateTime startDate,
                                                               @RequestParam LocalDateTime endDate) {
        return userPhysicalActivityService.findAllActivityByDate(userId, startDate, endDate);
    }
}
