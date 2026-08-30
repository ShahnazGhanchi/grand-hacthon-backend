const Ticket = require("../models/ticket");

// ===============================
// CREATE TICKET
// ===============================
const createTicket = async (req, res) => {
  try {
    const { subject, description, category, priority } = req.body;

    if (!subject || !description) {
      return res.status(400).json({
        message: "Subject and description are required",
      });
    }

    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "User authentication required",
      });
    }

    const ticketNumber = `SUP-${Date.now()}`;

    const ticket = await Ticket.create({
      ticketNumber,
      subject,
      description,
      category: category || "General Inquiry",
      priority: priority || "Medium",
      user: userId,
    });

    res.status(201).json({
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.error("Create Ticket Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ===============================
// GET USER TICKETS
// ===============================
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      tickets,
    });
  } catch (error) {
    console.error("Get Tickets Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ===============================
// GET SINGLE TICKET
// ===============================
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      ticket,
    });
  } catch (error) {
    console.error("Get Ticket By ID Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ===============================
// GET ALL TICKETS - ADMIN
// ===============================
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      tickets,
    });
  } catch (error) {
    console.error("Get All Tickets Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ===============================
// EXPORTS
// ===============================
module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  getAllTickets,
};