import {createBrowserRouter} from "react-router"
import UserHomePage from "../../pages/UserHomePage"
import EngineerConsolePage from "../../pages/EngineerConsolePage"
import PlaceHolderPage from "../../pages/PlaceHolderPage" 
import { PATHS } from "./paths"
const router= createBrowserRouter([
  {path:PATHS.ENGINEER_CONSOLE,
    element:<EngineerConsolePage />
  },
  {path:PATHS.USER_HOME, 
    element:<UserHomePage />},

     {path:PATHS.ALL_TICKETS, 
    element:<PlaceHolderPage title="tickets" />}
])

export default router