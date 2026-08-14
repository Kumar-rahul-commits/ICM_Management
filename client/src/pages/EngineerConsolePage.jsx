import { useState,useEffect } from "react"
import Sidebar from "../components/layout/Sidebar"
import TopBar from "../components/layout/TopBar"
import PageHeader from "../components/layout/PageHeader"
import StatCardGrid from "../components/tickets/StatCardGrid"
import WorkQueue from "../components/tickets/WorkQueue"
import { stats,tickets } from "../utils/DummyTicket"
import { getTickets } from "../services/ticketService"
function EngineerConsolePage() {


  const [tickets,setTickets]= useState([])
       const [loading,setLoading]= useState(true)
       const [error,setError] = useState("")

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

  return (
     <div className="min-h-screeen bg-surface flex">
      <Sidebar />
      <main className="flex-1 p-8">

      <TopBar />
      <div className="max-w-3xl">
        <PageHeader
        title="Your queue, Ravi"
        subtitle="6 tickets assigned . 2 need attention soon"
        />
        <StatCardGrid stats={stats} />
          {loading && <div className="text-sm text-text-muted">Loading... </div>}
              {error && <div className="text-sm text-red-500">{error}</div>}
              {!loading && !error && <WorkQueue tickets={tickets} />}
     </div>
     </main>
    </div> 
  )
}

export default EngineerConsolePage
