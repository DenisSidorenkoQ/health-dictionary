package com.example.user.dto;

import com.example.user.model.FrequencyPhysicalActivity;
import com.example.user.model.SexType;
import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Builder
@Value
@Jacksonized
public class UpdateUserInfoRequest {
    String login;
    String mail;
    Integer age;
    String sex;
    Integer height;
    Integer weight;
    String physicalActivity;
    Boolean isNotify;
}
