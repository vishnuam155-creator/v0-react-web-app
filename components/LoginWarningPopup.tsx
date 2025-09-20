"use client"

interface LoginWarningPopupProps {
  show: boolean
  onClose: () => void
}

export default function LoginWarningPopup({ show, onClose }: LoginWarningPopupProps) {
  if (!show) return null

  const handleLogin = () => {
    window.location.href = "./login_page_FireBase/firebase_login.html"
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>🔒 Login Required</h2>
        <p style={{ fontFamily: "cursive", fontWeight: 700 }}>
          You have reached the free upload limit.
          <br />
          Please login to continue with higher limits.
        </p>
        <div className="popup-actions">
          <button className="popup-btn" onClick={handleLogin}>
            Login Now
          </button>
          <button className="popup-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
