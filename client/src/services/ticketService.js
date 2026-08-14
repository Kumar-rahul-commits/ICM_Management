import api from "./api"

export async function createTicket(ticketData){
    console.log("Ticket Services  stage 1",ticketData)
    const response= await api.post("/tickets", ticketData)
     console.log("Ticket Services  stage 2")
    return response.data
}

export async function getTickets(params={}){
    const response = await api.get("/tickets",{params})
    return response.data
}

export async function getTicketById(id){
    const response= await api.get(`/tickets/${id}`)
    return response.data
}

export async function updateTicket(id,updates){
    const response = await api.patch(`/tickets/${id}`,updates)
    return response.data
}

export async function assignTicket(id){
    console.log("ticket id is coming while assigning",id)
    const response= await api.patch(`/tickets/${id}/assign`)
    return response.data
}


