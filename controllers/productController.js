const Product = require("../models/product.js");
const uploadToCloudinary = require("../utils/cloudinaryUpload.js");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
     console.log("FILE:", req.file);
    const { name, description, price, category, stock } = req.body;

    let imageUrl = "";

    // Upload image to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image: imageUrl,
    });

    res.status(201).json({
      message: "Product created successfully! 📦",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
};