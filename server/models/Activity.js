const mongoose= require("mongoose")

const activitySchema = new mongoose.Schema({
    ticket:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Ticket",
        required:true
    },
    actor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    action:{
        type:String,
        required:true
    }
},
{timestamps: true}
)

module.exports = mongoose.model("Activity", activitySchema)