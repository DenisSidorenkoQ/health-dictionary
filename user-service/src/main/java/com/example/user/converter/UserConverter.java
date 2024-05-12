package com.example.user.converter;

import com.example.user.dto.*;
import com.example.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserConverter {
    @Mapping(source = "user.isNotify", target = "isNotify")
    UserResponse toUserResponseDto(User user);
    SaveUserResponse toSaveUserResponseDto(final User user);

    User fromDto(final SaveUserRequest request);

    User fromDto(final UpdateUserInfoRequest request);

    User fromDto(final GetUserByCredentialsRequest request);
}
