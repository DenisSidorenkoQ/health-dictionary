package com.example.analysis.dto;

import lombok.Builder;
import lombok.Value;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Value
@Builder
public class UserAnalysisDto {
    Float caloriesReceived;
    Float caloriesBurned;
    Float caloriesNorm;
    Float sugarReceived;
    Float sugarNorm;
    LocalDate date;
}
