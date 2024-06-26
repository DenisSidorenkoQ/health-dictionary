package com.example.analysis.dto;

import com.example.storage.model.ActivityType;
import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;

@Builder
@Value
public class UserPhysicalActivityDto {
    Long id;
    Long userId;
    ActivityType activityType;
    Integer activityTime;
    LocalDateTime date;
}
