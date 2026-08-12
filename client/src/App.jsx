import {createBrowserRouter, RouterProvider} from "react-router"
import UserHomePage from "./pages/UserHomePage"
import EngineerConsolePage from "./pages/EngineerConsolePage"

const router= createBrowserRouter([
  {path:"/",
    element:<EngineerConsolePage />
  },
  {path:"/me", element:<UserHomePage />}
])
function App(){
  return <RouterProvider router={router} />
}

export default App