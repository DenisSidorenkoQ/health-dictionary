package com.example.gateway.dto;

import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Builder
@Value
@Jacksonized
public class SaveUserResponse {
    String login;
    String password;
    String roleName;
}
