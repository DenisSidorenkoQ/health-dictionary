package com.example.storage.service;

import com.example.storage.converter.UserDietConverter;
import com.example.storage.dto.UserDietDto;
import com.example.storage.model.UserDiet;
import com.example.storage.repository.UserDietRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDietService {
    private final UserDietRepository userDietRepository;
    private final UserDietConverter userDietConverter;

    public UserDiet saveUserDiet(UserDietDto userDietDto) {
        UserDiet userDiet = userDietConverter.fromDto(userDietDto);
        return userDietRepository.save(userDiet);
    }

    public List<UserDietDto> findAllDietsByDate(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        List<UserDiet> userDietList = userDietRepository.findAllByUserIdAndDateBetween(userId, startDate, endDate);
        return userDietConverter.toDto(userDietList);
    }

    public void deleteUserDiet(Long id) {
        userDietRepository.deleteById(id);
    }
}
