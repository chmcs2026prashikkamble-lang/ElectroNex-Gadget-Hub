import { Link, useLocation, useNavigate } from "react-router"; // Added useNavigate
import { Package, UserCircle, ShieldCheck, Edit2, Trash2, Star, CheckCircle2, XCircle } from "lucide-react";
import { formatData } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const ProductCard = ({ product, setProducts }) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Hook for programmatic navigation

  const isActive = location.pathname === `/products/${product._id}`;

  const isAvailable = product.inStock !== false; 
  const currentRating = product.rating || 1;

  const handleDelete = async () => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
      toast.success("Product deleted successfully", {
        style: { background: '#12151c', color: '#fff', border: '1px solid #22d3ee' }
      });
    } catch (error) {
      toast.error("Failed to delete product", {
        style: { background: '#12151c', color: '#fff', border: '1px solid #fb7185' }
      });
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      {/* MAIN CARD: Now links to the VIEW page */}
      <Link
        to={`/products/${product._id}`}
        className={`relative block rounded-2xl bg-[#12151c] p-6 border transition-all duration-300 group flex flex-col h-full
        ${isActive 
            ? "border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.3)]" 
            : "border-gray-800"
        }
        hover:-translate-y-1 hover:border-cyan-500/60 hover:shadow-[0_8px_30px_rgba(34,211,238,0.15)]`}
      >

        {/* Top Row: Stock Status & Category Badge */}
        <div className="flex justify-between items-start mb-4">
          {isAvailable ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold tracking-wider rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="size-3.5" /> IN STOCK
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold tracking-wider rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <XCircle className="size-3.5" /> OUT OF STOCK
            </div>
          )}

          <span className="px-3 py-1 text-xs font-semibold tracking-wider rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
            {product.category?.toUpperCase() || "GADGET"}
          </span>
        </div>

        {/* Product Info */}
        <div className="space-y-3 flex-grow">
          <div className="flex justify-between items-start gap-2">
            <div className="flex items-start gap-3">
              <Package className="size-5 text-cyan-400 mt-0.5 drop-shadow-[0_0_5px_rgba(34,211,238,0.6)] shrink-0" />
              <p className="font-bold text-gray-100 text-lg leading-tight line-clamp-2">
                {product.name}
              </p>
            </div>
            
            <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20 shrink-0">
              <Star className="size-3.5 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.6)]" />
              <span className="text-xs font-bold text-yellow-400">{currentRating}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <UserCircle className="size-4 shrink-0" />
            <p className="text-sm font-medium tracking-wide">
              {product.brand}
            </p>
          </div>

          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed pl-7">
            {product.description || "No description provided for this product."}
          </p>

          <div className="pt-2 flex flex-col gap-2">
            <div className="text-2xl font-black text-white pl-7">
              ₹ {product.price?.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-medium bg-cyan-900/30 w-fit px-2.5 py-1.5 rounded-md border border-cyan-800/50 ml-7">
              <ShieldCheck className="size-4" />
              <span>{product.warrantyPeriod || "No"} Warranty</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-800/60 flex justify-between items-center shrink-0">
          <span className="text-xs font-medium text-gray-500">
            {formatData(new Date(product.createdAt))}
          </span>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            {/* EDIT BUTTON: Now correctly links to /edit/id and stops propagation */}
            <button
              onClick={(e) => {
                e.preventDefault(); // Stop the parent card link from firing
                e.stopPropagation(); // Stop the click event from bubbling up
                navigate(`/edit/${product._id}`);
              }}
              className="p-2 rounded-lg hover:bg-yellow-500/10 group/edit transition-colors" 
              title="Edit Product"
            >
              <Edit2 className="size-4 text-gray-500 group-hover/edit:text-yellow-400 transition-colors" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowModal(true);
              }}
              className="p-2 rounded-lg hover:bg-rose-500/10 group/delete transition-colors"
              title="Delete Product"
            >
              <Trash2 className="size-4 text-gray-500 group-hover/delete:text-rose-400 transition-colors" />
            </button>
          </div>
        </div>
      </Link>

      {/* Delete Modal */}
      {showModal && (
        <dialog className="modal modal-open backdrop-blur-sm bg-black/40">
          <div className="modal-box bg-[#12151c] border border-gray-800 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <h3 className="font-bold text-xl text-rose-500 flex items-center gap-3">
              <div className="p-2 bg-rose-500/10 rounded-full">
                <Trash2 className="size-5" />
              </div>
              Delete Product
            </h3>
            <p className="py-6 text-gray-400 text-base leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-gray-200">'{product.name}'</span>? <br />
              This action cannot be undone.
            </p>
            <div className="modal-action">
              <button className="px-5 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="px-5 py-2.5 text-sm font-medium rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/50 hover:bg-rose-500 hover:text-white transition-all shadow-[0_0_15px_rgba(244,63,94,0.2)] flex items-center gap-2" onClick={handleDelete}><Trash2 className="size-4" /> Delete</button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ProductCard;