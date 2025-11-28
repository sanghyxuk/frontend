"use client" // 👈 1. usePathname 훅을 사용하기 위해 추가합니다.

import { usePathname } from "next/navigation" // 👈 2. 훅을 불러옵니다.

export function Footer() {
  const pathname = usePathname() // 👈 3. 현재 페이지의 URL 경로를 가져옵니다.
  const isHomePage = pathname === "/" // 👈 4. 홈페이지인지 확인합니다.

  return (
    // 👇 5. 홈페이지 여부에 따라 다른 스타일을 적용합니다.
    <footer
      className={`w-full ${
        isHomePage
          ? "h-screen snap-start flex items-center justify-center bg-black"
          : "relative bg-slate-900 text-gray-300"
      }`}
    >
      <div className="container mx-auto px-8 md:px-16 py-12">
        {/* ✅ 수정: 로고 섹션이 2칸을 차지하고 나머지 섹션은 균등하게 나누도록 그리드 조정 */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8"> 
          
          {/* Company Info - 로고 이미지 영역 (MD에서 2칸 차지) */}
          <div className="space-y-4 md:col-span-2"> 
            <div className="flex items-center space-x-2">
              <img 
                src="/shield-hub-logo.png"
                alt="Shield Hub Logo" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm">
              쉴드 허브는 
              지능형 파일 보안 및 <br></br>웹 취약점 분석을 제공하는 올인원 <br></br>보안 플랫폼입니다.
            </p>
          </div>

          {/* 개발자 */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-lg font-semibold text-white">개발자</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  하서윤
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  표상혁
                </a>
              </li>
              {/* ... 나머지 링크 ... */}
            </ul>
          </div>

          {/* 역할 */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-lg font-semibold text-white">역할</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  프론트엔드
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  백엔드
                </a>
              </li>
              {/* ... 나머지 링크 ... */}
            </ul>
          </div>
          
          {/* 이메일 섹션 */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-lg font-semibold text-white">이메일</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:rachel136@naver.com" className="text-gray-400 hover:text-white text-sm hover:underline">
                  rachel136@naver.com
                </a>
              </li>
              <li>
                <a href="mailto:yunsik134@naver.com" className="text-gray-400 hover:text-white text-sm hover:underline">
                  yunsik134@naver.com
                </a>
              </li>
              {/* 이메일 주소는 실제 주소로 변경하여 사용해주세요 */}
            </ul>
          </div>

          {/* 소속 */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-lg font-semibold text-white">소속</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  수원대 정보보호학과
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  수원대 정보보호학과
                </a>
              </li>
              {/* ... 나머지 링크 ... */}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025. Developed by 하서윤/표상혁 for Capstone Design.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}