import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import api from "../lib/axios";
import { ArrowLeft, Edit2, ShieldCheck, Star, Package, Tag, UserCircle, AlignLeft, CheckCircle2, XCircle } from "lucide-react";

const ProductViewPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center text-cyan-400">Loading...</div>;
  if (!product) return <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center text-rose-500">Product not found.</div>;

  return (
    <div className="min-h-screen bg-[#0a0c10] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
            <ArrowLeft className="size-5" /> Back to Collection
          </Link>
          <Link to={`/edit/${product._id}`} className="flex items-center gap-2 bg-yellow-500/10 text-yellow-500 border border-yellow-500/50 px-4 py-2 rounded-xl hover:bg-yellow-500 hover:text-[#0a0c10] transition-all">
            <Edit2 className="size-4" /> Edit Product
          </Link>
        </div>

        {/* Main Display Card */}
        <div className="bg-[#12151c] rounded-3xl border border-gray-800 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left Side: Visual Stats */}
            <div className="space-y-8">
              <div>
                <span className="px-3 py-1 text-xs font-bold tracking-widest rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
                  {product.category}
                </span>
                <h1 className="text-4xl font-black text-white mt-4 mb-2 tracking-tight">{product.name}</h1>
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="size-5 fill-yellow-400" />
                      <span className="font-bold text-lg">{product.rating || "N/A"}</span>
                   </div>
                   <div className="text-gray-600">|</div>
                   <div className={`flex items-center gap-2 font-bold ${product.inStock !== false ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {product.inStock !== false ? <CheckCircle2 className="size-5" /> : <XCircle className="size-5" />}
                      {product.inStock !== false ? "IN STOCK" : "OUT OF STOCK"}
                   </div>
                </div>
              </div>

              <div className="text-5xl font-black text-white">
                ₹{product.price?.toLocaleString()}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300 bg-[#0a0c10] p-4 rounded-2xl border border-gray-800">
                  <UserCircle className="size-6 text-cyan-400" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Brand</p>
                    <p className="font-medium text-lg">{product.brand}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-300 bg-[#0a0c10] p-4 rounded-2xl border border-gray-800">
                  <ShieldCheck className="size-6 text-emerald-400" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Warranty</p>
                    <p className="font-medium text-lg">{product.warrantyPeriod} Coverage</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Description */}
            <div className="flex flex-col justify-center">
               <div className="bg-[#0a0c10] p-6 rounded-3xl border border-gray-800 h-full">
                  <div className="flex items-center gap-2 text-cyan-400 mb-4">
                    <AlignLeft className="size-5" />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Specifications</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-lg italic">
                    "{product.description || "No detailed specifications provided for this gadget."}"
                  </p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewPage;