import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controller/productController.js";

const router = express.Router();

// GET all products
router.get("/", getAllProducts);

// GET product by ID
router.get("/:id", getProductById);

// CREATE product
router.post("/", createProduct);

// UPDATE product
router.put("/:id", updateProduct);

// DELETE product
router.delete("/:id", deleteProduct);

export default router;
