package com.example.user.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

@Builder
@Data
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
