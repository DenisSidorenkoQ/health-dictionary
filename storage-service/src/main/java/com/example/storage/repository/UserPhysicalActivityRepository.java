package com.example.storage.repository;

import com.example.storage.model.UserPhysicalActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserPhysicalActivityRepository extends JpaRepository<UserPhysicalActivity, Long> {
    List<UserPhysicalActivity> findAllByUserIdAndDateBetween(Long userId, LocalDateTime startDate, LocalDateTime endDate);
}
