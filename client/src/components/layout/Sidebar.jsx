import {Link, useLocation} from "react-router"
import { PATHS } from "../routes/paths"
function Sidebar() {
    const loc= useLocation();
    const workspaceLinks =[
        {label: "Dashboard", to:PATHS.ENGINEER_CONSOLE},
        {label:"All tickets" ,to:PATHS.ALL_TICKETS,count:60},
    ]

 

    return(
        <aside className="w-52 shrink-0 bg-surfacr-raised border-r border-border flex flex-col p-3">
             <div className="flex items-center gap-2 px-2 py-3 mb-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                    H
                </div>
                <span className="font-medium text-text-primary">HelpDesk</span>
             </div>

             <NavSection title="Workspace" links={workspaceLinks} currentPath={loc.pathname} />
            {console.log({loc})}
         

        </aside>
    )
}

function NavSection({title,links,currentPath}){
    return (
        <div className="mb-4">
            <div className="text-xs uppercase tracking-wide text-text-muted px-2 py-1">
                {title}
            </div>
            {links.map((a)=>
            <NavItem key={a.to} link={a} currentPath={currentPath}/>)}
        </div>
    )
}

function NavItem({link,currentPath}){
    const isActive= currentPath === link.to
    const baseClasses="flex items-center justify-between px-2.5 py-2 rounded-lg text-sm cursor-pointer transition-colors"
    const stateClasses = isActive ? "bg-blue-600/15 text-blue-500 font-medium" : "text-text-secondary hover:bg-blue-600/10 hover:text-text-primary"

    return(
        <Link to={link.to} className={`${baseClasses} ${stateClasses}`}>
             <span>
                {link.label}
             </span>
              {link.count && (
                <span className="text-xs px-1.5 py-0.5 rounded-full border border-bordertext-text-muted">
                    {link.count}
                </span>
              )}
        </Link>
    )
}

export default Sidebar