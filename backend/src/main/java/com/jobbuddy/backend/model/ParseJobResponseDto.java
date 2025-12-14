package com.jobbuddy.backend.model;

public class ParseJobResponseDto {
    private String title;
    private String company;
    private String location;
    private String description;
    private String salaryRange;
    private String url;


    // Getter
    public String getTitle() {return title;}
    public String getCompany() {return company;}
    public String getLocation() {return location;}
    public String getDescription() {return description;}
    public String getSalaryRange() {return salaryRange;}
    public String getUrl() {return url;}

    // Setters
    public void setTitle(String title) { this.title = title; }
    public void setCompany(String company) { this.company = company; }
    public void setLocation(String location) { this.location = location; }
    public void setDescription(String description) { this.description = description; }
    public void setSalaryRangee(String salaryRange) { this.salaryRange = salaryRange; }
    public void setUrl(String url) { this.url = url; }

}
