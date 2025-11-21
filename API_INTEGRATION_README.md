# ShieldHub Frontend - API 연동 가이드

Next.js 프론트엔드와 Spring Boot 백엔드(8080 포트) API 연동 설정이 완료되었습니다.

## 📁 프로젝트 구조

```
lib/
├── api-client.ts                    # Axios 클라이언트 설정
├── services/
│   ├── index.ts                     # 서비스 통합 export
│   ├── auth.service.ts              # 인증 관련 API
│   ├── file.service.ts              # 파일 암호화/복호화 API
│   ├── otp.service.ts               # OTP(2단계 인증) API
│   ├── website.service.ts           # 웹사이트 보안 검사 API
│   ├── user.service.ts              # 사용자 프로필 API
│   └── api-usage-examples.ts        # API 사용 예시
```

## 🚀 시작하기

### 1. 환경 변수 설정

`.env.local` 파일이 이미 생성되어 있습니다:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 2. 의존성 설치 확인

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

프론트엔드: http://localhost:3000
백엔드: http://localhost:8080

## 📡 API 사용 방법

### 기본 사용법

```typescript
import { authService, fileService, otpService } from '@/lib/services';

// 로그인
const response = await authService.login({
  username: 'user',
  password: 'password'
});

// 파일 암호화
const encryptedFile = await fileService.encryptFile(file);

// OTP 설정
const otpSetup = await otpService.setupOtp();
```

### 컴포넌트에서 사용

```typescript
'use client';

import { useState } from 'react';
import { authService } from '@/lib/services';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await authService.login({ username, password });
      console.log('로그인 성공:', result);
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* 폼 필드들... */}
    </form>
  );
}
```

## 🔧 API 서비스

### 1. 인증 서비스 (authService)

- `register()` - 회원가입
- `login()` - 로그인
- `checkOtp()` - OTP 활성화 여부 확인
- `loginWithOtp()` - OTP 로그인
- `logout()` - 로그아웃
- `changePassword()` - 비밀번호 변경
- `resetPassword()` - 비밀번호 재설정
- `findId()` - 아이디 찾기

### 2. 파일 서비스 (fileService)

- `encryptFile()` - 파일 암호화
- `decryptFile()` - 파일 복호화
- `getFileList()` - 파일 목록 조회
- `deleteFile()` - 파일 삭제
- `downloadFile()` - 파일 다운로드

### 3. OTP 서비스 (otpService)

- `setupOtp()` - OTP 설정 (QR 코드 생성)
- `enableOtp()` - OTP 활성화
- `disableOtp()` - OTP 비활성화
- `getOtpStatus()` - OTP 상태 확인
- `verifyOtp()` - OTP 코드 검증

### 4. 웹사이트 검사 서비스 (websiteService)

- `inspectWebsite()` - 웹사이트 보안 검사
- `getInspectionHistory()` - 검사 이력 조회
- `getInspectionResult()` - 특정 검사 결과 조회
- `deleteInspectionHistory()` - 검사 이력 삭제

### 5. 사용자 서비스 (userService)

- `getProfile()` - 프로필 조회
- `updateProfile()` - 프로필 수정
- `deleteAccount()` - 계정 삭제

## 🔐 인증 처리

API 클라이언트는 자동으로 JWT 토큰을 관리합니다:

1. 로그인 성공 시 토큰이 localStorage에 자동 저장
2. 모든 API 요청에 자동으로 토큰 포함
3. 401 에러 발생 시 자동으로 로그인 페이지로 리다이렉트

## 📋 백엔드 설정

Spring Boot 백엔드에서 CORS 설정이 필요합니다.
자세한 내용은 [BACKEND_CORS_SETUP.md](./BACKEND_CORS_SETUP.md)를 참고하세요.

### 백엔드 필수 설정

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

## 🧪 API 테스트

자세한 사용 예시는 `lib/services/api-usage-examples.ts`를 참고하세요.

## 🛠️ 기술 스택

- **Framework**: Next.js 14
- **HTTP Client**: Axios
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui

## 📝 다음 단계

1. ✅ API 클라이언트 설정 완료
2. ✅ 서비스 파일 생성 완료
3. ⏳ 백엔드 CORS 설정 (Spring Boot)
4. ⏳ 각 페이지에 API 연동
5. ⏳ 에러 처리 및 로딩 상태 구현
6. ⏳ 토스트 알림 추가

## 🚨 주의사항

- `.env.local` 파일은 Git에 커밋하지 마세요
- 프로덕션 배포 시 `NEXT_PUBLIC_API_URL`을 실제 서버 주소로 변경하세요
- 민감한 정보는 환경 변수를 사용하세요

## 📞 문제 해결

### CORS 에러가 발생하는 경우
- 백엔드 CORS 설정 확인
- `withCredentials: true` 설정 확인

### 401 에러가 발생하는 경우
- 토큰이 만료되었거나 유효하지 않음
- 다시 로그인 필요

### 네트워크 에러가 발생하는 경우
- 백엔드 서버가 실행 중인지 확인 (localhost:8080)
- API URL이 올바른지 확인
