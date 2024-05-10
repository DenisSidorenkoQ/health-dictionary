package com.example.analysis.dto;

import com.example.analysis.model.FrequencyPhysicalActivity;
import com.example.user.model.SexType;
import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Builder
@Value
@Jacksonized
public class UserResponse {
    Long id;
    String login;
    String mail;
    Integer age;
    Integer height;
    Integer weight;
    SexType sex;
    FrequencyPhysicalActivity physicalActivity;
    String roleName;
}
