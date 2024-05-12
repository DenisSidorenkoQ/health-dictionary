package com.example.gateway.dto;

import com.example.gateway.model.FrequencyPhysicalActivity;
import com.example.gateway.model.SexType;
import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Builder
@Value
@Jacksonized
public class UserResponse {
    private Long id;
    private String login;
    private String mail;
    private Integer age;
    private String sex;
    private Integer height;
    private Integer weight;
    private String roleName;
    private String physicalActivity;
    private Boolean isNotify;
}
