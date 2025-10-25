"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fileService } from "@/lib/services/file.service"

export function HeroSectionDecryption() {
  const [authMessage, setAuthMessage] = useState("")
  const [infoMessage, setInfoMessage] = useState("")
  const [decrypting, setDecrypting] = useState(false)
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
    // 서버가 이력을 저장하므로, 목록 새로고침 이벤트만 트리거합니다.
    window.dispatchEvent(new Event("filesUploaded"))
  }

  const handleDecrypt = async () => {
    setAuthMessage("")
    setInfoMessage("")
    
    const token = localStorage.getItem("token")
    if (!token) {
      setAuthMessage("로그인 후 파일 복호화를 사용할 수 있습니다.")
      return
    }

    if (!encryptedFile || !keyFile || !originalFileName.trim()) {
      setInfoMessage("암호화된 파일, 키 파일, 원본 파일명을 모두 입력해주세요.")
      return
    }

    try {
      setDecrypting(true)
      setInfoMessage("복호화 중입니다...")
      const blob = await fileService.decryptFile(encryptedFile, keyFile, originalFileName.trim())
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = originalFileName.trim()
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
      setInfoMessage("복호화가 완료되어 원본 파일을 다운로드했습니다.")
      saveUploadedFiles(originalFileName.trim())
      // Reset form
      setEncryptedFile(null)
      setKeyFile(null)
      setOriginalFileName("")
      if (encryptedFileRef.current) encryptedFileRef.current.value = ""
      if (keyFileRef.current) keyFileRef.current.value = ""
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setAuthMessage("세션이 만료되었습니다. 다시 로그인해주세요.")
      } else {
        setInfoMessage("복호화에 실패했습니다. 입력값을 확인하고 다시 시도해주세요.")
      }
    } finally {
      setDecrypting(false)
    }
  }

  const handleEncryptedFileClick = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setAuthMessage("로그인 후 파일 복호화를 사용할 수 있습니다.")
      return
    }
    setAuthMessage("")
    setInfoMessage("")
    encryptedFileRef.current?.click()
  }

  const handleKeyFileClick = () => {
    const token = localStorage.getItem("token")
    if (!token) {
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

        <div className="bg-white border-4 border-blue-900 rounded-3xl p-10">
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
                    암호화된 파일 (.enc)
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      readOnly
                      value={encryptedFile?.name || ""}
                      placeholder="암호화된 파일을 선택하세요"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleEncryptedFileClick}
                      disabled={decrypting}
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
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleKeyFileClick}
                      disabled={decrypting}
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
                    disabled={decrypting}
                  />
                </div>
              </div>

              <Button
                size="lg"
                className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-3 text-base font-medium w-full"
                onClick={handleDecrypt}
                disabled={decrypting || !encryptedFile || !keyFile || !originalFileName.trim()}
              >
                {decrypting ? "복호화 중..." : "복호화 및 다운로드"}
              </Button>

              {authMessage && (
                <div className="text-red-600 text-sm w-full text-center">{authMessage}</div>
              )}
              {infoMessage && !authMessage && (
                <div className="text-gray-600 text-sm w-full text-center">{infoMessage}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
