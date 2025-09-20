"use client"

import { useState, useEffect } from "react"
import { getClientHeaders } from "@/lib/config"

export function useAuth() {
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [userPlan, setUserPlan] = useState<string>("Free")

  useEffect(() => {
    // Initialize from localStorage
    const token = localStorage.getItem("authToken")
    const username = localStorage.getItem("username")

    if (token && username) {
      setAuthToken(token)
      setCurrentUser(username)

      // Fetch user plan
      fetchUserPlan(username, token)
    }
  }, [])

  const fetchUserPlan = async (username: string, token: string) => {
    try {
      const res = await fetch("/api/user-plan", {
        method: "POST",
        headers: getClientHeaders(token),
        body: JSON.stringify({ username }),
      })
      const data = await res.json()
      setUserPlan(data.plan || "Free")
    } catch (err) {
      console.error("Auth check failed", err)
      clearAuth()
    }
  }

  const setAuth = (token: string, username: string, plan: string) => {
    setAuthToken(token)
    setCurrentUser(username)
    setUserPlan(plan)
    localStorage.setItem("authToken", token)
    localStorage.setItem("username", username)
  }

  const clearAuth = () => {
    setAuthToken(null)
    setCurrentUser(null)
    setUserPlan("Free")
    localStorage.removeItem("authToken")
    localStorage.removeItem("username")
  }

  return {
    authToken,
    currentUser,
    userPlan,
    setAuth,
    clearAuth,
  }
}
