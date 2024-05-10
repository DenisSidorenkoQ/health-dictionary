package com.example.gateway.dto;

import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;

@Builder
@Value
public class UserDietDto {
    Long id;
    Long userId;
    String foodName;
    Float calories;
    Float sugar;
    LocalDateTime date;
}
