"use client"

export function StatsSection() {
  return (
    // min-h-screen 유지 및 상하 여백 py-12로 확보
    <section className="min-h-screen flex items-center justify-center bg-gray-900/50 snap-start py-12 sm:py-16 md:py-0">
      
      {/* 컨테이너 좌우 padding 유지 */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
        
        {/* 제목 및 설명 (FunctionsSection 스타일 일치) */}
        <h2 className="text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-10">
          Why Shield Hub?
        </h2>
        
        <p className="text-gray-400 text-base mb-8 max-w-2xl mx-auto"> 
          웹사이트와 파일은 매일 수십, 수백 번의 공격에 노출됩니다.
          <br className="hidden md:block" />
          중요한 데이터와 비즈니스 자산을 위협으로부터 안전하게 지키세요.
        </p>

        {/* 항목 간 간격(gap)을 적절히 확보하여 3열 배치 유지 */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-16 max-w-5xl mx-auto">
          
          {/* 통계 항목 1: 83% */}
          <div className="text-center">
            {/* ⭐️ 수정: 숫자 크기를 sm:text-5xl로 확대 (주목도 극대화) */}
            <div className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-2">
              83<span className="text-base sm:text-xl md:text-3xl">%</span>
            </div>
            {/* ✅ 수정: 제목 크기를 sm:text-sm으로 확대 */}
            <div className="text-gray-400 text-xs sm:text-sm md:text-base mb-2">
              웹 고위험 취약점 증가율
            </div>
            {/* 세부 설명은 Hidden 상태 유지 */}
            <div className="text-gray-500 text-[8px] sm:text-xs md:text-sm hidden sm:block">
              웹 취약점 고심각성 항목
              <br />
              최근 1년간 83% 증가
            </div>
          </div>

          {/* 통계 항목 2: 94/day */}
          <div className="text-center">
            {/* ⭐️ 수정: 숫자 크기를 sm:text-5xl로 확대 */}
            <div className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-2">
              94<span className="text-base sm:text-xl md:text-3xl text-gray-400">/day</span>
            </div>
            {/* ✅ 수정: 제목 크기를 sm:text-sm으로 확대 */}
            <div className="text-gray-400 text-xs sm:text-sm md:text-base mb-2">
              하루 평균 공격 횟수
            </div>
            {/* 세부 설명은 Hidden 상태 유지 */}
            <div className="text-gray-500 text-[8px] sm:text-xs md:text-sm hidden sm:block">
              머신러닝 기반 파일 분석으로
              <br />
              하루에 평균 94번의 공격
            </div>
          </div>

          {/* 통계 항목 3: 31.2% */}
          <div className="text-center">
            {/* ⭐️ 수정: 숫자 크기를 sm:text-5xl로 확대 */}
            <div className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-2">
              31.2<span className="text-base sm:text-xl md:text-3xl">%</span>
            </div>
            {/* ✅ 수정: 제목 크기를 sm:text-sm으로 확대 */}
            <div className="text-gray-400 text-xs sm:text-sm md:text-base mb-2">
              보안 사고 감소율
            </div>
            {/* 세부 설명은 Hidden 상태 유지 */}
            <div className="text-gray-500 text-[8px] sm:text-xs md:text-sm hidden sm:block">
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