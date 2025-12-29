package com.jobbuddy.backend;

import com.jobbuddy.backend.security.JwtUtils;
import com.jobbuddy.backend.service.CustomUserDetailsService;
import com.jobbuddy.backend.service.JobParsingService;
import com.jobbuddy.backend.service.JobService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = {
        "jwt.secret=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970",
        "jwt.expiration=86400000",
        "spring.datasource.url=jdbc:h2:mem:testdb",
        "spring.datasource.driverClassName=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password="
//        "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration"
})
@AutoConfigureMockMvc
@Import(JwtUtils.class)
public class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtUtils jwtUtils;

    @MockitoBean
    private CustomUserDetailsService customUserDetailsService;

    @MockitoBean
    private JobService jobService;

    @MockitoBean
    private JobParsingService jobParsingService;

    private String validToken;
    private UserDetails mockUser;

    @BeforeEach
    void setUp() {
        mockUser = new User("testuser", "password", Collections.emptyList());
        when(customUserDetailsService.loadUserByUsername(anyString())).thenReturn(mockUser);
        validToken = jwtUtils.generateToken(mockUser);
    }

    @Test
    @DisplayName("Without Token -> 403 Forbidden")
    void shouldReturnForbiddenWhenNoToken() throws Exception {
        mockMvc.perform(get("/api/jobs"))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("With Valid Token -> 200 OK")
    void shouldReturnOkWhenTokenIsValid() throws Exception {
        mockMvc.perform(get("/api/jobs")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("With Invalid Token -> 403 Forbidden")
    void shouldReturnForbiddenWhenTokenIsInvalid() throws Exception {
        mockMvc.perform(get("/api/jobs")
                        .header("Authorization", "Bearer invalid_token"))
                .andExpect(status().isForbidden());
    }
} // <--- 别忘了这个结尾的大括号