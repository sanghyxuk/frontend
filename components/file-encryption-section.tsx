"use client"

import Link from "next/link"

export function FileEncryptionSection() {
  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-b from-blue-900/20 to-blue-800/10 snap-start">
      <div className="container mx-auto px-8 md:px-16">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            File Encryption <span className="text-gray-400">파일 암호화</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mb-8">
            업계 최고 수준의 암호화 기술로 중요한 파일을 안전하게 보호하고, 클라우드 환경에서도 완벽한 보안을
            유지합니다. 실시간 무결성 검증과 접근 제어로 데이터 보안을 한 단계 더 강화하세요.
          </p>
          <Link href="/encryption">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">파일 암호화</button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Data Security */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 card-hover">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-blue-400 rounded"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Data Security</h3>
            <p className="text-gray-400 text-sm">
              파일 암호화 보안을 위한 AES-256 암호화 알고리즘을 사용하여 최고 수준의 보안을 제공합니다.
            </p>
          </div>

          {/* Cloud Storage */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 card-hover">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-emerald-400 rounded"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Cloud Storage</h3>
            <p className="text-gray-400 text-sm">
              안전하고 신뢰할 수 있는 클라우드 저장소와 연동하여 언제 어디서나 파일에 접근할 수 있습니다.
            </p>
          </div>

          {/* Instant Check */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 card-hover">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-yellow-400 rounded"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Instant Check</h3>
            <p className="text-gray-400 text-sm">
              SHA-256 해시 기반의 실시간 파일 무결성 검증으로 데이터 변조를 즉시 탐지합니다.
            </p>
          </div>

          {/* Access Control & Audit */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 card-hover">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-purple-400 rounded"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Access Control & Audit</h3>
            <p className="text-gray-400 text-sm">
              권한 기반 접근 제어와 상세한 감사 로그를 통해 파일 접근 이력을 완벽하게 관리합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
