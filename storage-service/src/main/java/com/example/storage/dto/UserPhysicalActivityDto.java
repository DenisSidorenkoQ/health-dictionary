package com.example.storage.dto;

import com.example.storage.model.ActivityType;
import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;

@Builder
@Value
public class UserPhysicalActivityDto {
    Long id;
    Long userId;
    String activityType;
    Integer activityTime;
    LocalDateTime date;
}
