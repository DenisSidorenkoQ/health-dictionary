package com.example.storage.model;

import lombok.Builder;
import lombok.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Builder
@Value
@Table("user_doctor_visit")
public class UserDoctorVisit {
    @Id
    @Column("id")
    Long id;
    @Column("user_id")
    Long userId;
    @Column("name")
    String name;
    @Column("description")
    String description;
    @Column("date")
    LocalDateTime date;
    @Column("isNotified")
    Boolean isNotified;
}
