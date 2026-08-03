const BASE_URL = import.meta.env.VITE_BACKEND_URL

export const apiFetch = async (url: string, body?: RequestInit) => {
  const res = await fetch(`${BASE_URL}/api/v1${url}`, body || {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  })
  return res 
}