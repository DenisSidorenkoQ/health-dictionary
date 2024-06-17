package com.example.analysis.controller;

import com.example.analysis.dto.MailNotificationRequest;
import com.example.analysis.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @PostMapping("/notification/mail")
    void sendNotification(@RequestBody MailNotificationRequest request) {
    }
}
