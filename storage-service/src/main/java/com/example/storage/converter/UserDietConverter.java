package com.example.storage.converter;

import com.example.storage.dto.UserDietDto;
import com.example.storage.model.UserDiet;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface UserDietConverter {
    UserDiet fromDto (UserDietDto userDietDto);
    List<UserDietDto> toDto (List<UserDiet> userDietList);
}
