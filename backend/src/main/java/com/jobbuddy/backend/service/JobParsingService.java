package com.jobbuddy.backend.service;

import com.jobbuddy.backend.model.ParseJobResponseDto;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;
import org.jsoup.Jsoup;
import java.io.IOException;
import java.util.HashMap;

@Service
public class JobParsingService {
    public ParseJobResponseDto parse(String url) {
        ParseJobResponseDto dto = new ParseJobResponseDto();
        dto.setUrl(url);

        dto.setStatus("WAITLISTED");

        if(url == null ||url.isEmpty()) {
            dto.setSuccess(false);
            dto.setError("URL cannot be empty");
            return dto;
        }

        try {
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
                    .timeout(5000) // 5秒超时
                    .get();

            String title = doc.select("meta[property=og:title]").attr("content");
            String siteName = doc.select("meta[property=og:site_name]").attr("content");
            String description = doc.select("meta[property=og:description]").attr("content");

            if (title.isEmpty()) {
                title = doc.title();
            }
            if (title.contains("|")) {
                title = title.substring(0, title.indexOf("|")).trim();
            }
            // TODO: Company and Description
            String company = siteName;
            if (title.contains(" at ")) {
                String[] parts = title.split(" at ");
                if (parts.length > 1) {
                    title = parts[0].trim();
                    company = parts[1].trim();
                }
            }

            dto.setTitle(title);
            dto.setCompany(company);
            dto.setDescription(description);
            dto.setSuccess(true);


        } catch (IOException e) {
            System.err.println("Error scraping: " + e.getMessage());
            dto.setSuccess(false);
            dto.setError("Failed to parse link: " + e.getMessage());
        }
        return dto;
    }
}
