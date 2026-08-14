const Ticket= require("../models/Ticket")
const Activity = require("../models/Activity")
const User = require("../models/User")
//Post /api/tickets - any logged-in user can create 
//const Activity = require("../models/Activity")   // make sure this is imported at top

// GET /api/tickets/:id/activity
async function getActivity(req, res) {
  try {
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" })
    }

    // same view permission as the ticket: engineers any, users their own
    const isOwner = String(ticket.createdBy) === String(req.user.id)
    if (req.user.role !== "engineer" && !isOwner) {
      return res.status(403).json({ message: "Not allowed to view this activity" })
    }

    const activity = await Activity.find({ ticket: req.params.id })
      .populate("actor", "name role")
      .sort({ createdAt: -1 })   // newest first

    res.json(activity)
  } catch (error) {
    console.log("getActivity error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}


async function createTicket(req,res){
    try{
        const {title,description,priority} =req.body
         
        if(!title || !description){
            return res.status(400).json({message: "Title and description are required"})
        }
   
        const ticket = await Ticket.create({
            title,
            description,
            priority: priority || "medium",
            createdBy: req.user.id
        })
       
         await Activity.create({
            ticket:ticket._id,
            actor:req.user.id,
            action: "Created the ticket"
        }) 
        res.status(201).json(ticket)
    }
    catch(error){
        res.status(500).json({message:"Server Error", error:error.message})
    }
}

//GET /api/tickets - role-based: users see own, engineers see all
async function getTickets(req,res){
    try{
        const {search,status,priority,page=1,limit=10} = req.query
        const filter={}
      
        if(req.user.role==="user"){
            filter.createdBy=req.user.id}
        
        if(status && status!=="all"){
            filter.status = status
        }
           if(priority && priority!=="all"){
            filter.priority = priority
        }

        if(search){
            filter.title = {$regex:search,$options:"i"}
        }
             //pagination math
             const pageNum=parseInt(page)
             const limitNum= parseInt(limit)
             const skip = (pageNum -1) * limitNum


        const [tickets,total] = await Promise.all([
            Ticket.find(filter).populate("createdBy","name eamil").populate("assignedTo","name email").sort({createdAt: -1}).skip(skip).limit(limitNum),
            Ticket.countDocuments(filter)
        ])
        res.json({tickets,
            total,page:pageNum,
            totalPages:Math.ceil(total/limitNum)
        })
    }
    catch(error){
        res.status(500).json({message:"Server error", error: error.message})
    }
}
//GET /api/tickets/:id one ticket

async function getTicketById(req,res){
    try{
        const ticket = await Ticket.findById(req.params.id).populate("createdBy","name email").populate("assignedTo","name email")
        if(!ticket) return res.status(404).json({message: "Ticket not found"})

            res.json(ticket)
    }
    catch(error){
        res.status(500).json({message:"Server error",error:error.message})
    }
}


//PATCH /api/tickets/:id update status/priority engineers only

async function updateTicket(req,res){
    try{
        const {status, priority}= req.body
        console.log("status and priority from updateTicket backend call",status,priority)
        const ticket = await Ticket.findById(req.params.id)

        if(!ticket){
            return res.status(404).json({message: "Ticket not found"})
        }

        if(status) ticket.status= status
        if(priority) ticket.priority = priority
        await ticket.save()

        await Activity.create({
            ticket:ticket._id,
            actor:req.user.id,
            action:`updated the ticket (${status || ""} ${priority || ""})`.trim()
        })
        res.json(ticket)
    }
    catch(error){
        res.status(500).json({message:"Server error", error:error.message})
    }
}

//PATCH /api/tickets/:id/assign engineer self-assign,

async function assignTicket(req,res){
   try { const ticket= await Ticket.findById(req.params.id)
              console.log("Assign server Call", req.params.id, ticket)
    if(!ticket){
        return res.status(404).json({message: "Ticket not found"})
    }
    ticket.assignedTo= req.user.id
    if(ticket.status==="open") ticket.status = "in-progress"

    await ticket.save()

    await Activity.create({
        ticket:ticket._id,
        actor:req.user.id,
        action:"Assigned the ticket to themselves"
    })
    res.json(ticket)}
    catch(error){
        res.status(500).json({message:"Server error", error: error.message})
    }
}

module.exports = {createTicket,getTickets, getTicketById ,updateTicket,assignTicket,getActivity}