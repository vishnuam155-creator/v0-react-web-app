export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000",
  ENDPOINTS: {
    RESUME_CHECKER: "/resume_checker/",
    USER_PLAN: "/api/get-user-plan/",
    AUTH: "/api/auth/",
  },
}

// Client-side headers (no API key)
export const getClientHeaders = (authToken?: string | null) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (authToken) {
    headers["Authorization"] = `Token ${authToken}`
  }

  return headers
}

// Client-side form headers (no API key)
export const getClientFormHeaders = (authToken?: string | null) => {
  const headers: Record<string, string> = {}

  if (authToken) {
    headers["Authorization"] = `Token ${authToken}`
  }

  return headers
}
