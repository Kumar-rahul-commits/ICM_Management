import ThemeToggle from "../common/ThemeToggle"
import { useNavigate } from "react-router"
import { useAuth } from "../../context/AuthContext"
import { PATHS } from "../../routes/paths"

function TopBar() {
    const navigate= useNavigate()
    const {user,logout} = useAuth()

    function handleLogout(){
        logout()
        navigate(PATHS.LOGIN)
    }
   
    const initials = user?.name ? user.name.split(" ").map((n) => n[0]).join("").slice(0,2).toUpperCase() :"?"

  return (
   <header className="flex item-center justify-between gap-4 mb-6">
    <div className="flex item-center gap-2 flex-1 max-w-sm bg-surface-raise border border-border rounded-lg px-3 py-2 text-sm text-text-muted">
        <span>searchICon</span>
        <span>Search by title, ID, or requester</span>
    </div>

    <div className="flex items-center gap-3">
        <ThemeToggle />

        <div className="w-8 h-8 rounded-full bg-blue-600/15 text-blue-500 flex items-center justify-center text-sm font-medium">
        {initials}
        </div>
 
        <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors">
            <span>+</span>
            <span>New Tickets</span>
        </button>

        <button className="text-sm text-text-secondary hover:text-text-primary border border-border rounded-lg px-3 py-2 transition-colors"
        onClick={handleLogout}>
                      Logout
        </button>
        
    </div>
   </header>
  )
}

export default TopBar
