package com.example.gateway.controller.storage;

import com.example.gateway.client.StorageClient;
import com.example.gateway.dto.UserPhysicalActivityDto;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@EnableMethodSecurity
public class StorageController {
    private final StorageClient storageClient;

    @GetMapping("/user/{userId}/physical-activity")
    List<UserPhysicalActivityDto> getAllPhysicalActivityByDate(@PathVariable(name = "userId") int userId,
                                                               @RequestParam(name = "startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                                               @RequestParam(name = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        return storageClient.getAllPhysicalActivityByDate(userId, startDate, endDate);
    }

    @PostMapping("/physical-activity")
    UserPhysicalActivityDto saveOrUpdate(@RequestBody UserPhysicalActivityDto request) {
        return storageClient.saveOrGet(request);
    }
}
