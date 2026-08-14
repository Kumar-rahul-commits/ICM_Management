import api from "./api"

export async function getActivity(ticketId) {
  const response = await api.get(`/tickets/${ticketId}/activity`)
  return response.data
}
