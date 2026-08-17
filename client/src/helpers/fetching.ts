const BASE_URL = import.meta.env.VITE_BACKEND_URL

export const apiFetch = async (url: string, type: string, body?: Record<string, string | number | Date>) => {
  const res = await fetch(`${BASE_URL}/api/v1${url}`, {
    method: type,
    credentials: "include",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(body)
  })
  return res 
}