const Comment = require("../models/Comment")
const Ticket = require("../models/Ticket")

//GET /api/tickets/:id/comments

async function getComments(req,res){
    try {
        const ticket = await Ticket.findById(req.params.id)
        if(!ticket){
            return res.status(404).json({message:"Ticket not found"})
        }
//permission: engineers can view any; users only their own ticket's comments
const isOwner = String(ticket.createdBy) === String(req.user.id)
if(req.user.role !== "engineer" && !isOwner){
    return res.status(403).json({message:"Not allowed to view these comments"})
}

const comments = await Comment.find({ticket:req.params.id}).populate("author","name role").sort({createdAt:1})
       res.json(comments)
    } catch (error) {
           console.log("getComments Error",error)
           res.status(500).json({message:"Server error",error:error.message})
    }
}

//POST /api/tickets/:id/comments
async function addComment(req,res){
    try {
        const {body} = req.body
        if(!body || !body.trim()){
                       return res.status(400).json({message: "Comment cannot be empty"})
        }
      
         const ticket = await Ticket.findById(req.params.id)
         if(!ticket){
            return res.status(404).json({message: "Ticket not found"})
         }

         //permission: engineers can comment on any; users only on their own ticket
         const isOwner = String(ticket.createdBy) === String(req.user.id)
         if(req.user.role!== "engineer" && !isOwner){
            return res.status(403).json({message:"Not allowed to comment on this ticket"})
         }

          
         const comment = await Comment.create({
            ticket:req.params.id,
            author:req.user.id,
            body: body.trim()
         })
   
         const populated= await comment.populate("author","name role")
         res.status(201).json(populated)


    } catch (error) {
        console.log("addComment error:", error)
        res.status(500).json({message: "Server error", error: error.message})
    }
}

module.exports = {getComments, addComment}