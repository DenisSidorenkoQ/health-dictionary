package com.example.gateway.dto;

import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Builder
@Value
@Jacksonized
public class UserResponse {
    Long id;
    String login;
    String roleName;
}
