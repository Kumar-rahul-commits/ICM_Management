function Sidebar() {
    const workspaceLinks =[
        {label: "Dashboard", active: true},
        {label:"All tickets" ,count: 60},
        {label: "Assigned to me"},
        {label:"SLA breaches"},
    ]

    const manageLinks=[
        {label:"Enginners"},
        {label:"Reports"}
    ]

    return(
        <aside className="w-52 shrink-0 bg-surfacr-raised border-r border-border flex flex-col p-3">
             <div className="flex items-center gap-2 px-2 py-3 mb-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                    H
                </div>
                <span className="font-medium text-text-primary">HelpDesk</span>
             </div>

             <NavSection title="Workspace" links={workspaceLinks} />
              <NavSection title="Manage" links={manageLinks} />
           <div className="mt-auto">
            <NavItem link={{label: "Setting"}} />
           </div>

        </aside>
    )
}

function NavSection({title,links}){
    return (
        <div className="mb-4">
            <div className="text-xs uppercase tracking-wide text-text-muted px-2 py-1">
                {title}
            </div>
            {links.map((a)=>
            <NavItem key={a.label} link={a} />)}
        </div>
    )
}

function NavItem({link}){
    const baseClasses="flex items-center justify-between px-2.5 py-2 rounded-lg text-sm cursor-pointer transition-colors"
    const stateClasses = link.active ? "bg-blue-600/15 text-blue-500 font-medium" : "text-text-secondary hover:bg-blue-600/10 hover:text-text-primary"

    return(
        <diV className={`${baseClasses} ${stateClasses}`}>
             <span>
                {link.label}
             </span>
              {link.count && (
                <span className="text-xs px-1.5 py-0.5 rounded-full border border-bordertext-text-muted">
                    {link.count}
                </span>
              )}
        </diV>
    )
}

export default Sidebar