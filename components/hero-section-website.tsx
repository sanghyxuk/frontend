"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AnalysisProgressModal } from "@/components/analysis-progress-modal"

// ✅ 포트폴리오용 데모 모드
const IS_DEMO_MODE = true

export function HeroSectionWebsite() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisId, setAnalysisId] = useState<number | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!IS_DEMO_MODE) {
      const isLoggedIn = localStorage.getItem("isLoggedIn")
      if (!isLoggedIn) {
        router.push("/login")
        return
      }
    }

    if (!url) return

    try {
      setIsAnalyzing(true)

      if (IS_DEMO_MODE) {
        // 2. [데모 모드] 
        console.log("데모 모드: 가짜 분석 시작")
        
        // ✨ [변경점 1] 즉시 가짜 ID를 부여해서 로딩바(모달)를 띄웁니다!
        const fakeId = Date.now()
        setAnalysisId(fakeId)

        // ✨ [변경점 2] 2.5초 동안 로딩바를 감상하게 하고 이동합니다.
        setTimeout(() => {
           handleAnalysisComplete(12345) // 결과 페이지 ID (12345)
        }, 2500)

      } else {
        // 3. [리얼 모드]
        const response = await fetch("/api/analysis/start", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
          },
          body: JSON.stringify({ url }),
        })

        if (!response.ok) {
          throw new Error("분석 시작에 실패했습니다.")
        }

        const data = await response.json()
        setAnalysisId(data.analysisId)
      }
    } catch (error) {
      console.error("Analysis start error:", error)
      alert("분석 시작에 실패했습니다. 다시 시도해주세요.")
      setIsAnalyzing(false)
    }
  }

  const handleAnalysisComplete = (id: number) => {
    setIsAnalyzing(false)
    setAnalysisId(null)
    setUrl("")
    router.push(`/scan-results/${id}`)
  }

  const handleAnalysisFailed = () => {
    setIsAnalyzing(false)
    setAnalysisId(null)
    alert("분석에 실패했습니다. 유효한 URL인지 확인 후 다시 시도해주세요.")
  }

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-balance text-gray-900">웹사이트 점검</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              웹사이트의 보안 취약점을 자동으로 분석하고 진단합니다.
              <br />
              SQL 인젝션, XSS, CSRF 등 다양한 보안 위협을 검사합니다.
            </p>
          </div>

          <div className="bg-white border-4 border-blue-900 rounded-3xl p-10">
            <form
              onSubmit={handleSubmit}
              className="border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center hover:border-gray-400 transition-colors bg-gray-50"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-3 text-base font-medium"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing 
                    ? "분석 진행 중..." 
                    : (IS_DEMO_MODE ? "체험하기 (로그인 불필요)" : "웹사이트 검사 시작")
                  }
                </Button>
                <p className="text-sm text-gray-500">
                  {IS_DEMO_MODE 
                    ? "포트폴리오 시연 모드입니다. (실제 분석 X)" 
                    : "검사할 웹사이트 URL을 입력하세요 (https:// 포함)"
                  }
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ✨ [변경점 3] !IS_DEMO_MODE 조건을 지웠습니다. 이제 데모 모드에서도 모달이 뜹니다! */}
      {isAnalyzing && analysisId && (
        <AnalysisProgressModal
          analysisId={analysisId}
          onComplete={handleAnalysisComplete}
          onFailed={handleAnalysisFailed}
        />
      )}
    </>
  )
}