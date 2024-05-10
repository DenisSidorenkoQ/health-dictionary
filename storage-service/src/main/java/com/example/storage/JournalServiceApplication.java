package com.example.storage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class JournalServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(JournalServiceApplication.class, args);
    }
}
