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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-white">Shield Hub</span>
            </div>
            <p className="text-gray-400 text-sm">
              최첨단 보안 기술로 디지털 자산을 보호하는
              <br />
              종합 보안 솔루션 플랫폼입니다.
            </p>
          </div>

          {/* 제품 */}
          <div className="space-y-4">
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

          {/* 회사 */}
          <div className="space-y-4">
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

          {/* 지원 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">정보</h3>
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
            <p className="text-gray-400 text-sm">© 2025 Shield Hub. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                개인정보처리방침
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                이용약관
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
