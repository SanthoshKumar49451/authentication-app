import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"

const ForgotPassword = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(`${backendUrl}/forgot-password`, { email })
      if (res.data.success) {
        toast.success("📧 Password reset email sent!")
        setEmail("")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 ">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-4 rounded focus:ring focus:ring-gray-500 outline-none  "
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
