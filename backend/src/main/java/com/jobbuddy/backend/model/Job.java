package com.jobbuddy.backend.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Job {
    private Long id;
    private String title;
    private String company;
    private String url;
    private String location;
    private JobStatus status;
    private String notes;

    private String requisitionNumber;
    private String salaryRange;
    private LocalDate createAt;
    private LocalDate updateAt;

}
