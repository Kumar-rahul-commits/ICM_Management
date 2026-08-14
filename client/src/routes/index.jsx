import {createBrowserRouter} from "react-router"
import UserHomePage from "../pages/UserHomePage"
import EngineerConsolePage from "../pages/EngineerConsolePage"
import PlaceHolderPage from "../pages/PlaceHolderPage" 
import LoginPage from "../pages/LoginPage"
import { PATHS } from "./paths"
import RegisterPage from "../pages/RegisterPage"
import CreateTicketPage from "../pages/CreateTicketPage"
import TicketDetailPage from "../pages/TicketDetailPage"
import ProtecedRoute from "../components/ProtectedRoute"


const router= createBrowserRouter([
   {path:PATHS.LOGIN,              element:<LoginPage />},

  {path:PATHS.REGISTER,              element:<RegisterPage />},

  {path:PATHS.ENGINEER_CONSOLE,   element: ( <ProtecedRoute>   <EngineerConsolePage />         </ProtecedRoute>) },

  {path:PATHS.USER_HOME,          element: ( <ProtecedRoute>    <UserHomePage />        </ProtecedRoute>) },

  {path:PATHS.ALL_TICKETS,        element: ( <ProtecedRoute>     <PlaceHolderPage title="tickets" />       </ProtecedRoute>) },

 

  {path:PATHS.CREATE_TICKET,              element: ( <ProtecedRoute>   <CreateTicketPage />         </ProtecedRoute>) },

  {path:PATHS.TICKET_DETAIL,              element: ( <ProtecedRoute>    <TicketDetailPage />        </ProtecedRoute>) }
])


export default router