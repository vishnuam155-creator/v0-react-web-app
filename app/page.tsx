"use client"

import { useState, useEffect, useRef } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import UploadSection from "@/components/UploadSection"
import InteractionSection from "@/components/InteractionSection"
import ResultSection from "@/components/ResultSection"
import LoginWarningPopup from "@/components/LoginWarningPopup"
import LimitPopup from "@/components/LimitPopup"
import { useAuth } from "@/hooks/useAuth"

export default function HomePage() {
  const [mode, setMode] = useState("with_jd")
  const [jdText, setJdText] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [response, setResponse] = useState("")
  const [showResponse, setShowResponse] = useState(false)
  const [showLoginWarning, setShowLoginWarning] = useState(false)
  const [showLimitPopup, setShowLimitPopup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { authToken, currentUser, userPlan, setAuth, clearAuth } = useAuth()
  const typingRef = useRef<HTMLParagraphElement>(null)

  // Typing effect
  useEffect(() => {
    const text =
      "Stop getting lost in the resume black hole. Our AI-powered ATS Resume Checker and Builder helps you craft a professional resume that gets noticed by recruiters"
    let index = 0

    const typeChar = () => {
      if (typingRef.current && index < text.length) {
        typingRef.current.innerHTML += text.charAt(index)
        index++
        setTimeout(typeChar, 50)
      }
    }

    typeChar()
  }, [])

  const handleSubmit = async (action: string) => {
    if (!selectedFile) {
      alert("⚠️ Please upload a document before submitting.")
      return
    }
    if (mode === "with_jd" && !jdText.trim()) {
      alert("⚠️ Please paste the Job Description before submitting.")
      return
    }
    if (mode === "without_jd" && !companyName.trim()) {
      alert("⚠️ Please enter the Post/Job details before submitting.")
      return
    }

    // Check usage first
    try {
      const usageRes = await fetch("http://127.0.0.1:8000/resume_checker/", {
        method: "GET",
        headers: authToken ? { Authorization: `Token ${authToken}` } : {},
        credentials: "include",
      })
      const usageData = await usageRes.json()

      if (usageData.error) {
        alert(usageData.error)
        return
      }

      if (!authToken) {
        if (usageData.uploads_used >= usageData.limit) {
          setShowLoginWarning(true)
          return
        }
      } else {
        if (usageData.uploads_used >= usageData.limit) {
          setShowLimitPopup(true)
          return
        }
      }

      // Submit form
      const formData = new FormData()
      formData.append("resume", selectedFile)
      formData.append("mode", mode)
      formData.append("action", action)

      if (mode === "with_jd") {
        formData.append("job_desc", jdText)
      } else {
        formData.append("company_name", companyName)
      }

      setIsLoading(true)
      setResponse("")
      setShowResponse(true)

      const res = await fetch("http://127.0.0.1:8000/resume_checker/", {
        method: "POST",
        headers: authToken ? { Authorization: `Token ${authToken}` } : {},
        body: formData,
        credentials: "include",
      })

      const data = await res.json()

      if (res.ok) {
        let formatted = data.response
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/^\* (.*$)/gim, "<li>$1</li>")
        if (formatted.includes("<li>")) formatted = "<ul>" + formatted + "</ul>"
        formatted = formatted.replace(/\n/g, "<br>")
        setResponse(formatted)
      } else {
        setResponse(`<p style="color:red;">${data.error || "Something went wrong"}</p>`)
      }
    } catch (error) {
      setResponse(`<p style="color:red;">Network error occurred</p>`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Navbar currentUser={currentUser} userPlan={userPlan} onLogout={clearAuth} />

      <main>
        <h1 className="h1-1">Document Upload and Job Description</h1>

        <div id="welcomeUser">{currentUser && `Welcome, ${currentUser} (${userPlan})`}</div>

        <p ref={typingRef} className="subtitle-text"></p>

        <div className="container main-content">
          <UploadSection selectedFile={selectedFile} onFileSelect={setSelectedFile} />

          <InteractionSection
            mode={mode}
            jdText={jdText}
            companyName={companyName}
            onModeChange={setMode}
            onJdTextChange={setJdText}
            onCompanyNameChange={setCompanyName}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        <div className="bottom-text">If Resume Score below 70% Create New Resume</div>

        <ResultSection response={response} showResponse={showResponse} isLoading={isLoading} />
      </main>

      <Footer />

      <LoginWarningPopup show={showLoginWarning} onClose={() => setShowLoginWarning(false)} />

      <LimitPopup show={showLimitPopup} onClose={() => setShowLimitPopup(false)} />
    </div>
  )
}
