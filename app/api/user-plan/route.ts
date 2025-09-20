import { type NextRequest, NextResponse } from "next/server"

const API_KEY = process.env.API_KEY // Server-side only
const API_BASE_URL = process.env.API_BASE_URL || "http://127.0.0.1:8000"

export async function POST(request: NextRequest) {
  const authToken = request.headers.get("authorization")
  const body = await request.json()

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (API_KEY) {
    headers["X-API-Key"] = API_KEY
  }

  if (authToken) {
    headers["Authorization"] = authToken
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/get-user-plan/`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json({ error: "Network error occurred" }, { status: 500 })
  }
}
