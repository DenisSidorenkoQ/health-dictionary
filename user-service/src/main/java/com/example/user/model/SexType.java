package com.example.user.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@ToString
@Getter
public enum SexType {
    MALE("Мужчина"),
    FEMALE("Женщина"),
    ;

    final String name;
}
