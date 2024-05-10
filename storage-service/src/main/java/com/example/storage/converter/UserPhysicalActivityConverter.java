package com.example.storage.converter;

import com.example.storage.dto.UserPhysicalActivityDto;
import com.example.storage.model.UserPhysicalActivity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface UserPhysicalActivityConverter {
    UserPhysicalActivity fromDto (UserPhysicalActivityDto userPhysicalActivityDto);
    List<UserPhysicalActivityDto> toDto (List<UserPhysicalActivity> userDietList);
}
