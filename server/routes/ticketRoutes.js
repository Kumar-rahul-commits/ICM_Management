const express = require("express")

const{
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    assignTicket
} = require("../controllers/ticketController")
const {protect,authorize}= require("../middleware/authMiddleware")
const router = express.Router()

router.use(protect)

router.post("/",createTicket)
router.get("/",getTickets)
router.get("/:id",getTicketById)
router.patch("/:id", authorize("engineer"), updateTicket)
router.patch("/:id/assign", authorize("engineer"), assignTicket)

module.exports = router