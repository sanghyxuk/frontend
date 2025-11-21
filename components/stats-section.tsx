"use client"

export function StatsSection() {
  return (
    <section className="h-screen flex items-center justify-center bg-gray-900/50 snap-start">
      <div className="container mx-auto px-8 md:px-16 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Why Shield Hub?</h2>
        <p className="text-gray-400 text-xl mb-20 max-w-2xl mx-auto">
          웹사이트와 파일은 매일 수십, 수백 번의 공격에 노출됩니다.
          <br />
          중요한 데이터와 비즈니스 자산을 위협으로부터 안전하게 지키세요.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-7xl font-bold text-white mb-3">
              83<span className="text-3xl">%</span>
            </div>
            <div className="text-gray-400 text-base mb-3">웹 고위험 취약점 증가율</div>
            <div className="text-gray-500 text-sm">
              웹 취약점 고심각성 항목
              <br />
              최근 1년간 83% 증가
            </div>
          </div>

          <div className="text-center">
            <div className="text-7xl font-bold text-white mb-3">
              94<span className="text-3xl text-gray-400">/day</span>
            </div>
            <div className="text-gray-400 text-base mb-3">하루 평균 웹사이트 공격 횟수</div>
            <div className="text-gray-500 text-sm">
              머신러닝 기반 파일 분석으로
              <br />
              하루에 평균 94번의 공격
            </div>
          </div>

          <div className="text-center">
            <div className="text-7xl font-bold text-white mb-3">
              31.2<span className="text-3xl">%</span>
            </div>
            <div className="text-gray-400 text-base mb-3">보안 사고 감소율</div>
            <div className="text-gray-500 text-sm">
              전체 데이터 유출의 31.2%는
              <br />
              악성코드로 인한 파일 손실로 발생
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
