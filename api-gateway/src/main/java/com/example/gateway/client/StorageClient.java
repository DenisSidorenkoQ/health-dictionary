package com.example.gateway.client;

import com.example.gateway.dto.UserDietDto;
import com.example.gateway.dto.UserDoctorVisitDto;
import com.example.gateway.dto.UserPhysicalActivityDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@FeignClient(name = "storage", url = "${services.journal.url}/api/v1")
public interface StorageClient {
    //Diet
    @PostMapping("/diets")
    UserDietDto saveOrGet(@RequestBody UserDietDto request);

    @DeleteMapping("/diets")
    void deleteDiet(@RequestParam Long id);

    @GetMapping("/users/{userId}/diets")
    List<UserDietDto> getAllDietsByDate(@PathVariable Long userId, @RequestParam LocalDateTime startDate,
                                        @RequestParam LocalDateTime endDate);

    //Visits
    @PostMapping("/visits")
    UserDoctorVisitDto saveOrGet(@RequestBody UserDoctorVisitDto request);

    @DeleteMapping("/visits")
    void deleteVisit(@RequestParam Long id);

    @GetMapping("/users/{userId}/visits")
    List<UserDoctorVisitDto> getAllVisitsByDate(@PathVariable Long userId, @RequestParam LocalDateTime startDate,
                                                @RequestParam LocalDateTime endDate);

    //PhysicalActivity
    @PostMapping("/physical-activity")
    UserPhysicalActivityDto saveOrGet(@RequestBody UserPhysicalActivityDto request);

    @DeleteMapping("/physical-activity")
    void deletePhysicalActivity(@RequestParam Long id);
    @GetMapping("/users/{userId}/physical-activity")
    List<UserPhysicalActivityDto> getAllPhysicalActivityByDate(@PathVariable Long userId, @RequestParam LocalDateTime startDate,
                                                    @RequestParam LocalDateTime endDate);
}
