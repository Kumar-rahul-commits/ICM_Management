import { useState } from "react";
import {useNavigate} from "react-router";
import {register} from "../services/authService.js"
import { PATHS } from "../routes/paths.js";

function RegisterPage(){
    const [name,setName]= useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error,setError] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        setError("")

        if(!name || !email || !password){
            setError("All fields are required")
            return
        }

        try{
            const data= await register(name,email,password)
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))

            // new registrations are users -> send to user home 
            navigate(PATHS.USER_HOME)
        }
        catch(err){
            setError(err.response?.data?.message || "Registration failed")
        }
    }
  
    return  (
        <div className="min-h-screen bg-surface flex items-center justify-center">
            <form 
               onSubmit={handleSubmit}
               className="w-full max-w-sm bg-surface-raised border border-border rounded-xl p-6 flex flex-col gap-4"
            >
           <h1 className="text-lg font-medium text-text-primary">
               Create Account
           </h1>
           {
            error && (
                <div className="text-sm text-red-500 bg-red-500/10 rounded-lg px-3 py-2">
                    {error}
                </div>
            )
           }

           <input 
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary"
           />
            

            <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary"
           />

           <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary"
           />

           <button
           type="submit"
           className="bg-blue-600 hoer:bg-blue-700 text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
                Create account
            </button>

            <div 
            className="text-sm text-text-secondary text-cener cursor-pointer hover:text-text-primary"
            onClick={()=> navigate(PATHS.LOGIN)}>
                Already have an account? Sign in
            </div>

</form>
        </div>
    )




}

export default RegisterPage