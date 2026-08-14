import { useNavigate } from "react-router"
import { PATHS } from "../../routes/paths"

function NewRequestBanner() {
    const navigate = useNavigate()
  return (
    <div className="flex items-center justify-between gap-3 bg-surfacr-raised border border-border rounded-xl px-5 py-4 mb-5">
        <div>
            <div className="text-sm font-medium text-text-primary">
                Need help with Something?
            </div>
            <div className="text-xs text-text-secondary">
                Raise a new request and we'll get on it
            </div>
        </div>

        <button onClick={()=> navigate(PATHS.CREATE_TICKET)} className="flex items-center gap-1.5 bg-blue hover:bg-blue-700 text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors shrink-0">
            <span>+ </span>
            <span>New Request</span>
        </button>
    </div>
  )
}

export default NewRequestBanner
