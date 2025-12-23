package com.jobbuddy.backend.model;

public class ParseJobResponseDto {
    private String title;
    private String company;
    private String location;
    private String description;
    private String salaryRange;
    private String url;
    private String status;
    private String jobType;
    private boolean success;
    private String error;

    // Getter
    public String getTitle() {return title;}
    public String getCompany() {return company;}
    public String getLocation() {return location;}
    public String getDescription() {return description;}
    public String getSalaryRange() {return salaryRange;}
    public String getUrl() {return url;}
    public String getStatus() { return status; }
    public String getJobType() {return jobType;}
    public boolean isSuccess() { return success; }
    public String getError() { return error; }

    // Setters
    public void setTitle(String title) { this.title = title; }
    public void setCompany(String company) { this.company = company; }
    public void setLocation(String location) { this.location = location; }
    public void setDescription(String description) { this.description = description; }
    public void setSalaryRange(String salaryRange) { this.salaryRange = salaryRange; }
    public void setUrl(String url) { this.url = url; }
    public void setStatus(String status) { this.status = status; }
    public void setJobType(String jobType) { this.jobType = jobType; }
    public void setSuccess(boolean success) { this.success = success; }
    public void setError(String error) { this.error = error; }
}

