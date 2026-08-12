function Badge({label,color}) {
    const colorClasses = {
      red: "bg-red-500/15 text-red-400",
      amber: "bg-amber-500/15 text-amber-400",
      green: "bg-green-500/15 text-green-400",
      blue: "bg-blue-500/15 text-blue-400",
      purple: "bg-purple-500/15 text-purple-400",
      gray: "bg-gray-500/15 text-gray-400",
    }


    return (
        <span className={`text-xs px-2.5 py-1 rounded-full ${colorClasses[color]}`}>
            {label}
        </span>
    )
}

export default Badge