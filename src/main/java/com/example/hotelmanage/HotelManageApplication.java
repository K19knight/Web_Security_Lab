package com.example.hotelmanage;

import com.example.hotelmanage.auth.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(JwtProperties.class)
public class HotelManageApplication {

    public static void main(String[] args) {
        SpringApplication.run(HotelManageApplication.class, args);
    }

}
