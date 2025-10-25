export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="white" />
                </svg>
              </div>
              <span className="font-bold text-lg">SHIELD PLUS</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              파일을 안전하게 암호화하고 관리하는
              <br />
              엔터프라이즈급 보안 솔루션입니다.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">회사 정보</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  회사 소개
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  팀 소개
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">개발자</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API 문서
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  개발자 가이드
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">문의</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>support@shieldplus.com</li>
              <li>privacy@shieldplus.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 Shield Plus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
