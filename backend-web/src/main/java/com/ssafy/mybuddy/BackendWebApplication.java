package com.ssafy.mybuddy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@ServletComponentScan
@SpringBootApplication
public class BackendWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendWebApplication.class, args);
    }

}
