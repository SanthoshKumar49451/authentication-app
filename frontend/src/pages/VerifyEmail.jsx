import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { toast } from "sonner"
import { useNavigate} from "react-router-dom"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"

const VerifyEmail = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()
  const [code,setCode]=useState('')


  useEffect(()=>{
    toast.success("Verification code sent")
  },[])

  const [loading, setLoading] = useState(false)

  const handleVerify = async () => {
    try {
      setLoading(true)
      const res = await axios.post(`${backendUrl}/verify-email`, { code})
      if (res.data.success) {
        toast.success("✅ Email verified successfully")
        navigate("/login")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Verification failed")
    } finally {
      setLoading(false)
    }
  }
  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } },
  }
  return (
    <motion.div className="h-screen flex justify-center items-center">
      <div className="p-6 bg-white shadow rounded-lg flex flex-col gap-4 ">
         <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-2"
        >
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <motion.div variants={inputVariants} whileFocus="focus" className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              id="email"
              name="code"
              type="email"
              placeholder="Enter your email"
              value={code}
              onChange={(e)=>setCode(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              required
            />
          </motion.div>
        </motion.div>
        <button
          onClick={handleVerify}
          disabled={loading}
          className="px-4 py-2 bg-black text-white flex justify-center max-w-sm items-center  rounded-md"
        >

          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </div>
    </motion.div>
  )
}

export default VerifyEmail
