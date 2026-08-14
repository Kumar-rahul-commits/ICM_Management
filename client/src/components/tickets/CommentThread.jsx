import { useState, useEffect } from "react"
import { getComments, addComment } from "../../services/commentService.js"

function CommentThread({ ticketId }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadComments()
  }, [ticketId])

  async function loadComments() {
    try {
      const data = await getComments(ticketId)
      setComments(data)
    } catch (err) {
      setError("Failed to load comments")
    } finally {
      setLoading(false)
    }
  }

  async function handlePost(e) {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const created = await addComment(ticketId, newComment.trim())
      setComments([...comments, created])
      setNewComment("")
    } catch (err) {
      setError("Failed to post comment")
    }
  }

  return (
    <div className="mt-6">
      <h2 className="text-sm font-medium text-text-primary mb-3">
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>

      {loading && <div className="text-sm text-text-muted">Loading comments…</div>}
      {error && <div className="text-sm text-red-500 mb-2">{error}</div>}

      {!loading && comments.length === 0 && (
        <div className="text-sm text-text-muted mb-4">No comments yet.</div>
      )}

      <div className="flex flex-col gap-3 mb-4">
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </div>

      <form onSubmit={handlePost} className="flex flex-col gap-2">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment…"
          rows={3}
          className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary resize-none"
        />
        <button
          type="submit"
          className="self-end bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        >
          Post comment
        </button>
      </form>
    </div>
  )
}

function CommentItem({ comment }) {
  const isEngineer = comment.author?.role === "engineer"

  return (
    <div
      className={`rounded-lg px-4 py-3 border ${
        isEngineer
          ? "bg-blue-500/5 border-blue-500/20"
          : "bg-surface-raised border-border"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-medium text-text-primary">
          {comment.author?.name || "Unknown"}
        </span>
        {isEngineer && (
          <span className="text-xs text-blue-500 bg-blue-500/15 rounded-full px-2 py-0.5">
            Engineer
          </span>
        )}
        <span className="text-xs text-text-muted">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      <p className="text-sm text-text-secondary">{comment.body}</p>
    </div>
  )
}

export default CommentThread

