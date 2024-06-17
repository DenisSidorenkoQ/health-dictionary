package com.example.storage.service;

import com.example.storage.converter.UserPhysicalActivityConverter;
import com.example.storage.dto.UserPhysicalActivityDto;
import com.example.storage.model.UserPhysicalActivity;
import com.example.storage.repository.UserPhysicalActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserPhysicalActivityService {
    private final UserPhysicalActivityRepository userPhysicalActivityRepository;
    private final UserPhysicalActivityConverter userPhysicalActivityConverter;

    public UserPhysicalActivity saveUserDiet(UserPhysicalActivityDto userPhysicalActivityDto) {
        UserPhysicalActivity userPhysicalActivity = userPhysicalActivityConverter.fromDto(userPhysicalActivityDto);
        return userPhysicalActivityRepository.save(userPhysicalActivity);
    }

    public List<UserPhysicalActivityDto> findAllActivityByDate(Long userId, LocalDate startDate, LocalDate endDate) {
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atStartOfDay().plusDays(1);
        List<UserPhysicalActivity> userPhysicalActivityList =
                userPhysicalActivityRepository.findAllByUserIdAndDateBetween(userId, startDateTime, endDateTime);
        return userPhysicalActivityList.stream()
                .map(userPhysicalActivity -> userPhysicalActivityConverter.toDto(userPhysicalActivity))
                .collect(Collectors.toList());
    }

    public void deleteUserDoctorVisit(Long id) {
        userPhysicalActivityRepository.deleteById(id);
    }
}
