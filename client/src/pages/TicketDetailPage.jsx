import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router";
import { getTicketById,updateTicket,assignTicket } from "../services/ticketService";
import CommentThread from "../components/tickets/CommentThread";
import Badge from "../components/common/Badge";
import ActivityLog from "../components/tickets/ActivityLog";
function TicketDetailPage(){
    const {id} = useParams()
    const navigate= useNavigate()

    const [ticket,setTicket]= useState(null)
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState("")

    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const isEngineer = user.role === "engineer"

 //assignment state
 const assignedId=ticket?.assignedTo?._id
 const isAssignedToMe = String(assignedId) === String(user.id)
 console.log("TicketDetails Page assigned id, user.id ", ticket, user.id)
 const isAssignedToSomeoneElse = assignedId && !isAssignedToMe


    useEffect(()=>{
        loadTicket()
    },[id])

   async function loadTicket()
{
    try {
         const  data = await getTicketById(id)
         setTicket(data)
    } catch (error) {
         setError("Failed to load ticket")
    }finally{
        setLoading(false)
    }
}

async function handleStatusChange(newStatus){
    try {
      console.log("newstatus is showing in handlestatuschange",newStatus)
        const updated= await updateTicket(id,{status:newStatus})
         console.log("newstatusgot updated",updated.status)
        setTicket({...ticket,status:updated.status})
    } catch (error) {
         setError("Failed to update Status")
    }
}
async function handleAssign(){
    try {
         console.log("Resolved loading zero")
         await assignTicket(id)
          console.log("Resolved loading started")
         loadTicket()
         console.log("Resolved loading completed")
    } catch (error) {
        setError("Failed to Assign")
    }
}

if(loading) return <div className="min-h-screen bg-surface p-8 text-text-muted">Loading...</div>
if(error) return <div className="min-h-screen bg-surface p-8 text-red-500">{error}</div>
if(!ticket) return null

return (
    <div className="min-h-screen bg-surface p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-text-secondary hover:text-text-primary mb-4"
        >
          ← Back
        </button>

        <div className="bg-surface-raised border border-border rounded-xl p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-xl font-medium text-text-primary">{ticket.title}</h1>
            <Badge label={ticket.status} color="blue" />
          </div>

          <p className="text-sm text-text-secondary mb-4">{ticket.description}</p>

          <div className="text-xs text-text-muted mb-6">
            #{ticket._id.slice(-5)} · created by {ticket.createdBy?.name || "Unknown"} ·{" "}
            {new Date(ticket.createdAt).toLocaleString()}
            {ticket.assignedTo && <> · assigned to {ticket.assignedTo.name}</>}
          </div>

          {isEngineer && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                {
                  isAssignedToMe ? (
                    <span className="text-sm bg-green-500/15 text-green-500 rounded-lg px-3 py-2">
                      Assigned to you
                    </span>
                  ): isAssignedToSomeoneElse ? (
             <button
                onClick={handleAssign}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 transition-colors"
              >
                Reassign to me
              </button>
                  ) : (
                     <button
                onClick={handleAssign}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 transition-colors"
              >
                Assign to me
              </button>
                   )
                }
               
             
              <button
                onClick={() => handleStatusChange("in-progress")}
                className="text-sm border border-border rounded-lg px-3 py-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                Mark in progress
              </button>
              <button
                onClick={() => handleStatusChange("resolved")}
                className="text-sm border border-border rounded-lg px-3 py-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                Mark resolved
              </button>
            </div>
          )}
        </div>


      </div>
      <ActivityLog ticketId={ticket._id}/>
      <CommentThread ticketId={ticket._id} />
    </div>
  )



}

export default TicketDetailPage