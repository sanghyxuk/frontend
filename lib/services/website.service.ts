import apiClient from '@/lib/api-client';

// 웹사이트 검사 관련 타입 정의
export interface WebsiteInspectionRequest {
  url: string;
}

export interface WebsiteInspectionResponse {
  url: string;
  status: 'safe' | 'warning' | 'dangerous';
  score: number;
  threats: string[];
  recommendations: string[];
  scanDate: string;
}

export interface InspectionHistory {
  id: number;
  url: string;
  status: string;
  score: number;
  scanDate: string;
}

// 웹사이트 보안 검사 관련 API 서비스
export const websiteService = {
  // 웹사이트 보안 검사
  inspectWebsite: async (
    data: WebsiteInspectionRequest
  ): Promise<WebsiteInspectionResponse> => {
    const response = await apiClient.post('/website/inspect', data);
    return response.data;
  },

  // 검사 이력 조회
  getInspectionHistory: async (): Promise<InspectionHistory[]> => {
    const response = await apiClient.get('/website/history');
    return response.data;
  },

  // 특정 검사 결과 조회
  getInspectionResult: async (
    inspectionId: number
  ): Promise<WebsiteInspectionResponse> => {
    const response = await apiClient.get(`/website/inspection/${inspectionId}`);
    return response.data;
  },

  // 검사 이력 삭제
  deleteInspectionHistory: async (inspectionId: number) => {
    const response = await apiClient.delete(`/website/history/${inspectionId}`);
    return response.data;
  },
};
