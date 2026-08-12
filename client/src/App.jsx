import Badge from "./components/common/Badge"
import StatCard from "./components/common/StatCard"
import ThemeToggle from "./components/common/ThemeToggle"
import PageHeader from "./components/layout/PageHeader"
import TicketRow from "./components/tickets/TicketRow"
import WorkQueue from "./components/tickets/WorkQueue"
import Sidebar from "./components/layout/Sidebar"
import UserHomePage from "./pages/UserHomePage"
import { tickets } from "./utils/DummyTicket"
import { stats } from "./utils/DummyTicket"
import StatCardGrid from "./components/tickets/StatCardGrid"
import TopBar from "./components/layout/TopBar"
function App(){
  return (
   

    <div className="min-h-screen bg-surface p-8">
        <UserHomePage />
    </div>
  )
}

export default App