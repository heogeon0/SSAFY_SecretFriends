package com.ssafy.mybuddy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    // http://localhost:8080/mybuddy/swagger-ui/index.html

    @Bean
    public Docket postApi() {
        return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).groupName("MyBuddy").select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.mybuddy.controller")).paths(regex("/mybuddy/.*")).build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("MyBuddy REST API").description(
                "<h2>MyBuddy BackEnd</h2>")
                .contact(new Contact("SSAFY", "https://edu.ssafy.com", "ssafy@ssafy.com")).license("SSAFY License")
                .licenseUrl("https://www.ssafy.com/ksp/jsp/swp/etc/swpPrivacy.jsp").version("1.0").build();
    }
}
