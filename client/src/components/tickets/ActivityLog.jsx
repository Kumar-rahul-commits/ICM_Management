

import { useState, useEffect } from "react"
import { getActivity } from "../../services/activityService.js"

function ActivityLog({ ticketId }) {
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getActivity(ticketId)
        setActivity(data)
      } catch (err) {
        // activity is non-critical; fail quietly
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [ticketId])

  if (loading) return null
  if (activity.length === 0) return null

  return (
    <div className="mt-6">
      <h2 className="text-sm font-medium text-text-primary mb-3">Activity</h2>
      <div className="flex flex-col gap-2">
        {activity.map((item) => (
          <div key={item._id} className="flex items-center gap-2 text-xs text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-text-muted shrink-0"></span>
            <span className="text-text-secondary font-medium">
              {item.actor?.name || "Someone"}
            </span>
            <span>{item.action}</span>
            <span>·</span>
            <span>{new Date(item.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityLog
