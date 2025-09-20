"use client"

import type React from "react"

interface UploadSectionProps {
  selectedFile: File | null
  onFileSelect: (file: File | null) => void
}

export default function UploadSection({ selectedFile, onFileSelect }: UploadSectionProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    onFileSelect(file)
  }

  return (
    <div className="upload-section">
      <div className="upload-box">
        <input type="file" id="documentUpload" onChange={handleFileChange} hidden />
        <label htmlFor="documentUpload">{selectedFile ? selectedFile.name : "upload document"}</label>
      </div>
    </div>
  )
}
