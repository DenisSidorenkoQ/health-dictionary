package com.example.storage.converter;

import com.example.storage.dto.UserDoctorVisitDto;
import com.example.storage.model.UserDoctorVisit;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface UserDoctorVisitConverter {
    UserDoctorVisit fromDto (UserDoctorVisitDto userDoctorVisitDto);
    List<UserDoctorVisitDto> toDto (List<UserDoctorVisit> userDietList);
}
