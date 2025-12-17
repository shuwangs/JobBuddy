package com.jobbuddy.backend.config;
import org.springframework.context.annotaiton.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5137") // Adjust this to your frontend's URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS");
                // .allowedHeaders("*")
                // .allowCredentials(true);
    };
}