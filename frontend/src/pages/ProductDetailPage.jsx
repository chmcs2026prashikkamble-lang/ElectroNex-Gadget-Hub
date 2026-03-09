import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

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
        toast.error("failed to fetch the product");
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
      toast.success("Product deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting product", error);
      toast.error("failed to delete product");
    }
  };

  const handleSave = async () => {
    if (!product.name.trim() || !product.brand.trim() || !product.price) {
      toast.error("Please add name, brand and price");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/products/${id}`, {
        name: product.name,
        brand: product.brand,
        price: Number(product.price),
        category: product.category,
        description: product.description,
        warrantyPeriod: product.warrantyPeriod
      });

      toast.success("Product updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error updating product", error);
      toast.error("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" /> Back to Products
            </Link>

            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" /> Delete
            </button>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Product name"
                  className="input input-bordered w-full"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Brand</span>
                </label>
                <input
                  type="text"
                  placeholder="Product brand"
                  className="input input-bordered w-full"
                  value={product.brand}
                  onChange={(e) =>
                    setProduct({ ...product, brand: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  className="input input-bordered w-full"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <input
                  type="text"
                  placeholder="Category"
                  className="input input-bordered w-full"
                  value={product.category || ""}
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Warranty Period</span>
                </label>
                <input
                  type="text"
                  placeholder="Warranty (e.g. 1 Year)"
                  className="input input-bordered w-full"
                  value={product.warrantyPeriod || ""}
                  onChange={(e) =>
                    setProduct({ ...product, warrantyPeriod: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;