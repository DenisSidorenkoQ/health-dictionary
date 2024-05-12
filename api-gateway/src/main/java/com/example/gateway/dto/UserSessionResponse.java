package com.example.gateway.dto;

import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

@Builder
@Value
@Jacksonized
public class UserSessionResponse {
    private Long id;
    private String login;
    private String roleName;
}
