package com.jobbuddy.backend.service;

import com.jobbuddy.backend.model.ParseJobResponseDto;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;

@Service
public class JobParsingService {
    private final ObjectMapper objectMapper = new ObjectMapper();
    public ParseJobResponseDto parse(String url) {
        ParseJobResponseDto dto = new ParseJobResponseDto();
        dto.setUrl(url);

        dto.setStatus("WAITLISTED");

        if(url == null ||url.isEmpty()) {
            dto.setSuccess(false);
            dto.setError("URL cannot be empty");
            return dto;
        }
        try{
            Document doc;

            //   Indeed use Selenium，while others use Jsoup
            if (url.contains("indeed.com")) {
                doc = fetchWithSelenium(url);
            } else {
                doc = Jsoup.connect(url)
                        .userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
                        .header("Accept-Language", "en-US,en;q=0.9")
                        .timeout(10000)
                        .ignoreHttpErrors(true)
                        .get();
            }
            // According to URL feed to different parser
            if (url.contains("linkedin.com")) {
                parseLinkedin(doc, dto);
            } else if (url.contains("indeed.com")) {
                parseIndeed(doc, dto);
            } else if (url.contains("glassdoor.com")) {
                parseGlassdoor(doc, dto);
            } else {
                //  (Generic Fallback)
                parseGeneric(doc, dto);
            }
            dto.setSuccess(true);

        } catch (IOException e) {
            System.err.println("Error scraping: " + e.getMessage());
            dto.setSuccess(false);
            dto.setError("Failed to parse link: " + e.getMessage());
        }
        return dto;
    }

    private void parseLinkedin(Document doc, ParseJobResponseDto dto) {
        Element jsonScript = doc.selectFirst("script[type='application/ld+json']");
        boolean jsonParsed = false;

        if (jsonScript != null) {
            try {
                JsonNode rootNode = objectMapper.readTree(jsonScript.html());

                if (rootNode.has("title")) {
                    dto.setTitle(rootNode.get("title").asText());
                }
                if (rootNode.has("hiringOrganization")) {
                    dto.setCompany(rootNode.path("hiringOrganization").path("name").asText());
                }
                if (rootNode.has("jobLocation")) {
                    dto.setLocation(rootNode.path("jobLocation").path("address").path("addressLocality").asText());
                }
                jsonParsed = true;
            } catch (Exception e) {
                System.err.println("LinkedIn JSON-LD parsing failed, falling back to HTML.");
            }
        }
        if (!jsonParsed) {
            String title = doc.select("h1").text();
            dto.setTitle(title.isEmpty() ? doc.title() : title);
            dto.setCompany(doc.select(".top-card-layout__first-sub-title").text());
        }
    }

    private void parseIndeed(Document doc, ParseJobResponseDto dto) {
        String title = doc.select("h1").text();
        String company = doc.select("[data-testid='inlineHeader-companyName']").text();
        String location = doc.select("[data-testid='inlineHeader-companyLocation']").text();
        Element salaryEl = doc.selectFirst("#salaryInfoAndJobType");
        String salary = null;
        String jobType = null;
        if (salaryEl != null) {
            String fullText = salaryEl.text(); // eg "$25 an hour - Full-time"

            if (fullText.contains(" - ")) {
                String[] parts = fullText.split(" - ", 2);
                salary = parts[0].trim();
                jobType = parts[1].trim();
            } else {
                if (fullText.contains("$") || fullText.matches(".*\\d.*")) {
                    salary = fullText;
                } else {
                    jobType = fullText;
                }
            }
        }

        dto.setTitle(title);
        dto.setCompany(company);
        dto.setLocation(location);
        dto.setSalaryRange(salary);
        dto.setJobType(jobType);

    }

    private void parseGlassdoor(Document doc, ParseJobResponseDto dto) {
        // Glassdoor 的结构示例
        String title = doc.select("[data-test='job-title']").text();
        dto.setTitle(title.isEmpty() ? doc.title() : title);
        dto.setCompany(doc.select("[data-test='employer-name']").text());
    }

    private void parseGeneric(Document doc, ParseJobResponseDto dto) {
        // 对于不认识的网站，尽力抓取 Title 和 网页标题
        String pageTitle = doc.title();
        dto.setTitle(pageTitle);

        // 尝试从 "Title | Company" 这种常见的网页标题格式中提取公司名
        if (pageTitle.contains("|")) {
            String[] parts = pageTitle.split("\\|");
            if (parts.length > 1) {
                dto.setTitle(parts[0].trim());
                dto.setCompany(parts[1].trim());
            }
        }
    }

    private Document fetchWithSelenium(String url) {
        // configure ChromeDriver
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-gpu");
        options.addArguments("--disable-extensions");

        options.addArguments("--headless=new");
        options.addArguments("--disable-gpu");
        options.addArguments("--no-sandbox");
        options.addArguments("--remote-allow-origins=*");
        options.addArguments("--disable-blink-features=AutomationControlled");
        // fake User-Agent
        options.addArguments("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
        options.setExperimentalOption("excludeSwitches", Collections.singletonList("enable-automation"));
        options.setExperimentalOption("useAutomationExtension", false);

        options.addArguments("--window-size=1920,1080");
        options.addArguments("--start-maximized");
        WebDriver driver = new ChromeDriver(options);
        try {
            driver.get(url);

            try { Thread.sleep(5000); } catch (InterruptedException e) {}

            String pageSource = driver.getPageSource();

            return Jsoup.parse(pageSource);

        } finally {
            // 记得关闭浏览器，否则内存会爆
            if (driver != null) {
                driver.quit();
            }
        }
    }
}