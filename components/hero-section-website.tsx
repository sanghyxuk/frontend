"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function HeroSectionWebsite() {
  const [url, setUrl] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    } else {
      if (url) {
        saveInspection(url)
        setUrl("")
      }
    }
  }

  const saveInspection = (websiteUrl: string) => {
    const existingFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]")
    const newInspection = {
      id: Date.now() + Math.random(),
      title: websiteUrl,
      status: "검사 완료",
      date: new Date()
        .toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
        .replace(/\. /g, ".")
        .replace(/\.$/, ""),
      type: "website",
    }
    localStorage.setItem("uploadedFiles", JSON.stringify([newInspection, ...existingFiles]))
    window.dispatchEvent(new Event("filesUploaded"))
  }

  return (
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
              >
                웹사이트 검사 시작
              </Button>
              <p className="text-sm text-gray-500">검사할 웹사이트 URL을 입력하세요</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
