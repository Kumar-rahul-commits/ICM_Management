import api from "./api";

export async function getComments(ticketId){
    const response = await api.get(`/tickets/${ticketId}/comments`)
    return response.data
}

export async function addComment(ticketId,body){
    console.log("ticket id and body",ticketId,body)
    const response = await api.post(`/tickets/${ticketId}/comments`,{body})
    return response.data
}