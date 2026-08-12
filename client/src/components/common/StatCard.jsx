

function StatCard({label, value,highlight="default"}){
    const valueColors = {
        default: "text-text-primary",
        warning: "text-amber-400",
        danger: "text-red-400",
    }

    return (
        <div className="flex-1 bg-surface-raised border border-border rounded-xl px-4 py-3">
            <div className="text-sm text-text-secondary">{label}</div>
            <div className={`text-2xl font-medium ${valueColors[highlight]}`}> 
                {value} 
                </div>
        </div>
    )
}

export default StatCard