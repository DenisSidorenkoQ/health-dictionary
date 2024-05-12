package com.example.storage.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@Data
@Entity
@Table(name = "user_diet")
@NoArgsConstructor
@AllArgsConstructor
public class UserDiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "food_name")
    private String foodName;
    @Column(name = "calories")
    private Float calories;
    @Column(name = "date")
    private LocalDateTime date;
}
