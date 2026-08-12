import Sidebar from "../components/layout/Sidebar"
import TopBar from "../components/layout/TopBar"
import PageHeader from "../components/layout/PageHeader"
import StatCardGrid from "../components/tickets/StatCardGrid"
import WorkQueue from "../components/tickets/WorkQueue"
import { stats,tickets } from "../utils/DummyTicket"
function EngineerConsolePage() {
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

export default EngineerConsolePage
