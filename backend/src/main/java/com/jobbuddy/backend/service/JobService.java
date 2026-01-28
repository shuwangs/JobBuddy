package com.jobbuddy.backend.service;

import com.jobbuddy.backend.model.Job;
import com.jobbuddy.backend.model.JobStatus;
import com.jobbuddy.backend.model.User;
import com.jobbuddy.backend.repository.JobRepository;
import com.jobbuddy.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    private JobRepository jobRepo;
    private UserRepository userRepo;

    public JobService(JobRepository jobRepo) {
        this.jobRepo = jobRepo;
        this.userRepo = userRepo;
    }

    public List<Job> listAllJobs() {
        return jobRepo.findAll();
    }

    public Job getJobById(Long id) {
        return jobRepo.findById(id).orElse(null);
    }

    public Job createJob(Job job) {
        return jobRepo.save(job);
    }

    public void deleteJobById(Long id) {
        jobRepo.deleteById(id);
    }

    public Job updateJob(Long id, String username, Job updatedJob) {
        Job job = jobRepo.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));
        if (updatedJob.getStatus() != null) {
            job.setStatus(updatedJob.getStatus());
        }
        if (updatedJob.getNotes() != null) {
            job.setNotes(updatedJob.getNotes());
        }

        return jobRepo.save(job);
    }

    public List<Job> listJobsByUser(String username) {
        return jobRepo.findByUsername(username);
    }

}
