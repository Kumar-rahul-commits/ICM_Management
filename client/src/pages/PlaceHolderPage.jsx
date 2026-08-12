import React from 'react'

function PlaceHolderPage({title}) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
            <div className="text-lg font-medium text-text-primary">
                {title}
            </div>
            <div className="text-sm text-text-muted mt-1">This page is comig soon.</div>
        </div>
    </div>
  )
}

export default PlaceHolderPage
