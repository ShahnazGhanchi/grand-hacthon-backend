const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// 1. Auth Routes Import 
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

// Database Connect
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/tickets", ticketRoutes);


// Routes
app.get("/", (req, res) => {
  res.send("E-Commerce Backend Working Fresh! 🚀");
});
app.use("/api/auth", authRoutes);// ye routes hum cheak kare gy


// Server Start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});