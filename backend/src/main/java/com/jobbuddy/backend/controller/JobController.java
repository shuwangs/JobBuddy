package com.jobbuddy.backend.controller;

import com.jobbuddy.backend.model.Job;
import com.jobbuddy.backend.model.JobStatus;
import com.jobbuddy.backend.model.User;
import com.jobbuddy.backend.model.ParseJobResponseDto;
import com.jobbuddy.backend.repository.UserRepository;
import com.jobbuddy.backend.service.JobParsingService;
import com.jobbuddy.backend.service.JobService;
import com.jobbuddy.backend.service.JobParsingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {
    private final JobService jobService;
    private final JobParsingService parsingService;
    private final UserRepository userRepository;

    public JobController(JobService jobService, JobParsingService parsingService, serRepository userRepository) {
        this.jobService = jobService;
        this.parsingService = parsingService;
        this.userRepository = userRepository;
    }

    // Create a New Job
    @PostMapping
    public ResponseEntity<?> createJob(@RequestBody Job job, Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            job.setUser(user);
            Job savedJob = jobService.createJob(job);

            return new ResponseEntity<>(savedJob, HttpStatus.CREATED);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }

    }

    // Get job list
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> jobs = jobService.listAllJobs();
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }

    // Update job status
    @PatchMapping("/{id}/status")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestParam JobStatus status) {
        Job updatedJob = jobService.updateJob(id, status);
        return new ResponseEntity<>(updatedJob, HttpStatus.OK);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Job> deleteJob(@PathVariable Long id) {
        jobService.deleteJobById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/parse")
    public ResponseEntity<ParseJobResponseDto> parseJob(@RequestBody Map<String, String> requestBody) {
        String url = requestBody.get("url");
        System.out.println("🔍 Controller received URL: " + url);
        if (url == null || url.isEmpty()) {
            ParseJobResponseDto errorDto = new ParseJobResponseDto();
            errorDto.setSuccess(false);
            errorDto.setError("URL is missing");
            return new ResponseEntity<>(errorDto, HttpStatus.BAD_REQUEST);
        }
        ParseJobResponseDto parsedData = parsingService.parse(url);
        return new ResponseEntity<>(parsedData, HttpStatus.OK);
    }

}
