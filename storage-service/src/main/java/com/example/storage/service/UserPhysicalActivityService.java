package com.example.storage.service;

import com.example.storage.converter.UserPhysicalActivityConverter;
import com.example.storage.dto.UserPhysicalActivityDto;
import com.example.storage.model.UserPhysicalActivity;
import com.example.storage.repository.UserPhysicalActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserPhysicalActivityService {
    private final UserPhysicalActivityRepository userPhysicalActivityRepository;
    private final UserPhysicalActivityConverter userPhysicalActivityConverter;

    public UserPhysicalActivity saveUserDiet(UserPhysicalActivityDto userPhysicalActivityDto) {
        UserPhysicalActivity userPhysicalActivity = userPhysicalActivityConverter.fromDto(userPhysicalActivityDto);
        return userPhysicalActivityRepository.save(userPhysicalActivity);
    }

    public List<UserPhysicalActivityDto> findAllActivityByDate(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        List<UserPhysicalActivity> userPhysicalActivityList = userPhysicalActivityRepository.findAllByUserIdAndDateBetween(userId, startDate, endDate);
        return userPhysicalActivityConverter.toDto(userPhysicalActivityList);
    }

    public void deleteUserDoctorVisit(Long id) {
        userPhysicalActivityRepository.deleteById(id);
    }
}
