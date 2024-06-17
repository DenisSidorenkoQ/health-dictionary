package com.example.storage.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@Data
@Entity
@Table(name = "user_physical_activity")
@AllArgsConstructor
@NoArgsConstructor
public class UserPhysicalActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "activity_type")
    private String activityType;
    @Column(name = "activity_time")
    private Integer activityTime;
    @Column(name = "date")
    private LocalDateTime date;
}
