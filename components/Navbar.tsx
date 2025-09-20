"use client"

import { useState } from "react"
import Image from "next/image"

interface NavbarProps {
  currentUser: string | null
  userPlan: string
  onLogout: () => void
}

export default function Navbar({ currentUser, userPlan, onLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch("http://127.0.0.1:8000/logout/", {
        method: "POST",
        headers: { Authorization: `Token ${localStorage.getItem("authToken")}` },
      })
    } catch (err) {
      console.error("Logout error", err)
    }
    onLogout()
    window.location.href = "/"
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="/index.html" className="logo">
          <Image src="/image/bolod_logo.jpg" alt="Company Logo" width={40} height={40} />
        </a>

        <button className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>

        <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <a href="./index.html">Home</a>
            </li>
            <li>
              <a href="https://quotientone-getintouch.carrd.co/">Services</a>
            </li>
            <li>
              <a href="https://quotientoneabout.carrd.co/">AboutUs</a>
            </li>

            {!currentUser ? (
              <li>
                <a href="./login_page_FireBase/firebase_login.html">Login-Signup</a>
              </li>
            ) : (
              <button
                onClick={handleLogout}
                style={{
                  padding: "5px 10px",
                  cursor: "pointer",
                  color: "green",
                }}
              >
                Logout
              </button>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
