import Badge from "../common/Badge";

function TicketRow({ticket}){
    const priorityConfig = {
        high: {color:"red",bar: "bg-red-500",sla:"text-red-500",label:"High"},
        medium: {color:"amber",bar: "bg-amber-500",sla:"text-amber-500",label:"Medium"},
        low: {color:"green",bar: "bg-green-500",sla:"text-green-500",label:"Low"}
    }
    const config= priorityConfig[ticket.priority]

    return(
        <div className="flex items-center gap-3 bg-surface-raised border border-border rounded-xl px-4 py-3">
            <div className={`w-1 self-stretch rounded-full ${config.bar}`}></div>
           <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-text-primary truncate">
                {ticket.title}
            </div>
            <div className="text-xs text-text-muted">
                #{ticket.id} . {ticket.company} . {ticket.opened}
            </div>
           </div>

           <div className="flex flex-col items-end gap-1 shrink-0">
            <Badge label={config.label ?? ticket.priority} color = {config.color} />
            <span className={`text-xs ${config.sla}`}> {ticket.slaLeft} left</span>
           </div>
        </div>
    )
}

export default TicketRow