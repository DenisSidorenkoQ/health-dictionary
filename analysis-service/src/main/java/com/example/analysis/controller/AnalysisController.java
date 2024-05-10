package com.example.analysis.controller;

import com.example.analysis.dto.UserAnalysisDto;
import com.example.analysis.service.AnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AnalysisController {
    private final AnalysisService analysisService;

    @GetMapping("/users/{userId}/analysis")
    List<UserAnalysisDto> getAnalysisByDate(@PathVariable Long userId, @RequestParam LocalDateTime startDate,
                                            @RequestParam LocalDateTime endDate) {
        return analysisService.analysisByDate(userId, startDate, endDate);
    }
}
