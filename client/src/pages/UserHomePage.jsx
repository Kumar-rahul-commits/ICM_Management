import PageHeader from "../components/layout/PageHeader";
import StatCardGrid from "../components/tickets/StatCardGrid";
import NewRequestBanner from "../components/tickets/NewRequestBanner";
import RequestList from "../components/tickets/RequestList";

function UserHomePage(){
    const stats=[
        {label:"Open",value:2},
        {label:"In Progress", value:1},
        {label:"Resolved" , value:8}
    ]

    const requests=[
        {id:1042,title: "Loging page returns 500 error", status:"open", updated:"opened 2h ago"},
    {id:1041,title: "Export to CSV missing columns", status:"in-progress", updated:"opened 2h ago"},
    {id:1040,title: "Password reset email delayed", status:"resolved", updated:"opened 2h ago"}
    ]

    return(
        <div className="max-w-2xl mx-auto">
            <PageHeader
            title="Hi Priya "
            subtitle="Here's what's happening with your requests"
            />
            <StatCardGrid stats={stats} />
            <NewRequestBanner />
            <RequestList requests={requests} />
        </div>
    )
}
export default UserHomePage