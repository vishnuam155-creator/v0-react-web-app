"use client"

interface LoginWarningPopupProps {
  show: boolean
  onClose: () => void
}

export default function LoginWarningPopup({ show, onClose }: LoginWarningPopupProps) {
  if (!show) return null

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>🔒Login Required...</h2>
        <p style={{ fontFamily: "cursive", fontWeight: 700 }}>
          You have reached the free upload limit.
          <br />
          Please <a href="./login_page_FireBase/firebase_login.html">login</a> to continue.
        </p>
      </div>
    </div>
  )
}
