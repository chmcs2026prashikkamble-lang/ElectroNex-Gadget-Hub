import { Link, useLocation } from "react-router";
import { Package, UserCircle, ShieldCheck, Edit2, Trash2 } from "lucide-react";
import { formatData } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const ProductCard = ({ product, setProducts }) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const isActive = location.pathname === `/products/${product._id}`;

  const handleDelete = async () => {
    try {
      await api.delete(`/products/${product._id}`);

      setProducts((prev) => prev.filter((p) => p._id !== product._id));

      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      {/* CARD */}
      <Link
        to={`/products/${product._id}`}
        className={`relative block rounded-xl bg-base-100 p-4 border transition-all duration-200
        ${isActive ? "border-primary shadow-lg" : "border-base-200"}
        hover:border-primary hover:shadow-xl`}
      >

        {/* Top Row */}
        <div className="flex justify-between items-start">

          {/* PRODUCT ID (Hidden for now) */}
          {/* 
          <p className="text-xs text-base-content/60 truncate">
            {product._id}
          </p>
          */}

          <span className="badge badge-secondary">
            {product.category}
          </span>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-3">

          {/* Name */}
          <div className="flex items-center gap-2">
            <Package className="size-4 text-primary" />
            <p className="font-semibold text-base-content line-clamp-1">
              {product.name}
            </p>
          </div>

          {/* Brand */}
          <div className="flex items-center gap-2 text-base-content/70">
            <UserCircle className="size-4 text-primary" />
            <p className="text-sm line-clamp-1">
              {product.brand}
            </p>
          </div>

          {/* Price */}
          <div className="text-lg font-bold text-primary">
            ₹ {product.price}
          </div>

          {/* Warranty */}
          <div className="flex items-center gap-2 text-success text-sm">
            <ShieldCheck className="size-4" />
            <span>{product.warrantyPeriod} Warranty</span>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between items-center">

          <span className="text-xs text-base-content/60">
            {formatData(new Date(product.createdAt))}
          </span>

          {/* Action Icons */}
          <div className="flex items-center gap-4">

            <div className="tooltip tooltip-warning" data-tip="Edit Product">
              <Edit2 className="size-4 text-warning hover:scale-110 transition" />
            </div>

            <div className="tooltip tooltip-error" data-tip="Delete Product">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowModal(true);
                }}
                className="text-error hover:scale-110 transition"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

          </div>
        </div>
      </Link>

      {/* Delete Modal */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">

            <h3 className="font-bold text-lg text-error flex items-center gap-2">
              <Trash2 className="size-5" /> Delete Product
            </h3>

            <p className="py-4 text-base-content/70">
              Are you sure you want to delete
              <span className="font-semibold text-base-content">
                {" "} '{product.name}'
              </span>? <br />
              This action cannot be undone.
            </p>

            <div className="modal-action">

              <button
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-error flex items-center gap-2"
                onClick={handleDelete}
              >
                <Trash2 className="size-4" /> Delete
              </button>

            </div>

          </div>
        </dialog>
      )}
    </>
  );
};

export default ProductCard;