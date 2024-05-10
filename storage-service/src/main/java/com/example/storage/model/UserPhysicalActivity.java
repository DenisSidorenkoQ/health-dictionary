package com.example.storage.model;

import lombok.Builder;
import lombok.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Builder
@Value
@Table("user_physical_activity")
public class UserPhysicalActivity {
    @Id
    @Column("id")
    Long id;
    @Column("user_id")
    Long userId;
    @Column("activity_type")
    ActivityType activityType;
    @Column("activity_time")
    Integer activityTime;
    @Column("date")
    LocalDateTime date;
}
