import StatCard from "../common/StatCard"


function StatCardGrid({ stats }) {
  return (
    <div className="flex gap-3 mb-5">
        {stats.map((stat)=>(
            <StatCard 
            key={stat.label}
            label={stat.label}
            value={stat.value}
            highlight={stat.highlight}
            />
        ))}
    </div>
  )
}

export default StatCardGrid
