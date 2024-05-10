package com.example.gateway.dto;

import com.example.gateway.model.FrequencyPhysicalActivity;
import com.example.gateway.model.SexType;
import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Builder
@Value
@Jacksonized
public class UpdateUserInfoRequest {
    String login;
    String password;
    String mail;
    Integer age;
    SexType sex;
    Float height;
    Float weight;
    FrequencyPhysicalActivity physicalActivity;
}
