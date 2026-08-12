import TicketRow from "./TicketRow"

function WorkQueue({tickets}) {
  return (
    <section>
        <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-medium text-text-primary">Work Queue</h2>
            <span className="text-xs text-text-muted">Sorted by SLA deadline</span>
        </div>

       <div className="flex flex-col gap-3">
        {tickets.map((a)=>
        <TicketRow key={a.id} ticket={a} />)}
       </div>
    </section>
  )
}

export default WorkQueue
