import RequestCard from "./RequestCard"

function RequestList({requests}) {
  return (
    <div>
      <section>
        <h2 className="text-sm font-mediu text-text-primary mb-3">
            My Requests
        </h2>
        <div className="flex flex-col gap-3">
            {requests.map((request)=>(
                <RequestCard key={request.id} request={request} />
            ))}
        </div>
      </section>
    </div>
  )
}

export default RequestList
