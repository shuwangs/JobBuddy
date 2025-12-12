package com.jobbuddy.backend.controller;
import org.springframework.stereotype.Controller;
import com.jobbuddy.backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class JobController {
    @Autowired
    private JobService jobService;

    @RequestMapping("/hello")
    @ResponseBody
    public String helloGFG() {
        return "Hello GeeksForGeeks";
    }
}
