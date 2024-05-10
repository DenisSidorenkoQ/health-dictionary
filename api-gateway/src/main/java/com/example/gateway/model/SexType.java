package com.example.gateway.model;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum SexType {
    MALE("Мужчина"),
    FEMALE("Женщина"),
    ;

    final String name;
}
