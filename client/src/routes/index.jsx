import {createBrowserRouter} from "react-router"
import UserHomePage from "../pages/UserHomePage"
import EngineerConsolePage from "../pages/EngineerConsolePage"
import PlaceHolderPage from "../pages/PlaceHolderPage" 
import LoginPage from "../pages/LoginPage"
import { PATHS } from "./paths"
import RegisterPage from "../pages/RegisterPage"
import CreateTicketPage from "../pages/CreateTicketPage"
import TicketDetailPage from "../pages/TicketDetailPage"
const router= createBrowserRouter([
  {path:PATHS.ENGINEER_CONSOLE,   element:<EngineerConsolePage /> },

  {path:PATHS.USER_HOME,          element:<UserHomePage />},

  {path:PATHS.ALL_TICKETS,        element:<PlaceHolderPage title="tickets" />},

  {path:PATHS.LOGIN,              element:<LoginPage />},

  {path:PATHS.REGISTER,              element:<RegisterPage />},

  {path:PATHS.CREATE_TICKET,              element:<CreateTicketPage />},

  {path:PATHS.TICKET_DETAIL,              element:<TicketDetailPage />}
])


export default router