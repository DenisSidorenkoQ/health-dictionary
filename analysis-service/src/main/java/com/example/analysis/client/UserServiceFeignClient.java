package com.example.analysis.client;

import com.example.analysis.dto.UserDietDto;
import com.example.analysis.dto.UserPhysicalActivityDto;
import com.example.analysis.dto.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@FeignClient("User")
public interface UserServiceFeignClient {
    @RequestMapping(method = RequestMethod.GET, value = "localhost:8081/api/v1/user/{userId}")
    Optional<UserResponse> getById(@PathVariable Long userId);
}
