"use client"

import Link from "next/link"

export function FunctionsSection() {
  return (
    // h-screen 제거 및 py-20/py-32 적용 (유연한 높이)
    <section className="py-20 md:py-32 bg-slate-800 snap-start">
      <div className="container mx-auto px-8 md:px-16">
        
        {/* mb-10 md:mb-16으로 변경 (모바일 상단 여백 축소) */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Functions <span className="text-gray-400">기능</span>
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Shield Hub은 기업의 기밀 정보를 보호하는 포괄적인 보안 솔루션을 제공합니다.
            <br />
            파일 암호화부터 웹사이트 보안 검사까지, 모든 보안 요구사항을 하나의 플랫폼에서 해결하세요.
          </p>
        </div>

        {/* 모바일 1열 그리드 유지, LG에서 2열 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* File Encryption Card */}
          <Link href="/encryption">
            {/* ⭐️ 수정: p-4 md:p-6으로 변경 (최소화된 padding) */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 p-4 md:p-6 rounded-2xl border border-emerald-500/30 card-hover relative cursor-pointer">
              <div className="flex justify-between items-start mb-4"> {/* ✅ 수정: mb-6 -> mb-4 */}
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center"> {/* ✅ 수정: 아이콘 배경 크기 w-12 h-12 -> w-10 h-10 */}
                  <div className="w-5 h-5 bg-emerald-400 rounded"></div> {/* ✅ 수정: 내부 아이콘 크기 w-6 h-6 -> w-5 h-5 */}
                </div>
                <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center"> {/* ✅ 수정: 아이콘 w-8 h-8 -> w-7 h-7 */}
                  <span className="text-white">→</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-emerald-400 mb-2">File Encryption</h3> {/* ✅ 수정: mb-3 -> mb-2 */}
              <p className="text-gray-300 text-xs md:text-sm mb-4"> {/* ✅ 수정: text-sm -> text-xs, mb-6 -> mb-4 */}
                군사급 암호화 기술로 파일을 안전하게 보호하고, 클라우드 저장소와 연동하여
                <br />
                어디서나 안전한 파일 관리가 가능합니다. 실시간 파일 무결성 검증과
                <br />
                자동 백업 기능으로 데이터 손실 위험을 최소화합니다.
              </p>
            </div>
          </Link>

          {/* Website Security Scan Card */}
          <Link href="/website-inspection">
            {/* ⭐️ 수정: p-4 md:p-6으로 변경 (최소화된 padding) */}
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 p-4 md:p-6 rounded-2xl border border-blue-500/30 card-hover relative cursor-pointer">
              <div className="flex justify-between items-start mb-4"> {/* ✅ 수정: mb-6 -> mb-4 */}
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center"> {/* ✅ 수정: 아이콘 배경 크기 w-12 h-12 -> w-10 h-10 */}
                  <div className="w-5 h-5 bg-blue-400 rounded"></div> {/* ✅ 수정: 내부 아이콘 크기 w-6 h-6 -> w-5 h-5 */}
                </div>
                <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center"> {/* ✅ 수정: 아이콘 w-8 h-8 -> w-7 h-7 */}
                  <span className="text-white">→</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-blue-400 mb-2">Website Security Scan</h3> {/* ✅ 수정: mb-3 -> mb-2 */}
              <p className="text-gray-300 text-xs md:text-sm mb-4"> {/* ✅ 수정: text-sm -> text-xs, mb-6 -> mb-4 */}
                웹사이트의 보안 취약점을 실시간으로 모니터링하고, 상세한 보고서를 통해
                <br />
                보안 상태를 한눈에 파악할 수 있습니다. AI 기반 위협 분석으로
                <br />
                새로운 보안 위협에도 신속하게 대응합니다.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}