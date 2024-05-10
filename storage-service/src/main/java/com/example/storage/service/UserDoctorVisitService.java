package com.example.storage.service;

import com.example.storage.converter.UserDoctorVisitConverter;
import com.example.storage.dto.UserDoctorVisitDto;
import com.example.storage.model.UserDoctorVisit;
import com.example.storage.repository.UserDoctorVisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDoctorVisitService {
    private final UserDoctorVisitRepository userDoctorVisitRepository;
    private final UserDoctorVisitConverter userDoctorVisitConverter;


    public UserDoctorVisit saveUserDiet(UserDoctorVisitDto userDoctorVisitDto) {
        UserDoctorVisit userDoctorVisit = userDoctorVisitConverter.fromDto(userDoctorVisitDto);
        return userDoctorVisitRepository.save(userDoctorVisit);
    }

    public List<UserDoctorVisitDto> findAllVisitsByDate(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        List<UserDoctorVisit> userDietList = userDoctorVisitRepository.findAllByUserIdAndDateBetween(userId, startDate, endDate);
        return userDoctorVisitConverter.toDto(userDietList);
    }

    public void deleteUserDoctorVisit(Long id) {
        userDoctorVisitRepository.deleteById(id);
    }
}
