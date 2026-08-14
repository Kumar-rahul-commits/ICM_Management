import { createContext,useContext,useState } from "react";

//1. create the context
const AuthContext = createContext(null)

//2. the provider - wraps the app and holds the auth state

export function AuthProvider({children}){
    const [user,setUser] = useState(()=>{
        const stored = localStorage.getItem("user")
        return stored ? JSON.parse(stored) :null
    })

    function login(userData, token){
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
    }

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
    }

  return(
    <AuthContext.Provider value={{user,login,logout}} >
        {children}
    </AuthContext.Provider>
  )

}

export function useAuth(){
    return useContext(AuthContext)
}