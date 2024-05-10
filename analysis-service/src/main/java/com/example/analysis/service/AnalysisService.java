package com.example.analysis.service;

import com.example.analysis.client.StorageServiceFeignClient;
import com.example.analysis.client.UserServiceFeignClient;
import com.example.analysis.dto.UserAnalysisDto;
import com.example.analysis.dto.UserDietDto;
import com.example.analysis.dto.UserPhysicalActivityDto;
import com.example.analysis.dto.UserResponse;
import com.example.user.model.SexType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalysisService {
    private final StorageServiceFeignClient storageServiceFeignClient;
    private final UserServiceFeignClient userServiceFeignClient;

    public List<UserAnalysisDto> analysisByDate(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        Optional<UserResponse> userResponse = userServiceFeignClient.getById(userId);
        if (userResponse.isEmpty()) {
            return new ArrayList<>();
        }
        List<UserPhysicalActivityDto> userPhysicalActivityDtoList =
                storageServiceFeignClient.getAllActivityByDate(userId, startDate, endDate);
        List<UserDietDto> userDietDtoList =
                storageServiceFeignClient.getAllDietsByDate(userId, startDate, endDate);

        Map<LocalDate, List<UserPhysicalActivityDto>> mapDateAndPhysicalActivity = userPhysicalActivityDtoList.stream()
                .collect(Collectors.groupingBy(
                        activity -> activity.getDate().toLocalDate(),
                        HashMap::new,
                        Collectors.toList()
                ));
        Map<LocalDate, List<UserDietDto>> mapDateAndDiet = userDietDtoList.stream()
                .collect(Collectors.groupingBy(
                        diet -> diet.getDate().toLocalDate(),
                        HashMap::new,
                        Collectors.toList()
                ));
        List<LocalDate> commonDateList =
                getCommonDates(mapDateAndPhysicalActivity.keySet().stream().toList(), mapDateAndDiet.keySet().stream().toList());
        UserResponse userInfo = userResponse.get();
        Float caloriesPerDayNorm = calculateCaloriesPerDayNorm(userInfo);
        List<UserAnalysisDto> analysisDtoList = new ArrayList<>();
        for (LocalDate date : commonDateList) {
            Float caloriesBurned = getBurnedCalories(mapDateAndPhysicalActivity.get(date));
            Float caloriesReceived = getReceivedCalories(mapDateAndDiet.get(date));
            UserAnalysisDto analysisDto = UserAnalysisDto.builder()
                    .date(date)
                    .caloriesReceived(caloriesReceived)
                    .caloriesBurned(caloriesBurned)
                    .caloriesNorm(caloriesPerDayNorm)
                    .build();
            analysisDtoList.add(analysisDto);
        }
        return analysisDtoList;
    }

    private List<LocalDate> getCommonDates(List<LocalDate> firstDateList, List<LocalDate> secondDateList) {
        return firstDateList.stream()
                .filter(secondDateList::contains)
                .collect(Collectors.toList());
    }

    private Float calculateCaloriesPerDayNorm(UserResponse userInfo) {
        Float cost = userInfo.getPhysicalActivity().getCost();
        if (SexType.MALE.equals(userInfo.getSex())) {
            return (88.36f + (13.4f * userInfo.getWeight()) + (4.8f * userInfo.getHeight()) - (5.7f * userInfo.getAge())) * cost;
        }
        if (SexType.FEMALE.equals(userInfo.getSex())) {
            return (447.6f + (9.2f * userInfo.getWeight()) + (3.1f * userInfo.getHeight()) - (4.3f * userInfo.getAge())) * cost;
        }
        return 0.0f;
    }

    private Float getBurnedCalories(List<UserPhysicalActivityDto> userPhysicalActivityList) {
        Float caloriesBurnedSum = 0f;
        for (UserPhysicalActivityDto userPhysicalActivity : userPhysicalActivityList) {
            Float caloriesPerMinute = userPhysicalActivity.getActivityType().getCaloriesCostPerMinute();
            Float caloriesBurned = caloriesPerMinute * userPhysicalActivity.getActivityTime();
            caloriesBurnedSum += caloriesBurned;
        }
        return caloriesBurnedSum;
    }

    private Float getReceivedCalories(List<UserDietDto> userDietList) {
        Float caloriesReceivedSum = 0f;
        for (UserDietDto userDiet : userDietList) {
            caloriesReceivedSum += userDiet.getCalories();
        }
        return caloriesReceivedSum;
    }
}
