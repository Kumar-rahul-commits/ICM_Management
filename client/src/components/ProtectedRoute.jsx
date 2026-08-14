import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { PATHS } from "../routes/paths";

function ProtecedRoute({children}){
    const {user} = useAuth()
    if(!user){
        return <Navigate to={PATHS.LOGIN} replace />
    }
    return children
}

export default  ProtecedRoute