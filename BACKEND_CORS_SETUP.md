# Spring Boot 백엔드 CORS 설정 가이드

프론트엔드에서 `http://localhost:8080`의 Spring Boot API를 호출하려면 백엔드에서 CORS 설정이 필요합니다.

## Spring Boot CORS 설정

### 방법 1: Global CORS Configuration (권장)

`WebConfig.java` 파일을 생성하여 전역 CORS 설정을 추가하세요:

```java
package com.shieldhub.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000") // Next.js 개발 서버
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

### 방법 2: Security Configuration (Spring Security 사용 시)

`SecurityConfig.java`에 CORS 설정을 추가하세요:

```java
package com.shieldhub.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            // 기타 보안 설정...
            ;
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
```

### 방법 3: Controller 레벨에서 설정

개별 컨트롤러나 메서드에 `@CrossOrigin` 어노테이션을 추가:

```java
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {
    // 컨트롤러 메서드들...
}
```

## application.properties 설정

```properties
# 서버 포트 (기본값)
server.port=8080

# API 기본 경로
server.servlet.context-path=/

# CORS 허용 (선택사항)
spring.web.cors.allowed-origins=http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,PATCH,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
```

## application.yml 설정

```yaml
server:
  port: 8080
  servlet:
    context-path: /

spring:
  web:
    cors:
      allowed-origins: "http://localhost:3000"
      allowed-methods: GET,POST,PUT,DELETE,PATCH,OPTIONS
      allowed-headers: "*"
      allow-credentials: true
      max-age: 3600
```

## JWT 인증 설정 예시

JWT 토큰 기반 인증을 사용하는 경우:

```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) 
            throws ServletException, IOException {
        
        String token = extractTokenFromRequest(request);
        
        if (token != null && validateToken(token)) {
            // 토큰 검증 로직
            Authentication authentication = getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        
        filterChain.doFilter(request, response);
    }
    
    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
```

## API 엔드포인트 예시

프론트엔드에서 사용할 백엔드 API 엔드포인트 구조:

```
POST   /api/auth/register          - 회원가입
POST   /api/auth/login             - 로그인
POST   /api/auth/check-otp         - OTP 활성화 확인
POST   /api/auth/login-with-otp    - OTP 로그인
POST   /api/auth/logout            - 로그아웃
PUT    /api/auth/change-password   - 비밀번호 변경
POST   /api/auth/reset-password    - 비밀번호 재설정
POST   /api/auth/find-id           - 아이디 찾기

POST   /api/files/encrypt          - 파일 암호화
POST   /api/files/decrypt-upload   - 파일 복호화
GET    /api/files/list             - 파일 목록
DELETE /api/files/{id}             - 파일 삭제
GET    /api/files/download/{id}    - 파일 다운로드

POST   /api/otp/setup              - OTP 설정 (QR 생성)
POST   /api/otp/enable             - OTP 활성화
POST   /api/otp/disable            - OTP 비활성화
GET    /api/otp/status             - OTP 상태 확인
POST   /api/otp/verify             - OTP 검증

POST   /api/website/inspect        - 웹사이트 검사
GET    /api/website/history        - 검사 이력 조회
GET    /api/website/inspection/{id}- 특정 검사 결과
DELETE /api/website/history/{id}   - 검사 이력 삭제

GET    /api/user/profile           - 프로필 조회
PUT    /api/user/profile           - 프로필 수정
DELETE /api/user/account           - 계정 삭제
```

## 테스트 방법

1. Spring Boot 애플리케이션 시작
2. 브라우저 개발자 도구 콘솔에서 테스트:

```javascript
// 로그인 테스트
fetch('http://localhost:8080/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'testuser',
    password: 'password123'
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
```

## 주의사항

1. **프로덕션 환경**: `allowedOrigins`를 실제 배포 도메인으로 변경하세요.
2. **보안**: `allowCredentials(true)` 사용 시 `allowedOrigins`에 와일드카드(`*`) 사용 불가
3. **JWT 토큰**: 토큰 만료 시간과 갱신 로직을 구현하세요.
4. **에러 처리**: 적절한 HTTP 상태 코드와 에러 메시지를 반환하세요.
