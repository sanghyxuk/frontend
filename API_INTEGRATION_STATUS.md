# API 연동 완료 페이지 목록 ✅

## 📌 완료된 페이지

### 1. ✅ 로그인 페이지 (`/login`)
**파일:** `app/login/page.tsx`

**구현된 기능:**
- ✅ 아이디/비밀번호 입력
- ✅ OTP 활성화 자동 확인
- ✅ 일반 로그인 처리
- ✅ OTP 로그인 페이지로 자동 전환
- ✅ 아이디 저장 기능
- ✅ 로딩 상태 & 에러 처리
- ✅ Toast 알림

**API:**
- `POST /api/auth/check-otp` - OTP 확인
- `POST /api/auth/login` - 일반 로그인

---

### 2. ✅ OTP 로그인 페이지 (`/login/otp`)
**파일:** `app/login/otp/page.tsx`

**구현된 기능:**
- ✅ sessionStorage에서 로그인 정보 자동 로드
- ✅ 6자리 OTP 코드 입력
- ✅ OTP 로그인 처리
- ✅ 숫자만 입력 가능
- ✅ 로딩 상태 & 에러 처리
- ✅ Toast 알림
- ✅ 취소 버튼

**API:**
- `POST /api/auth/login-with-otp` - OTP 로그인

---

### 3. ✅ 회원가입 페이지 (`/signup`)
**파일:** `app/signup/page.tsx`

**구현된 기능:**
- ✅ 이름, 아이디, 비밀번호, 전화번호, 이메일 입력
- ✅ 비밀번호 강도 실시간 체크
- ✅ 비밀번호 확인 매칭
- ✅ 이메일/전화번호 유효성 검증
- ✅ 로딩 상태 & 에러 처리
- ✅ Toast 알림
- ✅ 회원가입 성공 시 로그인 페이지로 이동

**API:**
- `POST /api/auth/register` - 회원가입

**Request Body:**
```json
{
  "username": "testuser",
  "password": "password123",
  "name": "홍길동",
  "email": "test@example.com",
  "phoneNumber": "010-1234-5678"
}
```

---

### 4. ✅ 아이디 찾기 페이지 (`/find-id`)
**파일:** `app/find-id/page.tsx`

**구현된 기능:**
- ✅ 이메일/전화번호 탭 전환
- ✅ 이메일로 아이디 찾기
- ✅ 전화번호로 아이디 찾기
- ✅ 자동 형식 감지 및 적절한 파라미터 전송
- ✅ 결과 표시 화면
- ✅ 로딩 상태 & 에러 처리
- ✅ Toast 알림

**API:**
- `POST /api/auth/find-id` - 아이디 찾기

**Request Body (이메일):**
```json
{
  "email": "test@example.com"
}
```

**Request Body (전화번호):**
```json
{
  "phoneNumber": "010-1234-5678"
}
```

---

### 5. ✅ 비밀번호 재설정 페이지 (`/reset-password`)
**파일:** `app/reset-password/page.tsx`

**구현된 기능:**
- ✅ 이메일 입력
- ✅ 이메일 유효성 검증
- ✅ 재설정 링크 전송
- ✅ 전송 완료 화면
- ✅ 로딩 상태 & 에러 처리
- ✅ Toast 알림

**API:**
- `POST /api/auth/reset-password` - 비밀번호 재설정

**Request Body:**
```json
{
  "email": "test@example.com"
}
```

---

## 🔧 공통 기능

### API 클라이언트 (`lib/api-client.ts`)
- ✅ Axios 기반 HTTP 클라이언트
- ✅ 기본 URL 설정: `http://localhost:8080/api`
- ✅ JWT 토큰 자동 추가 (요청 인터셉터)
- ✅ 401 에러 자동 처리 (응답 인터셉터)
- ✅ CORS 지원 (withCredentials)

### 인증 서비스 (`lib/services/auth.service.ts`)
- ✅ register() - 회원가입
- ✅ login() - 일반 로그인
- ✅ checkOtp() - OTP 확인
- ✅ loginWithOtp() - OTP 로그인
- ✅ findId() - 아이디 찾기 (이메일/전화번호 자동 감지)
- ✅ resetPassword() - 비밀번호 재설정
- ✅ logout() - 로그아웃
- ✅ changePassword() - 비밀번호 변경

### Toast 알림 시스템
- ✅ Toaster 컴포넌트 추가 (`app/client-layout.tsx`)
- ✅ 전역에서 사용 가능
- ✅ 성공/실패 메시지 표시

---

## 📝 백엔드 API 요구사항

### 필수 엔드포인트

1. **POST /api/auth/register**
   - Request: `{ username, password, name, email?, phoneNumber? }`
   - Response: 회원가입 결과

2. **POST /api/auth/login**
   - Request: `{ username, password }`
   - Response: `{ token, type, userId, username, name }`

3. **POST /api/auth/check-otp**
   - Request: `{ username }`
   - Response: `{ otpEnabled: boolean }`

4. **POST /api/auth/login-with-otp**
   - Request: `{ username, password, otpCode }`
   - Response: `{ token, type, userId, username, name }`

5. **POST /api/auth/find-id**
   - Request: `{ email }` 또는 `{ phoneNumber }`
   - Response: `{ userId, username }`

6. **POST /api/auth/reset-password**
   - Request: `{ email }`
   - Response: 재설정 이메일 전송 결과

---

## 🚀 다음 단계 (미완료)

### 메인 기능 페이지
- ⏳ 파일 암호화 (`/encryption`)
- ⏳ 파일 복호화 (`/decryption`)
- ⏳ 웹사이트 보안 검사 (`/website-inspection`)

### 설정 페이지
- ⏳ 프로필 설정 (`/settings`)
- ⏳ 비밀번호 변경
- ⏳ OTP 설정

### 히스토리 페이지
- ⏳ 파일 이력 (`/file-history`)
- ⏳ URL 검사 이력 (`/url-history`)

---

## 🧪 테스트 가이드

### 1. 회원가입 → 로그인 플로우
```
1. /signup 접속
2. 모든 필드 입력
3. 회원가입 버튼 클릭
4. 성공 시 /login으로 리다이렉트
5. 로그인 진행
```

### 2. OTP 로그인 플로우
```
1. /login 접속
2. OTP 활성화된 계정으로 로그인 시도
3. 자동으로 /login/otp로 이동
4. 6자리 OTP 코드 입력
5. 인증 완료
```

### 3. 아이디 찾기 플로우
```
1. /find-id 접속
2. 이메일 또는 전화번호 선택
3. 정보 입력
4. 아이디 찾기 결과 표시
```

### 4. 비밀번호 재설정 플로우
```
1. /reset-password 접속
2. 이메일 입력
3. 재설정 링크 전송
4. 이메일 확인 안내 표시
```

---

## 🔐 보안 기능

- ✅ JWT 토큰 자동 관리 (localStorage)
- ✅ 401 에러 시 자동 로그아웃
- ✅ OTP 정보 임시 저장 (sessionStorage)
- ✅ 비밀번호 강도 체크
- ✅ 입력값 유효성 검증
- ✅ CORS 지원

---

## 💡 개발 서버 실행

```bash
# 프론트엔드
npm run dev
# http://localhost:3000

# 백엔드 (Spring Boot)
# http://localhost:8080
```

---

## 📄 관련 문서

- [API_INTEGRATION_README.md](./API_INTEGRATION_README.md) - API 연동 가이드
- [BACKEND_CORS_SETUP.md](./BACKEND_CORS_SETUP.md) - Spring Boot CORS 설정
- [LOGIN_API_INTEGRATION.md](./LOGIN_API_INTEGRATION.md) - 로그인 상세 가이드
