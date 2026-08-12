import Badge from "./components/common/Badge"
import StatCard from "./components/common/StatCard"
import ThemeToggle from "./components/common/ThemeToggle"
import PageHeader from "./components/layout/PageHeader"
import TicketRow from "./components/tickets/TicketRow"
import WorkQueue from "./components/tickets/WorkQueue"
import Sidebar from "./components/layout/Sidebar"
import { tickets } from "./utils/DummyTicket"
import { stats } from "./utils/DummyTicket"
import StatCardGrid from "./components/tickets/StatCardGrid"
import TopBar from "./components/layout/TopBar"
function App(){
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
        <WorkQueue tickets={tickets} />
     </div>
     </main>
    </div>
  )
}

export default App