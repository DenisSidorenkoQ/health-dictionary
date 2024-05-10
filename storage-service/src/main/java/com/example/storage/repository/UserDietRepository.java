package com.example.storage.repository;

import com.example.storage.model.UserDiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserDietRepository extends JpaRepository<UserDiet, Long> {
    List<UserDiet> findAllByUserIdAndDateBetween(Long userId, LocalDateTime startDate, LocalDateTime endDate);
}
