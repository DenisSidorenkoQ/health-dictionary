package com.example.storage.converter;

import com.example.storage.dto.UserPhysicalActivityDto;
import com.example.storage.model.UserPhysicalActivity;
import org.mapstruct.Mapper;

@Mapper
public interface UserPhysicalActivityConverter {
    UserPhysicalActivity fromDto (UserPhysicalActivityDto userPhysicalActivityDto);
    UserPhysicalActivityDto toDto (UserPhysicalActivity userPhysicalActivity);
}
