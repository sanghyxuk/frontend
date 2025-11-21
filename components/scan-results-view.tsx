"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, Info, XCircle, CheckCircle, Download, ArrowLeft, ChevronRight, X } from "lucide-react"
import { useRouter } from "next/navigation"
import type { ScanResult, ScanVulnerability } from "@/lib/types/scan-result"

interface ScanResultsViewProps {
  analysisId?: string
}

export function ScanResultsView({ analysisId }: ScanResultsViewProps) {
  const router = useRouter()
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVuln, setSelectedVuln] = useState<ScanVulnerability | null>(null)

  useEffect(() => {
    const fetchResults = async () => {
      if (!analysisId) {
        // Fallback for demo/testing without ID
        loadDemoData()
        return
      }

      try {
        const response = await fetch(`/api/analysis/status/${analysisId}`)
        if (!response.ok) throw new Error("Failed to fetch results")

        const data = await response.json()

        if (data.status === "COMPLETED" && data.result) {
          setScanResult(data.result)
          setLoading(false)
        } else if (data.status === "IN_PROGRESS") {
          // If still in progress, poll again in 1 second
          setTimeout(fetchResults, 1000)
        } else {
          // Handle error or unknown status
          console.error("Analysis failed or unknown status:", data)
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching results:", error)
        setLoading(false)
      }
    }

    const loadDemoData = () => {
      const demoData: ScanResult = {
        success: true,
        url: "https://www.naver.com/",
        vulnerabilities: [
          {
            confidence: 0.99,
            details: "Form input 'query' (type: search)에서 SQLi 취약점 가능성",
            location: "https://www.naver.com/ - Form #1 action: https://search.naver.com/search.naver (GET)",
            pattern: "' OR 1=1--",
            severity: "CRITICAL",
            type: "SQL Injection",
          },
          {
            confidence: 0.98,
            details: "Form input 'query' (type: search)에서 SSTI 취약점 가능성",
            location: "https://www.naver.com/ - Form #1 action: https://search.naver.com/search.naver (GET)",
            pattern: "{{7*7}}",
            severity: "CRITICAL",
            type: "SSTI",
          },
          {
            confidence: 0.89,
            details: "Form input 'query' (type: search)에서 COMMAND_INJECTION 취약점 가능성",
            location: "https://www.naver.com/ - Form #1 action: https://search.naver.com/search.naver (GET)",
            pattern: "; whoami",
            severity: "CRITICAL",
            type: "Command Injection",
          },
          {
            confidence: 0.98,
            details: "Form input 'query' (type: search)에서 PATH_TRAVERSAL 취약점 가능성",
            location: "https://www.naver.com/ - Form #1 action: https://search.naver.com/search.naver (GET)",
            pattern: "../../../etc/passwd",
            severity: "HIGH",
            type: "Path Traversal",
          },
          {
            confidence: 0.96,
            details: "Form input 'query' (type: search)에서 XSS 취약점 가능성",
            location: "https://www.naver.com/ - Form #1 action: https://search.naver.com/search.naver (GET)",
            pattern: "<script>alert('xss')</script>",
            severity: "HIGH",
            type: "XSS",
          },
          {
            confidence: 0.95,
            details: "XSS 방어를 위한 CSP 헤더 누락",
            location: "https://www.naver.com/",
            pattern: "Content-Security-Policy 헤더 없음",
            severity: "MEDIUM",
            type: "CSP Missing",
          },
          {
            confidence: 0.95,
            details: "MIME 타입 스니핑 방어 헤더 누락",
            location: "https://www.naver.com/",
            pattern: "X-Content-Type-Options 헤더 없음",
            severity: "LOW",
            type: "MIME Sniffing",
          },
        ],
        vulnerability_count: 7,
      }

      setTimeout(() => {
        setScanResult(demoData)
        setLoading(false)
      }, 500)
    }

    fetchResults()
  }, [analysisId])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "#D32F2F"
      case "HIGH":
        return "#FF7043"
      case "MEDIUM":
        return "#FFCA28"
      case "LOW":
        return "#66BB6A"
      default:
        return "#9E9E9E"
    }
  }

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-[#D32F2F]/20 text-[#D32F2F] border-[#D32F2F]/30"
      case "HIGH":
        return "bg-[#FF7043]/20 text-[#FF7043] border-[#FF7043]/30"
      case "MEDIUM":
        return "bg-[#FFCA28]/20 text-[#FFCA28] border-[#FFCA28]/30"
      case "LOW":
        return "bg-[#66BB6A]/20 text-[#66BB6A] border-[#66BB6A]/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return <XCircle className="w-5 h-5" style={{ color: getSeverityColor(severity) }} />
      case "HIGH":
        return <AlertTriangle className="w-5 h-5" style={{ color: getSeverityColor(severity) }} />
      case "MEDIUM":
        return <Info className="w-5 h-5" style={{ color: getSeverityColor(severity) }} />
      case "LOW":
        return <Shield className="w-5 h-5" style={{ color: getSeverityColor(severity) }} />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  const getCounts = () => {
    if (!scanResult) return { critical: 0, high: 0, medium: 0, low: 0 }
    return {
      critical: scanResult.vulnerabilities.filter((v) => v.severity === "CRITICAL").length,
      high: scanResult.vulnerabilities.filter((v) => v.severity === "HIGH").length,
      medium: scanResult.vulnerabilities.filter((v) => v.severity === "MEDIUM").length,
      low: scanResult.vulnerabilities.filter((v) => v.severity === "LOW").length,
    }
  }

  const downloadReport = () => {
    if (!scanResult) return
    const dataStr = JSON.stringify(scanResult, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `scan-report-${new Date().getTime()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const getSolution = (type: string) => {
    const solutions: Record<string, string[]> = {
      "SQL Injection": [
        "Prepared Statement 사용",
        "파라미터 바인딩 적용",
        "입력값 검증 및 이스케이프 처리",
        "ORM 프레임워크 사용 권장",
      ],
      SSTI: [
        "템플릿 엔진 보안 모드 활성화",
        "사용자 입력을 템플릿에 직접 전달하지 않기",
        "입력값 검증 및 필터링",
        "안전한 템플릿 렌더링 라이브러리 사용",
      ],
      "Command Injection": [
        "쉘 명령어 직접 실행 피하기",
        "안전한 API 사용",
        "입력값 화이트리스트 검증",
        "파라미터 이스케이프 처리",
      ],
      "Path Traversal": [
        "절대 경로 사용",
        "파일명 검증 및 정규화",
        "허용된 디렉토리 내에서만 접근",
        "chroot 환경 사용",
      ],
      XSS: [
        "출력 인코딩 적용",
        "Content-Security-Policy 헤더 설정",
        "HTML 태그 필터링",
        "안전한 라이브러리 사용 (DOMPurify 등)",
      ],
      "CSP Missing": [
        "Content-Security-Policy 헤더 추가",
        "적절한 CSP 정책 설정",
        "인라인 스크립트 제한",
        "nonce 또는 hash 기반 CSP 사용",
      ],
      "MIME Sniffing": [
        "X-Content-Type-Options: nosniff 헤더 추가",
        "올바른 Content-Type 설정",
        "파일 업로드 검증 강화",
      ],
    }
    return solutions[type] || ["보안 전문가와 상담하여 적절한 대응 방안을 마련하세요."]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">결과를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!scanResult) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-500">스캔 결과를 찾을 수 없습니다.</p>
        </div>
      </div>
    )
  }

  const counts = getCounts()

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl mt-12">
      {/* Header */}
      <div className="mb-8">
        <Button 
        variant="ghost" className="mt-3 mb-4 text-gray-400 hover:text-gray-200 hover:bg-transparent p-0" 
        onClick={() => router.push("/")}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        돌아가기
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">보안 스캔 결과</h1>
            <p className="text-gray-500 flex items-center gap-2">
              <span className="font-mono text-sm">{scanResult.url}</span>
              {scanResult.success ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
            </p>
          </div>

          <Button onClick={downloadReport} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            리포트 다운로드
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white border shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">CRITICAL</p>
              <p className="text-3xl font-bold" style={{ color: getSeverityColor("CRITICAL") }}>
                {counts.critical}
              </p>
            </div>
            <XCircle className="w-10 h-10" style={{ color: getSeverityColor("CRITICAL") }} />
          </div>
        </Card>

        <Card className="bg-white border shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">HIGH</p>
              <p className="text-3xl font-bold" style={{ color: getSeverityColor("HIGH") }}>
                {counts.high}
              </p>
            </div>
            <AlertTriangle className="w-10 h-10" style={{ color: getSeverityColor("HIGH") }} />
          </div>
        </Card>

        <Card className="bg-white border shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">MEDIUM</p>
              <p className="text-3xl font-bold" style={{ color: getSeverityColor("MEDIUM") }}>
                {counts.medium}
              </p>
            </div>
            <Info className="w-10 h-10" style={{ color: getSeverityColor("MEDIUM") }} />
          </div>
        </Card>

        <Card className="bg-white border shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">LOW</p>
              <p className="text-3xl font-bold" style={{ color: getSeverityColor("LOW") }}>
                {counts.low}
              </p>
            </div>
            <Shield className="w-10 h-10" style={{ color: getSeverityColor("LOW") }} />
          </div>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">취약점 리스트</h2>

        <Card className="bg-white border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 text-gray-500 font-semibold">Severity</th>
                  <th className="text-left p-4 text-gray-500 font-semibold">Type</th>
                  <th className="text-left p-4 text-gray-500 font-semibold">Location</th>
                  <th className="text-center p-4 text-gray-500 font-semibold">Confidence</th>
                  <th className="text-center p-4 text-gray-500 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {scanResult.vulnerabilities.map((vuln, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedVuln(vuln)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(vuln.severity)}
                        <Badge className={getSeverityBadgeClass(vuln.severity)}>{vuln.severity}</Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-900 font-medium">{vuln.type}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-500 text-sm font-mono truncate max-w-xs block">
                        {vuln.location.split(" - ")[0]}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-gray-900 font-semibold">{(vuln.confidence * 100).toFixed(0)}%</span>
                    </td>
                    <td className="p-4 text-center">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        상세보기 <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {selectedVuln && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end"
          onClick={() => setSelectedVuln(null)}
        >
          <div
            className="bg-white w-full max-w-2xl h-full overflow-y-auto shadow-2xl animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex items-start justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                {getSeverityIcon(selectedVuln.severity)}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedVuln.type}</h2>
                  <Badge className={getSeverityBadgeClass(selectedVuln.severity) + " mt-1"}>
                    {selectedVuln.severity}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedVuln(null)}
                className="text-gray-500 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Confidence */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Confidence</h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${selectedVuln.confidence * 100}%`,
                        backgroundColor: getSeverityColor(selectedVuln.severity),
                      }}
                    />
                  </div>
                  <span className="text-gray-900 font-bold text-lg">{(selectedVuln.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Location</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700 font-mono text-sm break-all">{selectedVuln.location}</p>
                </div>
              </div>

              {/* Payload Pattern */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Payload (탐지 패턴)</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <code className="text-[#FF7043] font-mono text-sm break-all">{selectedVuln.pattern}</code>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">설명</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">{selectedVuln.details}</p>
                </div>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-3">해결 방법</h3>
                <div className="space-y-3">
                  {getSolution(selectedVuln.type).map((solution, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: getSeverityColor(selectedVuln.severity) + "20" }}
                      >
                        <span style={{ color: getSeverityColor(selectedVuln.severity) }} className="text-sm font-bold">
                          {idx + 1}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
