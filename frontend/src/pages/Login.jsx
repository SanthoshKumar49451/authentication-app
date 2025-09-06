import axios from 'axios';
import React ,{useReducer}from 'react'
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { toast } from 'sonner';

const Login = () => {
  const navigate=useNavigate()
  const initialState={
    email:"",
    password:"",
    isLoading:false,
    showPassword: false,

  }

  const reducer=(state,action)=>{
    switch (action.type) {
      case "input":
        return {
          ...state,
          [action.playload.name]: action.playload.value
        }; 
          case "togglePassword":
        return {
          ...state,
          showPassword: !state.showPassword,
        }
      case "setLoading":
        return {
          ...state,
          isLoading: action.payload,
        }   
      case "reset":
        return initialState;
      default:
        return state;
    }
  }

  const[state,dispatch]=useReducer(reducer,initialState)

  const handleInputChange=(e)=>{
    dispatch({type:'input', playload: { name: e.target.name, value: e.target.value }})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const backendUrl = import.meta.env.VITE_BACKEND_URL

  try {
    dispatch({ type: "setLoading", payload: true });

    const response = await axios.post(`${backendUrl}/login`, {
      email: state.email,
      password: state.password,
    },{
      withCredentials:true
    });
    console.log(response)

    if (response.data.success) {
      toast.success("Login success");
      localStorage.setItem('token',response.data.token)

      dispatch({ type: "reset" });
      navigate("/");
    } else {
      toast.error(response.data.message || "Login failed");
    }
  } catch (error) {
    
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    dispatch({ type: "setLoading", payload: false });
  }
};



  

    const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } },
  }
  return (
   <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.5, delay: 0.3 }}
         className="rounded-lg p-6 max-w-sm h-screen flex justify-center items-center mx-auto"
       >
         <form onSubmit={handleSubmit} className="space-y-6">
       
   
           {/* Email Field */}
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
                 name="email"
                 type="email"
                 placeholder="Enter your email"
                 value={state.email}
                 onChange={handleInputChange}
                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                 required
               />
             </motion.div>
           </motion.div>
   
           {/* Password Field */}
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.6 }}
             className="space-y-2"
           >
             <label htmlFor="password" className="text-sm font-medium text-gray-700">
               Password
             </label>
             <motion.div variants={inputVariants} whileFocus="focus" className="relative">
               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
               <input
                 id="password"
                 name="password"
                 type={state.showPassword ? "text" : "password"}
                 placeholder="Create a password"
                 value={state.password}
                 onChange={handleInputChange}
                 className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                 required
               />
               <button
                 type="button"
                 onClick={() => dispatch({ type: "togglePassword" })}
                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
               >
                 {state.showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
               </button>
             </motion.div>
           </motion.div>
   
           {/* Submit Button */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.7 }}
           >
             <button
               type="submit"
               disabled={state.isLoading}
               className="relative w-full bg-black hover:bg-gray-700 mt-2  text-white font-medium py-2.5 rounded-md transition-all duration-200 disabled:opacity-70"
             >
               <motion.span animate={state.isLoading ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }}>
                 {state.isLoading ? "Login..." : "Login"}
               </motion.span>
               {state.isLoading && (
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="absolute inset-0 flex items-center justify-center"
                 >
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 </motion.div>
               )}
             </button>

             <p onClick={()=>navigate('/forgot-password')} >Forgot password</p>
           </motion.div>
         </form>
       </motion.div>
  )
}

export default Login