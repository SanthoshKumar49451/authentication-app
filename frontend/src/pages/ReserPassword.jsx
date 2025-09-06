import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useNavigate, useParams } from "react-router-dom"

const ResetPassword = () => {
  const { token } = useParams()
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(`${backendUrl}/reset-password/${token}`, { password })
      if (res.data.success) {
        toast.success("🔑 Password reset successful")
        navigate("/login")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Reset failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
