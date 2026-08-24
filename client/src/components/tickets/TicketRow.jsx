import Badge from "../common/Badge";
import { useNavigate } from "react-router";
import { getSlaStatus } from "../../utils/sla";
function TicketRow({ticket}){

    //sla thing start
    const sla= getSlaStatus(ticket.slaDeadline, ticket.status)
    const slaColors = {
          danger:"text-red-500",
          warning:"text-amber-500",
          normal:"text-text-secondary"
    }
    //sla thing ends
    const priorityConfig = {
        high: {color:"red",bar: "bg-red-500",sla:"text-red-500",label:"High"},
        medium: {color:"amber",bar: "bg-amber-500",sla:"text-amber-500",label:"Medium"},
        low: {color:"green",bar: "bg-green-500",sla:"text-green-500",label:"Low"}
    }

     const statusConfig= {
        open: {label:"Open", color:"blue"},
        "in-progress": {label: "In progress", color:"purple"},
        resolved:{label:"Resolved" ,color: "gray"},
    }

    const status = statusConfig[ticket.status] || statusConfig.open

    const priority= priorityConfig[ticket.priority]  || priorityConfig.medium
 const navigate= useNavigate()
    return(
        <div className="flex items-center gap-3 cursor-pointer bg-surface-raised border border-border rounded-xl px-4 py-3" onClick={()=>navigate(`/tickets/${ticket._id}`)}>
            <div className={`w-1 self-stretch rounded-full ${priority.bar}`}></div>
           <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-text-primary truncate">
                {ticket.title}
            </div>
            <div className="text-xs text-text-muted">
                #{ticket._id.slice(-5)} . {ticket.createdBy?.name ||"Unknown"} . {new Date(ticket.createdAt).toLocaleDateString()}
            </div>
           </div>

           <div className="flex flex-col items-end gap-1 shrink-0">
            <Badge label={priority.label } color = {priority.color} />
             <Badge label={status.label } color = {status.color} />
             {sla && (<span className={`text-xs ${slaColors[sla.level]}`}>
                     {sla.text}
             </span>)}
            <span className={`text-xs ${priority.sla}`}> {ticket.slaLeft} left</span>
           </div>
        </div>
    )
}

export default TicketRow