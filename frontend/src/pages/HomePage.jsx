import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../lib/axios";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard.jsx";
import ProductNotFound from "../components/ProductNotFound.jsx";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All"); // New state for Brand filter
  const [searchQuery, setSearchQuery] = useState("");
  
  const [loading, setLoading] = useState(true);

  // 1. Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log("Error fetching products", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 2. Combined Filter Logic: Runs whenever products, category, brand, or search changes
  useEffect(() => {
    let result = products;

    // Filter by Category
    if (selectedCategory !== "All") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    // Filter by Brand
    if (selectedBrand !== "All") {
      result = result.filter((product) => product.brand === selectedBrand);
    }

    // Filter by Search Query (Checking product name or brand)
    if (searchQuery.trim() !== "") {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(
        (product) => 
          product.name?.toLowerCase().includes(lowerCaseQuery) ||
          product.brand?.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, selectedBrand, searchQuery]);

  // Extract unique categories and brands for the dropdowns
  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];
  const brands = ["All", ...new Set(products.map((p) => p.brand).filter(Boolean))];

  return (
    <div className="min-h-screen bg-[#0a0c10] text-gray-200 selection:bg-cyan-500/30">
      {/* Pass search state down to Navbar */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 mt-4">
          <h2 className="text-3xl font-bold text-white tracking-wide shrink-0">
            Our <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">Products</span>
          </h2>

          {/* Filters Container */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Category Filter */}
            <select
              className="w-full sm:w-48 bg-[#12151c] border border-cyan-900/50 text-gray-200 text-sm rounded-xl focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block p-3 outline-none transition-all shadow-[0_0_15px_rgba(34,211,238,0.05)] hover:border-cyan-700 cursor-pointer appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              title="Filter by Category"
            >
              <option value="All" className="bg-[#12151c] text-gray-400">All Categories</option>
              {categories.filter(c => c !== "All").map((category, index) => (
                <option key={index} value={category} className="bg-[#12151c]">
                  {category}
                </option>
              ))}
            </select>

            {/* Brand Filter */}
            <select
              className="w-full sm:w-48 bg-[#12151c] border border-cyan-900/50 text-gray-200 text-sm rounded-xl focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block p-3 outline-none transition-all shadow-[0_0_15px_rgba(34,211,238,0.05)] hover:border-cyan-700 cursor-pointer appearance-none"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              title="Filter by Brand"
            >
              <option value="All" className="bg-[#12151c] text-gray-400">All Brands</option>
              {brands.filter(b => b !== "All").map((brand, index) => (
                <option key={index} value={brand} className="bg-[#12151c]">
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
          </div>
        )}

        {/* No Products */}
        {!loading && filteredProducts.length === 0 && (
          <div className="py-20">
            <ProductNotFound />
          </div>
        )}

        {/* Product Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                setProducts={setProducts}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;