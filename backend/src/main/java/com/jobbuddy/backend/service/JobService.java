package com.jobbuddy.backend.service;
import com.jobbuddy.backend.model.Job;
import com.jobbuddy.backend.model.JobStatus;
import com.jobbuddy.backend.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    private JobRepository jobRepo;

    public JobService(JobRepository jobRepo) {
        this.jobRepo = jobRepo;
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

    public Job updateJob(Long id, JobStatus status) {
        Job job = jobRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        job.setStatus(status);
        return jobRepo.save(job);
    }

}
