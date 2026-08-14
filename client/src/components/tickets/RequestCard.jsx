import Badge from "../common/Badge"
import { useNavigate } from "react-router"

function RequestCard({request}) {

    const navigate= useNavigate()
    const statusConfig= {
        open: {label:"Open", color:"blue"},
        "in-progress": {label: "In progress", color:"purple"},
        resolved:{label:"Resolved" ,color: "gray"},
    }

    const status = statusConfig[request.status]

  return (
     <div className="flex items-center justify-between gap-3 bg-surface-raised border border-border cursor-pointer rounded-xl px-4 py-3"
       onClick={()=>navigate(`/tickets/${request._id}`)}
       >
        <div className="min-w-0">
            <div className="text-sm font-medium text-text-primary truncate">
                {request.title}
            </div>
            <div className="text-xs text-text-muted">
                #{request.id} . {request.updated}
            </div>
        </div>
        <Badge label={status.label} color={status.color} />
     </div>
  )
}

export default RequestCard
