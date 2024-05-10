package com.example.user.converter;

import com.example.user.dto.*;
import com.example.user.model.User;
import org.mapstruct.Mapper;

@Mapper
public interface UserConverter {

    UserResponse toUserResponseDto(final User user);
    SaveUserResponse toSaveUserResponseDto(final User user);

    User fromDto(final SaveUserRequest request);

    User fromDto(final UpdateUserInfoRequest request);

    User fromDto(final GetUserByCredentialsRequest request);
}
