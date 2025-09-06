
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Dashboard = () => {
  const navigate=useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [user,setUser]=useState(null)

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/logout`, { withCredentials: true })
      localStorage.clear('token')
      toast.success(" Logged out successfully")
      navigate('/login')
    } catch (error) {
      toast.error(" Logout failed")
    }
  }



  useEffect(()=>{
    const getData=async()=>{
      try {
      const response =await axios.get(`${backendUrl}/check-auth`,{
        withCredentials:true
      })
      if (response.data.success) {
        setUser(response.data.user)
        
        
      }
    } catch (error) {
      console.log(error)
      
    }
    }
    getData()
  },[])

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {user&&(
        <div>
          <p>{user.name}</p>
          </div>
      )}
     
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </div>
  )
}

export default Dashboard
