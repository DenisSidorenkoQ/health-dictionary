package com.example.storage.model;

import lombok.Builder;
import lombok.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.Entity;
import java.time.LocalDateTime;

@Builder
@Value
@Table("user_diet")
public class UserDiet {
    @Id
    @Column("id")
    Long id;
    @Column("user_id")
    Long userId;
    @Column("food_name")
    String foodName;
    @Column("calories")
    Float calories;
    @Column("sugar")
    Float sugar;
    @Column("date")
    LocalDateTime date;
}
