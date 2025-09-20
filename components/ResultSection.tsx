"use client"

interface ResultSectionProps {
  response: string
  showResponse: boolean
  isLoading: boolean
}

export default function ResultSection({ response, showResponse, isLoading }: ResultSectionProps) {
  if (!showResponse) return null

  return (
    <div className="result-section">
      <div className="result-box">
        <h2>AI Evaluation</h2>
        <div
          className="result-content"
          dangerouslySetInnerHTML={{
            __html: isLoading ? "<p><em>Processing... please wait.</em></p>" : response,
          }}
        />
      </div>
    </div>
  )
}
