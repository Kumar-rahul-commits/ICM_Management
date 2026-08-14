import { useState, useEffect } from "react"
import Sidebar from "../components/layout/Sidebar.jsx"
import TopBar from "../components/layout/TopBar.jsx"
import PageHeader from "../components/layout/PageHeader.jsx"
import WorkQueue from "../components/tickets/WorkQueue.jsx"
import { getTickets } from "../services/ticketService.js"

function AllTicketsPage() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // filter/search/page state
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [priority, setPriority] = useState("all")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    loadTickets()
  }, [status, priority, page])

  // debounce search — refetch 400ms after the user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1)      // reset to page 1 on a new search
      loadTickets()
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  async function loadTickets() {
    setLoading(true)
    try {
      const data = await getTickets({ search, status, priority, page, limit: 10 })
      setTickets(data.tickets)
      setTotalPages(data.totalPages)
      setTotal(data.total)
    } catch (err) {
      setError("Failed to load tickets")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <TopBar />
        <div className="max-w-3xl">
          <PageHeader title="All tickets" subtitle={`${total} tickets`} />

          {/* search + filters */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Search by title…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] bg-surface-raised border border-border rounded-lg px-3 py-2 text-sm text-text-primary"
            />
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1) }}
              className="bg-surface-raised border border-border rounded-lg px-3 py-2 text-sm text-text-primary"
            >
              <option value="all">All statuses</option>
              <option value="open">Open</option>
              <option value="in-progress">In progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <select
              value={priority}
              onChange={(e) => { setPriority(e.target.value); setPage(1) }}
              className="bg-surface-raised border border-border rounded-lg px-3 py-2 text-sm text-text-primary"
            >
              <option value="all">All priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* results */}
          {loading && <div className="text-sm text-text-muted">Loading…</div>}
          {error && <div className="text-sm text-red-500">{error}</div>}
          {!loading && !error && tickets.length === 0 && (
            <div className="text-sm text-text-muted">No tickets match your filters.</div>
          )}
          {!loading && !error && tickets.length > 0 && <WorkQueue tickets={tickets} />}

          {/* pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 text-sm text-text-secondary">
              <span>Page {page} of {totalPages}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-1 rounded-lg border border-border disabled:opacity-40 hover:text-text-primary transition-colors"
                >
                  Prev
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-1 rounded-lg border border-border disabled:opacity-40 hover:text-text-primary transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default AllTicketsPage
