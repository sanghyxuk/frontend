"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { fileService } from "@/lib/services/file.service"

export function HeroSection() {
  const [isDragging, setIsDragging] = useState(false)
  const [authMessage, setAuthMessage] = useState("")
  const [infoMessage, setInfoMessage] = useState("")
  const [encrypting, setEncrypting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const token = localStorage.getItem("token")
      if (!token) {
        setAuthMessage("로그인 후 파일 업로드를 사용할 수 있습니다.")
        return
      }
      await encryptAndDownload(files[0])
    }
  }

  const saveUploadedFiles = (files: File[]) => {
    // 서버가 이력을 저장하므로, 목록 새로고침 이벤트만 트리거합니다.
    window.dispatchEvent(new Event("filesUploaded"))
  }

  const encryptAndDownload = async (file: File) => {
    setAuthMessage("")
    setInfoMessage("")
    const token = localStorage.getItem("token")
    if (!token) {
      setAuthMessage("로그인 후 파일 업로드를 사용할 수 있습니다.")
      return
    }
    try {
      setEncrypting(true)
      setInfoMessage("암호화 중입니다...")
      const zipBlob = await fileService.encryptFile(file)
      const url = window.URL.createObjectURL(zipBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${file.name}_encrypted.zip`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
      setInfoMessage("암호화가 완료되어 ZIP 파일을 다운로드했습니다.")
      saveUploadedFiles([file])
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setAuthMessage("세션이 만료되었습니다. 다시 로그인해주세요.")
      } else {
        setInfoMessage("암호화에 실패했습니다. 잠시 후 다시 시도해주세요.")
      }
    } finally {
      setEncrypting(false)
    }
  }

  const handleUploadClick = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setAuthMessage("로그인 후 파일 업로드를 사용할 수 있습니다.")
      return
    }
    setAuthMessage("")
    setInfoMessage("")
    fileInputRef.current?.click()
  }

  const handleFileInputChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      await encryptAndDownload(files[0])
      // reset input value to allow re-selecting the same file
      e.target.value = ""
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance text-gray-900">파일 암호화</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            파일을 안전하게 암호화하고, 암호화된 상태로 보관
            <br />
            하세요. 다운로드 시 자동으로 무결성을 검증합니다.
          </p>
        </div>

        <div
          className={`bg-white border-4 border-blue-900 rounded-3xl p-10 transition-all ${isDragging ? "scale-[1.02]" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center hover:border-gray-400 transition-colors bg-gray-50">
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <Button
                size="lg"
                className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-3 text-base font-medium"
                onClick={handleUploadClick}
                disabled={encrypting}
              >
                {encrypting ? "암호화 중..." : "검사 파일 업로드"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileInputChange}
              />
              {authMessage && (
                <div className="text-red-600 text-sm">{authMessage}</div>
              )}
              {infoMessage && !authMessage && (
                <div className="text-gray-600 text-sm">{infoMessage}</div>
              )}
              <p className="text-sm text-gray-500">파일을 끌어와 첨부해 드래그하세요</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
