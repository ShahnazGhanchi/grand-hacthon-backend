const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.send("E-Commerce Backend Working Fresh! 🚀");
});

app.use("/api/auth", authRoutes);

// Vercel
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => {
    console.log(`🚀 Server is flying on port ${PORT}`);
  });
}