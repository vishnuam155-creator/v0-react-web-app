"use client"

import { useState } from "react"

interface LimitPopupProps {
  show: boolean
  onClose: () => void
}

export default function LimitPopup({ show, onClose }: LimitPopupProps) {
  const [isClosing, setIsClosing] = useState(false)

  if (!show) return null

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 250)
  }

  const handleUpgrade = () => {
    window.location.href = "./subscription.html"
  }

  return (
    <div className="popup-overlay">
      <div className={`popup-content ${isClosing ? "closing" : ""}`} style={{ textAlign: "center" }}>
        <h2>Upload Limit Reached</h2>
        <p>
          Your current plan has reached its maximum uploads.
          <br />
          Please <strong>upgrade your plan</strong> to continue using Resume Checker.
        </p>
        <div className="popup-actions">
          <button className="popup-btn upgrade" style={{ color: "rgb(144, 2, 245)" }} onClick={handleUpgrade}>
            Upgrade Now
          </button>
          <button className="popup-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
