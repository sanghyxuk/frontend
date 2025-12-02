"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fileService } from "@/lib/services/file.service"

// ✅ true = 포트폴리오용 (가짜 로딩)
// ✅ false = 실제 연동용 (로그인 필수, 실제 서버 통신)
const IS_DEMO_MODE = false

export function HeroSectionDecryption() {
  const [authMessage, setAuthMessage] = useState("")
  const [infoMessage, setInfoMessage] = useState("")
  const [decrypting, setDecrypting] = useState(false)
  
  // 👇 로딩바를 위한 상태 추가
  const [progress, setProgress] = useState(0)

  const [encryptedFile, setEncryptedFile] = useState<File | null>(null)
  const [keyFile, setKeyFile] = useState<File | null>(null)
  const [originalFileName, setOriginalFileName] = useState("")
  
  const encryptedFileRef = useRef<HTMLInputElement>(null)
  const keyFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onUnauthorized = () => setAuthMessage("세션이 만료되었습니다. 다시 로그인해주세요.")
    if (typeof window !== "undefined") {
      window.addEventListener("unauthorized", onUnauthorized)
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("unauthorized", onUnauthorized)
      }
    }
  }, [])

  const saveUploadedFiles = (fileName: string) => {
    // 데모 모드일 때 로컬 스토리지에 이력 저장 (선택 사항)
    if (IS_DEMO_MODE) {
       const existingFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]")
       const newFile = {
         id: Date.now(),
         title: fileName,
         status: "복호화 완료",
         date: new Date().toLocaleDateString(),
         type: "decryption",
       }
       localStorage.setItem("uploadedFiles", JSON.stringify([newFile, ...existingFiles]))
       window.dispatchEvent(new Event("filesUploaded"))
       return
    }
    window.dispatchEvent(new Event("filesUploaded"))
  }

  const handleDecrypt = async () => {
    setAuthMessage("")
    setInfoMessage("")
    setProgress(0) // 초기화

    // 1. 리얼 모드일 때만 로그인 체크
    if (!IS_DEMO_MODE) {
        const token = localStorage.getItem("token")
        if (!token) {
            setAuthMessage("로그인 후 파일 복호화를 사용할 수 있습니다.")
            return
        }
    }

    // 2. 파일 입력 체크 (데모 모드에서도 파일은 선택하는 척 해야 자연스러움)
    if (!encryptedFile || !keyFile || !originalFileName.trim()) {
      // 데모 모드면 그냥 넘어갈 수도 있지만, UX상 경고해주는 게 좋습니다.
      // 귀찮으면 아래 if문을 (!IS_DEMO_MODE && (...)) 로 감싸셔도 됩니다.
      setInfoMessage("암호화된 파일, 키 파일, 원본 파일명을 모두 입력해주세요.")
      return
    }

    try {
      setDecrypting(true)
      setInfoMessage("복호화 중입니다...")

      if (IS_DEMO_MODE) {
        // ============================
        // 🟢 [데모 모드] 가짜 로딩
        // ============================
        await new Promise((resolve) => {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval)
                        resolve(true)
                        return 100
                    }
                    return prev + 5 // 속도 조절
                })
            }, 100)
        })
        setInfoMessage("복호화가 완료되어 원본 파일을 다운로드했습니다. (데모)")
      } else {
        // ============================
        // 🔵 [리얼 모드] 실제 통신
        // ============================
        
        // UX를 위해 가짜 로딩바 실행 (실제 작업이 너무 빨리 끝나면 심심하니까)
        const fakeInterval = setInterval(() => {
            setProgress(prev => prev < 90 ? prev + 10 : prev)
        }, 300)

        const blob = await fileService.decryptFile(encryptedFile, keyFile, originalFileName.trim())
        
        clearInterval(fakeInterval)
        setProgress(100)

        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = originalFileName.trim()
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
        setInfoMessage("복호화가 완료되어 원본 파일을 다운로드했습니다.")
      }

      saveUploadedFiles(originalFileName.trim())
      
      // 성공 후 초기화 (2초 뒤)
      setTimeout(() => {
          setDecrypting(false)
          setProgress(0)
          setEncryptedFile(null)
          setKeyFile(null)
          setOriginalFileName("")
          if (encryptedFileRef.current) encryptedFileRef.current.value = ""
          if (keyFileRef.current) keyFileRef.current.value = ""
          setInfoMessage("")
      }, 2000)

    } catch (err: any) {
      setDecrypting(false)
      if (err?.response?.status === 401) {
        setAuthMessage("세션이 만료되었습니다. 다시 로그인해주세요.")
      } else {
        setInfoMessage("복호화에 실패했습니다. 입력값을 확인하고 다시 시도해주세요.")
      }
    }
  }

  // 파일 선택 핸들러들
  const handleEncryptedFileClick = () => {
    if (!IS_DEMO_MODE && !localStorage.getItem("token")) {
        setAuthMessage("로그인 후 파일 복호화를 사용할 수 있습니다.")
        return
    }
    setAuthMessage("")
    setInfoMessage("")
    encryptedFileRef.current?.click()
  }

  const handleKeyFileClick = () => {
    if (!IS_DEMO_MODE && !localStorage.getItem("token")) {
        setAuthMessage("로그인 후 파일 복호화를 사용할 수 있습니다.")
        return
    }
    setAuthMessage("")
    setInfoMessage("")
    keyFileRef.current?.click()
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance text-gray-900">파일 복호화</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            암호화된 파일을 안전하게 복호화하고, 원본 파일로 복원
            <br />
            하세요. 복호화 시 자동으로 무결성을 검증합니다.
          </p>
        </div>

        <div className="bg-white border-4 border-blue-900 rounded-3xl p-10 transition-all">
          {/* 👇 UI 핵심 변경: 로딩 중일 때는 프로그레스 바를 보여줌 */}
          {decrypting ? (
            <div className="p-16 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                   {/* 자물쇠가 열리는 아이콘으로 변경 */}
                  <svg className="w-10 h-10 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="w-full max-w-md">
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">복호화 진행 중...</span>
                    <span className="text-sm font-bold text-blue-900">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-blue-900 h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-sm text-gray-600 mt-3 truncate">{originalFileName || "파일 처리 중..."}</p>
                </div>
              </div>
            </div>
          ) : (
            /* 기존 입력 폼 UI */
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 bg-gray-50">
              <div className="flex flex-col items-center gap-6 max-w-xl mx-auto">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>

                {/* File inputs section */}
                <div className="w-full space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      암호화된 파일
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        readOnly
                        value={encryptedFile?.name || ""}
                        placeholder="암호화된 파일을 선택하세요"
                        className="flex-1 bg-white"
                      />
                      <Button
                        type="button"
                        onClick={handleEncryptedFileClick}
                        className="bg-blue-900 text-white hover:bg-blue-800"
                      >
                        선택
                      </Button>
                    </div>
                    <input
                      ref={encryptedFileRef}
                      type="file"
                      className="hidden"
                      onChange={(e) => e.target.files && setEncryptedFile(e.target.files[0])}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      키 파일 (key.txt)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        readOnly
                        value={keyFile?.name || ""}
                        placeholder="키 파일을 선택하세요"
                        className="flex-1 bg-white"
                      />
                      <Button
                        type="button"
                        onClick={handleKeyFileClick}
                        className="bg-blue-900 text-white hover:bg-blue-800"
                      >
                        선택
                      </Button>
                    </div>
                    <input
                      ref={keyFileRef}
                      type="file"
                      className="hidden"
                      onChange={(e) => e.target.files && setKeyFile(e.target.files[0])}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      원본 파일명
                    </label>
                    <Input
                      type="text"
                      value={originalFileName}
                      onChange={(e) => setOriginalFileName(e.target.value)}
                      placeholder="예: document.pdf"
                      className="bg-white"
                    />
                  </div>
                </div>

                <Button
                  size="lg"
                  className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-3 text-base font-medium w-full"
                  onClick={handleDecrypt}
                  disabled={!encryptedFile || !keyFile || !originalFileName.trim()}
                >
                  {IS_DEMO_MODE ? "체험하기 (로그인 불필요)" : "복호화 및 다운로드"}
                </Button>

                {authMessage && (
                  <div className="text-red-600 text-sm w-full text-center">{authMessage}</div>
                )}
                {infoMessage && !authMessage && (
                  <div className="text-gray-600 text-sm w-full text-center">{infoMessage}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}