package com.example.user.model;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum SexType {
    MALE("Мужчина"),
    FEMALE("Женщина"),
    ;

    final String name;
}
