package com.jobbuddy.backend.service;

import com.jobbuddy.backend.model.ParseJobResponseDto;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;
import org.jsoup.Jsoup;
import java.io.IOException;


@Service
public class JobParsingService {
    public ParseJobResponseDto parse(String url) {
        ParseJobResponseDto dto = new ParseJobResponseDto();
        dto.setUrl(url);

        try {
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
                    .timeout(5000) // 5秒超时
                    .get();

            String pageTitle = doc.title();
            dto.setTitle(pageTitle);

            // TODO: Company and Description
            dto.setCompany("Auto-Detected Company");

        } catch (IOException e) {
            System.err.println("Error scraping: " + e.getMessage());
            dto.setTitle("Failed to load title");
        }
        return dto;
    }
}
