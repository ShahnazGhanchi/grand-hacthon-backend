const express = require("express");

const router = express.Router();

const {
  getProducts,
  createProduct,
  getProductById,
} = require("../controllers/productController.js");

const upload = require("../middleware/upload.js");

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", upload.single("image"), createProduct);

module.exports = router;