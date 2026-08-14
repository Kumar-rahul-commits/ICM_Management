import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { PATHS } from "../routes/paths";

function PublicOnlyRoute({children}){
        const {user} = useAuth()

        if(user){
            // already logged in - send to the right home based on role 
            const destination = user.role ==="engineer" ? PATHS.ENGINEER_CONSOLE : PATHS.USER_HOME
            return <Navigate to={destination} replace />
        }
        return children
}

export default PublicOnlyRoute