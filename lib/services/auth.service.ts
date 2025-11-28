import apiClient from '@/lib/api-client';

// 요청/응답 타입 정의
export interface RegisterRequest {
  username: string;
  password: string;
  name: string;
  email?: string;
  phoneNumber?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginWithOtpRequest extends LoginRequest {
  otpCode: number;
}

export interface LoginResponse {
  token: string;
  type: string;
  userId: number;
  username: string;
  name: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface OtpCheckResponse {
  otpEnabled: boolean;
}

// 인증 관련 API 서비스
export const authService = {
  // 회원가입
  register: async (data: RegisterRequest) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  // 로그인
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('name', response.data.name);
      
      // 로그인 상태 변경 이벤트 발생
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('authStateChanged'));
      }
    }
    return response.data;
  },

  // OTP 활성화 여부 확인
  checkOtp: async (username: string): Promise<OtpCheckResponse> => {
    const response = await apiClient.post('/auth/check-otp', { username });
    return response.data;
  },

  // OTP 로그인
  loginWithOtp: async (data: LoginWithOtpRequest): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/login-with-otp', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('name', response.data.name);
      
      // 로그인 상태 변경 이벤트 발생
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('authStateChanged'));
      }
    }
    return response.data;
  },

  // 로그아웃
  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      // 로그아웃 API 실패해도 로컬 데이터는 삭제
      console.error('Logout API failed:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('name');
      
      // 로그아웃 상태 변경 이벤트 발생
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('authStateChanged'));
      }
    }
  },

  // 비밀번호 변경
  changePassword: async (data: ChangePasswordRequest) => {
    const response = await apiClient.put('/auth/change-password', data);
    return response.data;
  },

  // 비밀번호 재설정
  resetPassword: async (data: ResetPasswordRequest) => {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  },

  // 아이디 찾기 (이메일 또는 전화번호)
  findId: async (identifier: string) => {
    // 이메일 형식인지 전화번호 형식인지 자동 감지
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const payload = isEmail 
      ? { email: identifier } 
      : { phoneNumber: identifier };
    
    const response = await apiClient.post('/auth/find-id', payload);
    return response.data;
  },

  // 회원탈퇴
  withdraw: async (password: string) => {
    // DELETE /api/auth/delete-account, Bearer 토큰 필요
    const response = await apiClient.delete('/auth/delete-account', {
      data: { password },
    });
    // 탈퇴 성공 시 로컬 데이터 삭제 및 이벤트 발생
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('authStateChanged'));
    }
    return response.data;
  },
};
