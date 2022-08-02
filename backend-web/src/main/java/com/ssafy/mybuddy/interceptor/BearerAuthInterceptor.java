package com.ssafy.mybuddy.interceptor;

import com.ssafy.mybuddy.jwt.AuthorizationExtractor;
import com.ssafy.mybuddy.jwt.JwtTokenProvider;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class BearerAuthInterceptor implements HandlerInterceptor {
    private AuthorizationExtractor authExtractor;
    private JwtTokenProvider jwtTokenProvider;

    public BearerAuthInterceptor(AuthorizationExtractor authExtractor, JwtTokenProvider jwtTokenProvider) {
        this.authExtractor = authExtractor;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) {


        // start
        // 브라우저가 options 메서드인 preflight 요청에 jwt엑세스 토큰을 담은 authorization헤더가 존재하지 않기 때문에
        // 유효성검사에서 에러 발생 -> 브라우저에 cors위반으로 인식 // 정식요청이아니라 preflight 요청일결우 유효성 검사로직을 타지않도록설정
        if (HttpMethod.OPTIONS.matches(request.getMethod())){
            return true;
        }
        // end


        System.out.println(">>> interceptor.preHandle 호출");
        String token = authExtractor.extract(request, "Bearer");
        if (StringUtils.hasLength(token)) {
            System.out.println("성공");
        }

        if (!jwtTokenProvider.validateToken(token)) {
            throw new IllegalArgumentException("유효하지 않은 토큰");
        }

        String email = jwtTokenProvider.getSubject(token);
        System.out.println("email : " + email);
        request.setAttribute("email", email);
        return true;
    }
}