package com.ssafy.mybuddy.config;

import com.ssafy.mybuddy.interceptor.BearerAuthInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:8080")
//                .maxAge(3600); // 3600초 동안 preflight 결과를 캐시에 저장
//    }
    private final BearerAuthInterceptor bearerAuthInterceptor;




    public WebConfig(BearerAuthInterceptor bearerAuthInterceptor) {
        this.bearerAuthInterceptor = bearerAuthInterceptor;
    }

    public void addInterceptors(InterceptorRegistry registry){
        System.out.println(">>> 인터셉터 등록");
        registry.addInterceptor(bearerAuthInterceptor)
                .excludePathPatterns("/member/login/**")
                .excludePathPatterns("/member/signup/**")
                .excludePathPatterns("/children/iot/**")
                .excludePathPatterns("/answer/iot/**")
                .excludePathPatterns("/mycharacter/iot/**")
                .addPathPatterns("/answer/**")
                .addPathPatterns("/character/*")
                .addPathPatterns("/children/**")
                .addPathPatterns("/member/**")
                .addPathPatterns("/mycharacter/**");
    }
}