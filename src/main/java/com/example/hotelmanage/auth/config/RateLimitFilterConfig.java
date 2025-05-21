package com.example.hotelmanage.auth.config;

import com.example.hotelmanage.auth.sec.RateLimitFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RateLimitFilterConfig {
    @Bean
    public FilterRegistrationBean<RateLimitFilter> rateLimitFilterRegistrationBean (RateLimitFilter rateLimitFilter) {
        FilterRegistrationBean<RateLimitFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(rateLimitFilter);
        registration.addUrlPatterns("/auth/login");
        registration.setOrder(1);
        return registration;
    }
}
