package com.jobbuddy.backend.model;
import com.jobbuddy.backend.model.JobStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String company;

    @Column(columnDefinition = "TEXT")
    private String url;


    private String location;

    @Enumerated(EnumType.STRING)
    private JobStatus status;
    private String notes;

    private String requisitionNumber;
    private String salaryRange;

    @Column(updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        // update time automatically
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        // If there is no status, listed it as WAITLISTED
        if (status == null) {
            status = JobStatus.WAITLISTED;
        }
    }
    // automatic update accordingly.
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
