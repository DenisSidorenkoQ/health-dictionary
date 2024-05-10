package com.example.storage.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ActivityType {
    JUMP("Прыжки", 8f),
    PUSH_UPS("Отжимания", 8f),
    LIGHT_RUN("Легкий бег", 7.5f),
    DEFAULT_RUN("Умеренный бег", 12.5f),
    INTENSIVE_RUN("Интенсивный бег", 17.5f),
    ;

    final String name;
    final Float caloriesCostPerMinute;
}
