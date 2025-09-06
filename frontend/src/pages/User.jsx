import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(`${backendUrl}/check-auth`, { withCredentials: true })
        if (res.data.success) setUser(res.data.user)
      } catch (error) {
        toast.error("⚠️ Session expired. Please login again.")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkUser()
  }, [])

  return { user, loading }
}

export default useAuth
