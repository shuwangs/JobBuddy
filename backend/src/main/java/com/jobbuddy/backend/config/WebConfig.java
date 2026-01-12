package com.jobbuddy.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000", "https://job-buddy-job.vercel.app") // Adjust
                                                                                                                      // this
                                                                                                                      // to
                                                                                                                      // your
                                                                                                                      // frontend's
                                                                                                                      // URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("Authorization", "Content-Type", "Accept").exposedHeaders("Authorization")
        // .allowCredentials(true)
        ;
    };
}