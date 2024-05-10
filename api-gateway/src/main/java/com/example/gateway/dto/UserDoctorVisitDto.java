package com.example.gateway.dto;

import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;

@Builder
@Value
public class UserDoctorVisitDto {
    Long id;
    Long userId;
    String name;
    String description;
    LocalDateTime date;
    Boolean isNotified;
}
