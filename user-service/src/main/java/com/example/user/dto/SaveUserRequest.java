package com.example.user.dto;

import com.example.user.model.SexType;
import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;
import org.springframework.data.relational.core.mapping.Column;

@Builder
@Value
@Jacksonized
public class SaveUserRequest {
    String login;
    String password;
    String roleName;
}
