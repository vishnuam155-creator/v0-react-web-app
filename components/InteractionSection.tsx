"use client"

interface InteractionSectionProps {
  mode: string
  jdText: string
  companyName: string
  onModeChange: (mode: string) => void
  onJdTextChange: (text: string) => void
  onCompanyNameChange: (name: string) => void
  onSubmit: (action: string) => void
  isLoading: boolean
}

export default function InteractionSection({
  mode,
  jdText,
  companyName,
  onModeChange,
  onJdTextChange,
  onCompanyNameChange,
  onSubmit,
  isLoading,
}: InteractionSectionProps) {
  const handleModeChange = (newMode: string) => {
    onModeChange(newMode)
    if (newMode === "with_jd") {
      onCompanyNameChange("")
    } else {
      onJdTextChange("")
    }
  }

  return (
    <div className="interaction-section">
      <div className="button-group">
        <button
          type="button"
          className={`round-button ${mode === "with_jd" ? "active" : ""}`}
          onClick={() => handleModeChange("with_jd")}
        >
          Job description
        </button>
        <button
          type="button"
          className={`round-button ${mode === "without_jd" ? "active" : ""}`}
          onClick={() => handleModeChange("without_jd")}
        >
          No job description
        </button>
      </div>

      {mode === "with_jd" ? (
        <textarea
          className="text-input"
          value={jdText}
          onChange={(e) => onJdTextChange(e.target.value)}
          placeholder="Paste JD"
        />
      ) : (
        <input
          type="text"
          className="text-input company-name-input"
          value={companyName}
          onChange={(e) => onCompanyNameChange(e.target.value)}
          placeholder="Post Name"
        />
      )}

      <div className="button-container">
        <button type="button" className="submit-button" onClick={() => (window.location.href = "./resume_maker.html")}>
          Create Resume
        </button>
        <button type="button" className="submit-button" onClick={() => onSubmit("percentage")} disabled={isLoading}>
          {isLoading ? "Processing..." : "Submit"}
        </button>
      </div>
    </div>
  )
}
