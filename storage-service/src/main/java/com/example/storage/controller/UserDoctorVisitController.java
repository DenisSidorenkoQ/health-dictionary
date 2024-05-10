package com.example.storage.controller;

import com.example.storage.dto.UserDoctorVisitDto;
import com.example.storage.service.UserDoctorVisitService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserDoctorVisitController {
    private final UserDoctorVisitService userDoctorVisitService;

    @PostMapping("/visits")
    UserDoctorVisitDto saveOrGet(@RequestBody UserDoctorVisitDto request) {
        userDoctorVisitService.saveUserDiet(request);
        return request;
    }

    @DeleteMapping("/visits")
    void delete(@RequestParam Long id) {
        userDoctorVisitService.deleteUserDoctorVisit(id);
    }

    @GetMapping("/users/{userId}/visits")
    List<UserDoctorVisitDto> getAllVisitsByDate(@PathVariable Long userId, @RequestParam LocalDateTime startDate,
                                                @RequestParam LocalDateTime endDate) {
        return userDoctorVisitService.findAllVisitsByDate(userId, startDate, endDate);
    }
}
