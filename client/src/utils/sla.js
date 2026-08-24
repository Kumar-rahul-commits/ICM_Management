export function getSlaStatus(slaDeadline,status){
    if(status === "resolved" || !slaDeadline){
        return null
    }
    const deadline = new Date(slaDeadline).getTime()
    const now= Date.now()
    const diffMs = deadline-now
    
    //breached - past the deadline
if(diffMs <=0){
    return {text:"Breached", level:"danger"}
}


    const totalMinutes = Math.floor(diffMs /(60*1000))
    const days = Math.floor(totalMinutes / (60*24))
    const hours = Math.floor((totalMinutes % (60*24))/60)
    const minutes = totalMinutes %60

    let text 
    if(days>0){
        text =`${days}d ${hours}h left`
    }
    else if(hours>0){
        text= `${hours}h ${minutes}m left`
    }else{
        text =`${minutes}m left`
    }

    const level = diffMs < 60*60*1000 ? "warning" : "normal"

    return {text,level}
}