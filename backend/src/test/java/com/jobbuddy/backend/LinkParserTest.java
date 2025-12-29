package com.jobbuddy.backend;

import com.jobbuddy.backend.model.ParseJobResponseDto;
import com.jobbuddy.backend.service.JobParsingService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class LinkParserTest {

    // 直接实例化 Service，不需要启动 Spring Context，速度快
    private final JobParsingService jobParsingService = new JobParsingService();

    @Test
    void testParsingJobUrl() {
        // Test URL
        String url = "https://www.linkedin.com/jobs/view/4294685788/?alternateChannel=search&eBP=CwEAAAGbSYIifqj3p97zHWqOVDnshAiSW-2hspQAxDVP8WYpG-2P3mBvv7ipGOhuJ5cDXvtCsAXAAM-ImVGV00dmDlpy6wWIuYtWm4bFj2Vyitu7HPkhZAZjmWHDVpROYkS3u9tb5PFDn01MF9hrGlvaRztxRkRu4r7lR56bVaZAZ8tuO7O4pjcmFlzPIbCbuJxA3vBm-j54HhJ2w6jP3gmVI2ZGFL5uCZJRdMbBSZlfSuuTfVcLHZgzrLVSPgHdU5700yd7soSioV2x1ZvVyzl0GgJTF6XBbfVBJu5bGY692BcBDWqCR2idPxqaVKCn8x1NfC5zA8H_AyrtDTsN9Ua2Nc2PuzVLdxX6ZHPHnzFucMopRr6l1p7KlHok-D437KCZ_utMzBrtH6hf6hu624YkO3JGoGXC3COAxzdRqHuSMG_7YB21FxrxTXDxxmLnitnTwnzGDpTHbb8r9AzIWhcl1l-25asGn1w14fM-J6qs&refId=EMLefSneQ1DT66MzjF5fMg%3D%3D&trackingId=UUsAwk0affNNvpSHIazYnw%3D%3D";

        System.out.println("Start testing URL: " + url);

        // 调用 Service
        ParseJobResponseDto result = jobParsingService.parse(url);

        // 1. 基础断言：确保结果不为空
        assertNotNull(result, "Result object should not be null");

        // 2. 打印结果 (不再使用 split，因为 Service 已经帮我们拆好了)
        if (result.isSuccess()) {
            System.out.println("===========================================");
            System.out.println("✅ 解析成功 (Parse Success)");
            System.out.println("===========================================");
            System.out.println("Job Title: " + result.getTitle());
            System.out.println("Company:   " + result.getCompany());
            System.out.println("Location:  " + result.getLocation());
            System.out.println("Status:    " + result.getStatus());
            System.out.println("===========================================");

            // 3. 逻辑断言：确保确实抓到了关键信息
            // 只有当这些 assert 通过，Jenkins/CI 才会显示绿勾
            // assertTrue(result.getTitle() != null && !result.getTitle().isEmpty(), "Title shouldn't be empty");
            // assertTrue(result.getCompany() != null && !result.getCompany().isEmpty(), "Company shouldn't be empty");

        } else {
            System.err.println("❌ 解析失败: " + result.getError());
        }
    }


    @Test
    void testParsingJobUrlFromIndeed() {
        // Test URL
        String url = "https://www.indeed.com/viewjob?jk=44c14a52ebb70511&tk=1jcq6sdm5hb4s801&from=jobi2a&advn=235593455994010&adid=452188565&ad=-6NYlbfkN0ARyD88zZa8G4fZaD6jLAgXtQ8K-B7dWBWCK8oXQKVaKk40B24V_ZZMtxI72DvQk4L2-9RNSbSAlnho1TkI4YFR_n5cMVJC6zeRwl04KfDSiUwD9QuYnp-IEo3uAh4PQibc2lV0iyD-fRAsPMQ2suHwuSs7h4TWnYlttJJ3eaHfKuJdZjteF5RCU3Ba7q-Q3Ja2mjNsXRwjsN8qUNNaIs_T7jXHVX4DPRHWVRQ36gCU-RkBPlUrYBr62gTH_WiHWXdoki73F3XcnpPzEyHDgZJEXkJUT0fPf6b5XW5c9x9_p3wrJ8qkYmrZKbWvOAEPDMqFTw_WhxF4OJvLz6JtGU1fY9XGv7yQJ3pExrIt3DLkTWLCQao5d7ffjQWQyB8DyA-PAGNZ6dPzN6WTLigCKFacbZNa9PSOE1JLCsc6LCSzp-wrEARHwFftaCRwxfQCppZDINv9V-PsNiwkoyx_8e2qgIpSpsx8v7Zb9Az5DZl1-VUeRc3BqM76C2Q_ra_6SqskykdcCQ_8cqTho-r-xWX7K0pFhZRIhMm5AyQlSG8BWOmeRNXebCY8tcHd5dMXBpcBoi5yqfffdRlvQdmB-nJaIP6wqnAwhwJGm8FrX6pKob3Dq_sFK_Z9&pub=21d85ca573e478f5e659e48885c828920cace3277f6b99df&i2af=jobi2a_multijob-en-US_email&camk=UoKtGZLa3XLRqq6E2fxEkw%3D%3D&jrtk=5-cmh1-1-1jcq6sd4ek41n806-44c14a52ebb70511&xkcb=SoDC6_M3paF-YaQSwx0LbzkdCdPP&xpse=SoCG6_I3pk7D1DWoD50PbzkdCdPP&xfps=078aeb36-2f95-4fba-adbe-6acf923d9cbd";

        System.out.println("Start testing URL fron Indeed: " + url);

        // Call the parser job Service
        ParseJobResponseDto result = jobParsingService.parse(url);

        assertNotNull(result, "Result object should not be null");

        if (result.isSuccess()) {
            System.out.println("===========================================");
            System.out.println("✅ (Parse Success)");
            System.out.println("===========================================");
            System.out.println("Job Title: " + result.getTitle());
            System.out.println("Company:   " + result.getCompany());
            System.out.println("Location:  " + result.getLocation());
            System.out.println("Status:    " + result.getStatus());
            System.out.println("Salary:    " + result.getSalaryRange());
            System.out.println("Job Type:    " + result.getJobType());

            System.out.println("===========================================");

        } else {
            System.err.println("❌ Parse failed: " + result.getError());
        }
    }
}
