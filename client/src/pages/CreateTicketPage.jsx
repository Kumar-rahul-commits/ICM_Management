import { useState } from "react"
import { useNavigate } from "react-router"
import { createTicket } from "../services/ticketService"
import { PATHS } from "../routes/paths"




function CreateTicketPage() {

    const [title, setTitle] = useState("");
    const [description,setDiscription] = useState("")
    const [priority,setPriority] = useState("")
    const [error,setError] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault();
        setError("")

        if(!title || !description){
            setError("Title and description are required")
            return
        }
      try {
        console.log("Ticket creation handlesubmit stage 1")
        await createTicket({title,description,priority})
        console.log("Ticket creation handlesubmit stage 2")
        navigate(PATHS.USER_HOME)
      } catch (err) {
          setError(err.response?.data?.message || "Failed to create ticket")
      }


    }


  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <form
        onSubmit = {handleSubmit}
        className="w-full max-w-lg bg-surface-raised vorder border-border rounded-xl p-6 flex flex-col gap-4"
        >

            <h1 className="text-lg font-medium text-text-primary">
                Raise a new request
            </h1>
            {
                error &&(
                    <div className="text-sm text-red-500 bg-red-500/10 rounded-lg px-3 py-2">
                        {error}
                    </div>
                )
            }

          <div className="flex flex-col gap-1">
            <label  className="text-sm text-text-text-secondary">
                Title
            </label>
            <input 
               type="text"
               placeholder="short summary of the issue"
               value={title}
               onChange={(e)=> setTitle(e.target.value)}
               className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary"
            />

            <label  className="text-sm text-text-text-secondary">
                Description
            </label>
            <input 
               type="text"
               placeholder="Describe what's happening in detail"
               value={description}
               onChange={(e)=> setDiscription(e.target.value)}
               className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary"
            />

            <label  className="text-sm text-text-text-secondary">
                Priority
            </label>
            <select 
               value={priority}
               onChange={(e)=> setPriority(e.target.value)}
               className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary"
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                </select>


          </div>

           <div className="flex gap-3">
            <button 
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
                Submit Request
            </button>
            <button 
              type="button"
              onClick={()=> navigate(PATHS.USER_HOME)}
              className="px-4 py-2 rounded-lg text-sm text-text-secondary border border-border hover:text-text-primary transition-colors"
            >
                Cancel
            </button>
           </div>

        </form>
    </div>
  )
}

export default CreateTicketPage
