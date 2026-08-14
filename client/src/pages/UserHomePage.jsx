import PageHeader from "../components/layout/PageHeader";
import StatCardGrid from "../components/tickets/StatCardGrid";
import NewRequestBanner from "../components/tickets/NewRequestBanner";
import RequestList from "../components/tickets/RequestList";
import { useState,useEffect } from "react";
import {getTickets} from "../services/ticketService"
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { PATHS } from "../routes/paths";

function UserHomePage(){
           
       const [tickets,setTickets]= useState([])
       const [loading,setLoading]= useState(true)
       const [error,setError] = useState("")

       const {user,logout} = useAuth()
       const navigate = useNavigate()

            function handleLogout(){
                logout()
                navigate(PATHS.LOGIN)
            }


       useEffect(()=>{
        async function loadTickets(){
            try {
                console.log("Tickets fetching started")
                const data= await getTickets()
                console.log("Tickets fetching completed",data)
                setTickets(data)
            } catch (err) {
                 setError("Failed to load your requests")
            }
            finally{
                setLoading(false)
            }
        }
        loadTickets()
       },[])

    const stats=[
        {label:"Open",value:2},
        {label:"In Progress", value:1},
        {label:"Resolved" , value:8}
    ]

   /*  const requests=[
        {id:1042,title: "Loging page returns 500 error", status:"open", updated:"opened 2h ago"},
    {id:1041,title: "Export to CSV missing columns", status:"in-progress", updated:"opened 2h ago"},
    {id:1040,title: "Password reset email delayed", status:"resolved", updated:"opened 2h ago"}
    ] */

    return(
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-text-secondary">
                    Signed in as {user?.name}
                </span>
                <button className="text-sm text-text-secondary hover:text-text-primary border border-border rounded-lg px-3 py-2 transition-colors"
                onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <PageHeader
            title={`Hi ${user?.name || "thee"} `}
            subtitle="Here's what's happening with your requests"
            />
            <StatCardGrid stats={stats} />
            <NewRequestBanner />

             {loading && <div className="text-sm text-text-muted">Loading... </div>}
              {error && <div className="text-sm text-red-500">{error}</div>}
              {!loading && !error && <RequestList requests={tickets} />}
           
        </div>
    )
}
export default UserHomePage