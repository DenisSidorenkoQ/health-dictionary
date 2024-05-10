package com.example.analysis.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum FrequencyPhysicalActivity {
    NONE("Сидячий образ без нагрузок", 1.2f),
    LOW("Тренировки 1-3 дней в неделю", 1.375f),
    MEDIUM("Занятия 3-5 дней в неделю", 1.55f),
    HIGH("Занятия 6 дней в неделю", 1.725f),
    SPORT("Занятия 7 дней в неделю", 1.9f),
    ;

    final String name;
    final Float cost;
}
