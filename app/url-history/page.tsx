"use client"

import { Card } from "@/components/ui/card"
import { useRef, useState, useEffect } from "react"

export default function URLHistoryPage() {
  const [documents, setDocuments] = useState<
    Array<{
      id: number | string
      title: string
      status: string
      date: string
      type?: string
    }>
  >([])

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadDocuments = () => {
      const uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]")
      // Filter for URL inspection type if needed
      setDocuments(uploadedFiles)
    }

    loadDocuments()

    const handleFilesUploaded = () => {
      loadDocuments()
    }

    window.addEventListener("filesUploaded", handleFilesUploaded)
    return () => window.removeEventListener("filesUploaded", handleFilesUploaded)
  }, [])

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">URL 취약점 분석 이력</h1>
          <p className="text-gray-600">웹사이트 보안 검사 기록을 확인하세요</p>
        </div>

        {documents.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">검사한 URL이 없습니다</p>
            <p className="text-gray-400 text-sm mt-2">웹사이트를 검사하면 여기에 표시됩니다</p>
          </div>
        ) : (
          <div className="relative max-w-7xl mx-auto group">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-6 px-2 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {documents.map((doc, index) => (
                <Card
                  key={doc.id}
                  className="flex-shrink-0 w-80 p-8 transition-shadow duration-300 bg-white border border-gray-200 rounded-2xl cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gray-400 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xl mb-2 text-gray-900 truncate">{doc.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {doc.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{doc.date}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-sm text-gray-700 font-medium">보안 상태 정상</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {documents.length > 0 && (
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-md border border-gray-300"
                aria-label="다음 문서 보기"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
