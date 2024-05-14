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
    Long id;
    @Column(name = "user_id")
    Long userId;
    @Column(name = "activity_type")
    String activityType;
    @Column(name = "activity_time")
    Integer activityTime;
    @Column(name = "date")
    LocalDateTime date;
}
