package com.jobbuddy.backend.controller;
import com.jobbuddy.backend.model.Job;
import com.jobbuddy.backend.model.JobStatus;
import com.jobbuddy.backend.service.JobService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")

public class JobController {
    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // Create a New Job
    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody Job job) {
        Job savedJob = jobService.createJob(job);
        return new ResponseEntity<>(savedJob, HttpStatus.CREATED);

    }

    // Get job list
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> jobs = jobService.listAllJobs();
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }

    //Update job status
    @PatchMapping("/{id}/status")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestParam JobStatus status) {
        Job updatedJob=jobService.updateJob(id, status);
        return new ResponseEntity<>(updatedJob, HttpStatus.OK);
    }

    //Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Job> deleteJob(@PathVariable Long id) {
        jobService.deleteJobById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
