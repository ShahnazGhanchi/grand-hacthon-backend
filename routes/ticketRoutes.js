const express = require("express");

const {
  createTicket,
  getTickets,
  getTicketById,
  getAllTickets,
} = require("../controllers/ticketController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createTicket);

router.get("/", protect, getTickets);

router.get("/admin/all", protect, getAllTickets);

router.get("/:id", protect, getTicketById);

module.exports = router;