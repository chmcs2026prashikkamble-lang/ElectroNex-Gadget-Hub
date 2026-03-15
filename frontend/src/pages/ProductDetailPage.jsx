import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon, Package, UserCircle, DollarSign, Tag, ShieldCheck, Save, AlignLeft, PackageOpen, Star } from "lucide-react";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product", error);
        toast.error("Failed to fetch the product", {
          style: { background: '#12151c', color: '#fff', border: '1px solid #fb7185' }
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted successfully", {
        style: { background: '#12151c', color: '#fff', border: '1px solid #22d3ee' }
      });
      navigate("/");
    } catch (error) {
      console.log("Error deleting product", error);
      toast.error("Failed to delete product", {
        style: { background: '#12151c', color: '#fff', border: '1px solid #fb7185' }
      });
    }
  };

  const handleSave = async () => {
    if (!product.name.trim() || !product.brand.trim() || !product.price) {
      toast.error("Please add name, brand and price", {
        style: { background: '#12151c', color: '#fff', border: '1px solid #fb7185' }
      });
      return;
    }

    setSaving(true);

    try {
      await api.put(`/products/${id}`, {
        name: product.name,
        brand: product.brand,
        price: Number(product.price),
        category: product.category,
        warrantyPeriod: product.warrantyPeriod,
        description: product.description,
        inStock: product.inStock !== false, // defaults to true if undefined
        rating: Number(product.rating) || 1
      });

      toast.success("Product updated successfully", {
        style: { background: '#12151c', color: '#fff', border: '1px solid #22d3ee' }
      });
      navigate("/");
    } catch (error) {
      console.log("Error updating product", error);
      toast.error("Failed to update product", {
        style: { background: '#12151c', color: '#fff', border: '1px solid #fb7185' }
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center">
        <LoaderIcon className="animate-spin size-12 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">

          {/* Header Actions */}
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group"
            >
              <ArrowLeftIcon className="size-5 group-hover:-translate-x-1 transition-transform" /> 
              Back to Products
            </Link>

            <button 
              onClick={handleDelete} 
              className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-500 border border-rose-500/50 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-[0_0_15px_rgba(244,63,94,0.1)] hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]"
            >
              <Trash2Icon className="size-4" /> Delete
            </button>
          </div>

          {/* Form Card */}
          <div className="bg-[#12151c] rounded-2xl border border-gray-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative">
            
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

            <div className="p-8 md:p-10">
              <h2 className="text-3xl font-bold text-white mb-8 tracking-wide">
                Edit <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">Product</span>
              </h2>

              <div className="space-y-6">

                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Package className="size-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                    <input
                      type="text"
                      placeholder="Product name"
                      className="w-full bg-[#0a0c10] border border-gray-800 text-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-gray-600"
                      value={product.name}
                      onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    />
                  </div>
                </div>

                {/* Brand & Price Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Brand</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <UserCircle className="size-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                      </div>
                      <input
                        type="text"
                        placeholder="Product brand"
                        className="w-full bg-[#0a0c10] border border-gray-800 text-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-gray-600"
                        value={product.brand}
                        onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Price (₹)</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <DollarSign className="size-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                      </div>
                      <input
                        type="number"
                        placeholder="Price"
                        className="w-full bg-[#0a0c10] border border-gray-800 text-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-gray-600"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Category & Warranty Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Category</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Tag className="size-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                      </div>
                      <input
                        type="text"
                        placeholder="Category"
                        className="w-full bg-[#0a0c10] border border-gray-800 text-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-gray-600"
                        value={product.category || ""}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Warranty Period</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <ShieldCheck className="size-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                      </div>
                      <input
                        type="text"
                        placeholder="Warranty (e.g. 1 Year)"
                        className="w-full bg-[#0a0c10] border border-gray-800 text-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-gray-600"
                        value={product.warrantyPeriod || ""}
                        onChange={(e) => setProduct({ ...product, warrantyPeriod: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* NEW: Stock & Rating Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Stock Status</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <PackageOpen className="size-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                      </div>
                      <select
                        className="w-full bg-[#0a0c10] border border-gray-800 text-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer"
                        value={product.inStock !== false ? "true" : "false"}
                        onChange={(e) => setProduct({ ...product, inStock: e.target.value === 'true' })}
                      >
                        <option value="true">In Stock</option>
                        <option value="false">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Rating (1-5)</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Star className="size-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                      </div>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        placeholder="e.g. 4.5"
                        className="w-full bg-[#0a0c10] border border-gray-800 text-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-gray-600"
                        value={product.rating || ""}
                        onChange={(e) => setProduct({ ...product, rating: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* NEW: Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Description</label>
                  <div className="relative group">
                    <div className="absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none">
                      <AlignLeft className="size-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                    <textarea
                      placeholder="Brief specifications of the product..."
                      className="w-full bg-[#0a0c10] border border-gray-800 text-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-gray-600 min-h-[100px] resize-y"
                      value={product.description || ""}
                      onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-6">
                  <button
                    className="w-full flex justify-center items-center gap-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-400 hover:text-[#0a0c10] py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={saving}
                    onClick={handleSave}
                  >
                    {saving ? (
                      <LoaderIcon className="animate-spin size-5" />
                    ) : (
                      <>
                        <Save className="size-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;