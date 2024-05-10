package com.example.storage.repository;

import com.example.storage.model.UserDoctorVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserDoctorVisitRepository extends JpaRepository<UserDoctorVisit, Long> {
    List<UserDoctorVisit> findAllByUserIdAndDateBetween(Long userId, LocalDateTime startDate, LocalDateTime endDate);
}
