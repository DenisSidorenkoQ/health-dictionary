package com.example.gateway.client;

import com.example.gateway.dto.UserDietDto;
import com.example.gateway.dto.UserDoctorVisitDto;
import com.example.gateway.dto.UserPhysicalActivityDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@FeignClient(name = "storage", url = "${services.journal.url}/api/v1")
public interface StorageClient {
    //Diet
    @PostMapping("/diets")
    UserDietDto saveOrGet(@RequestBody UserDietDto request);

    @DeleteMapping("/diets")
    void deleteDiet(@RequestParam(name = "id") Long id);

    @GetMapping("/users/{userId}/diets")
    List<UserDietDto> getAllDietsByDate(@PathVariable(name = "userId") Long userId,
                                        @RequestParam(name = "startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                        @RequestParam(name = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate);

    //Visits
    @PostMapping("/visits")
    UserDoctorVisitDto saveOrGet(@RequestBody UserDoctorVisitDto request);

    @DeleteMapping("/visits")
    void deleteVisit(@RequestParam(name = "id") Long id);

    @GetMapping("/users/{userId}/visits")
    List<UserDoctorVisitDto> getAllVisitsByDate(@PathVariable(name = "userId") Long userId,
                                                @RequestParam(name = "startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDateTime startDate,
                                                @RequestParam(name = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDateTime endDate);

    //PhysicalActivity
    @PostMapping("/physical-activity")
    UserPhysicalActivityDto saveOrGet(@RequestBody UserPhysicalActivityDto request);

    @DeleteMapping("/physical-activity")
    void deletePhysicalActivity(@RequestParam(name = "id") Long id);

    @GetMapping("/users/{userId}/physical-activity")
    List<UserPhysicalActivityDto> getAllPhysicalActivityByDate(@PathVariable(name = "userId") int userId,
                                                               @RequestParam(name = "startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                                               @RequestParam(name = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate);
}
