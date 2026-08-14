import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import {PATHS} from "../routes/paths"

function LoginPage(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

     const {login: authLogin} = useAuth()
    async function handleSubmit(e){
        e.preventDefault();
        setError("")

        try {
          
            const data = await login(email,password)
            authLogin(data.user,data.token)

            if(data.user.role =="engineer"){
                navigate(PATHS.ENGINEER_CONSOLE)
            }
              else{
                navigate(PATHS.USER_HOME)
              }
          //  localStorage.setItem("token",data.token)
           // localStorage.setItem("user", JSON.stringify(data.user))
         
             console.log("1. localstorage complete login")
            //send engineers to the console, users to their home
          console.log(data.user)
          console.log("Rahul")
            if(data.user.role === "engineer"){
                navigate(PATHS.ENGINEER_CONSOLE)
            }else{
                navigate(PATHS.USER_HOME)
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login Failed")
        }
    }


return(
    <div className="min-h-screen bg-surface flex items-center justify-center">
     <form
             onSubmit={handleSubmit}
             className="w-full max-w-sm bg-surface-raise border border-border rounded-xl p-6 flex flex-col gap-4"
     
     >
            <h1 className="text-lg font-medium text-text-primary">Sign In</h1>

               {
                error && (
                    <div className="text-sm text-red-500 bg-red-500/10 rounded-lg px-3 py-2">
                        {error}
                    </div>
                )
               }

               <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary"
               />

               <input 
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e)=> setPassword(e.target.value)}
               className="bg-surface border border-border roundd-lg px-3 py-2 text-sm text-text-primary"
               />
               <button 
               type="submit"    
               className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors"  
               >
                Sign In
                </button>


     </form>

    </div>
)



}

export default LoginPage