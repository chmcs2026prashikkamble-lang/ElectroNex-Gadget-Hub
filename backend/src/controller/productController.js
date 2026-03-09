import Product from "../models/productModel.js";

// GET ALL PRODUCTS
export async function getAllProducts(_, res) {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error in getAllProducts controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// GET PRODUCT BY ID
export async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error in getProductById controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// CREATE PRODUCT
export async function createProduct(req, res) {
    try {
        const { name, brand, price, category, description, inStock, warrantyPeriod, rating } = req.body;

        if (!name || !brand || !price) {
            return res.status(400).json({ message: "Name, Brand and Price are required" });
        }

        const product = new Product({
            name,
            brand,
            price,
            category,
            description,
            inStock,
            warrantyPeriod,
            rating
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        console.error("Error in createProduct controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// UPDATE PRODUCT
export async function updateProduct(req, res) {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);

    } catch (error) {
        console.error("Error in updateProduct controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// DELETE PRODUCT
export async function deleteProduct(req, res) {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        console.error("Error in deleteProduct controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
