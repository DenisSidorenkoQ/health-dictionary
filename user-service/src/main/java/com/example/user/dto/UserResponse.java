package com.example.user.dto;

import com.example.user.model.SexType;
import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;
import org.springframework.data.relational.core.mapping.Column;

@Builder
@Value
@Jacksonized
public class UserResponse {
    Long id;
    String login;
    String mail;
    Integer age;
    Float height;
    Float weight;
    SexType sex;
    String roleName;
}
