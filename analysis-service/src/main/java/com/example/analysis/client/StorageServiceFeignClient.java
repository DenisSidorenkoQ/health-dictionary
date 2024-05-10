package com.example.analysis.client;

import com.example.analysis.dto.UserDietDto;
import com.example.analysis.dto.UserPhysicalActivityDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;

@FeignClient("Storage")
public interface StorageServiceFeignClient {
    @RequestMapping(method = RequestMethod.GET, value = "localhost:8082/api/v1/users/{userId}/diets")
    List<UserDietDto> getAllDietsByDate(@PathVariable Long userId, @RequestParam LocalDateTime startDate,
                                        @RequestParam LocalDateTime endDate);

    @RequestMapping(method = RequestMethod.GET, value = "localhost:8082/api/v1/users/{userId}/physical-activity")
    List<UserPhysicalActivityDto> getAllActivityByDate(@PathVariable Long userId, @RequestParam LocalDateTime startDate,
                                                       @RequestParam LocalDateTime endDate);
}
