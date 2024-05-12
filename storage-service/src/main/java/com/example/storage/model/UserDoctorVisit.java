package com.example.storage.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@Data
@Entity
@Table(name = "user_doctor_visit")
@AllArgsConstructor
@NoArgsConstructor
public class UserDoctorVisit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "date")
    private LocalDateTime date;
    @Column(name = "isNotified")
    private Boolean isNotified;
}
