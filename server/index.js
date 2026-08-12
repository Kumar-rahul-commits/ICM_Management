require("dotenv").config()
const express= require("express");
const cors= require("cors")
const connectDB= require("./config/db")
//models exported
require("./models/User")
require("./models/Ticket")
require("./models/Comment")
require("./models/Activity")


//routes exported
const authRoutes = require("./routes/authRoutes")
const ticketRoutes = require("./routes/ticketRoutes")
const app= express();


//route setup
app.use("/api/auth",authRoutes)
app.use("/api/tickets",authRoutes)



connectDB();

app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message: "Ticket API is Running"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})