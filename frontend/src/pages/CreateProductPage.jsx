import api from '../lib/axios';
import { ArrowLeftIcon, Package, UserCircle, DollarSign, Tag, ShieldCheck, Save, AlignLeft, PackageOpen, Star } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

const CreateProductPage = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [warrantyPeriod, setWarrantyPeriod] = useState('');
  
  // New State variables for the schema
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState(true);
  const [rating, setRating] = useState(5); // Defaulting to a 5-star rating
  
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/products', {
        name,
        brand,
        price: Number(price),
        category,
        warrantyPeriod,
        description,         // Added payload
        inStock,             // Added payload
        rating: Number(rating) // Added payload
      });

      toast.success('Product created successfully!', {
        style: { background: '#12151c', color: '#fff', border: '1px solid #22d3ee' }
      });
      navigate('/');
    } catch (error) {
      console.log("Error creating product", error);
      toast.error('Failed to create product', {
        style: { background: '#12151c', color: '#fff', border: '1px solid #fb7185' }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-[#0a0c10] py-12'>
      <div className='container mx-auto px-4'>
        <div className='max-w-2xl mx-auto'>

          {/* Back Button */}
          <Link 
            to='/' 
            className='inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 mb-8 transition-colors group'
          >
            <ArrowLeftIcon className='size-5 group-hover:-translate-x-1 transition-transform' /> 
            Back to Products
          </Link>

          {/* Form Card */}
          <div className='bg-[#12151c] rounded-2xl border border-gray-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative'>
            
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

            <div className='p-8 md:p-10'>
              <h2 className='text-3xl font-bold text-white mb-8 tracking-wide'>
                Create New <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">Product</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Product Name */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-300'>Product Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Package className="size-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                    <input
                      type='text'
                      placeholder='e.g. iPhone 16 Pro'
                      className='w-full bg-[#0a0c10] border border-gray-800 text-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-gray-600'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Brand & Price Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-300'>Brand</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <UserCircle className="size-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                      </div>
                      <input
                        type='text'
                        placeholder='e.g. Apple'
                        className='w-full bg-[#0a0c10] border border-gray-800 text-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-gray-600'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-300'>Price (₹)</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <DollarSign className="size-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                      </div>
                      <input
                        type='number'
                        placeholder='e.g. 74999'
                        className='w-full bg-[#0a0c10] border border-gray-800 text-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-gray-600'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Category & Warranty Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-300'>Category</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Tag className="size-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                      </div>
                      <input
                        type='text'
                        placeholder='e.g. Mobile, Laptop'
                        className='w-full bg-[#0a0c10] border border-gray-800 text-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-gray-600'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-300'>Warranty Period</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <ShieldCheck className="size-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                      </div>
                      <input
                        type='text'
                        placeholder='e.g. 1 Year'
                        className='w-full bg-[#0a0c10] border border-gray-800 text-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-gray-600'
                        value={warrantyPeriod}
                        onChange={(e) => setWarrantyPeriod(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Stock & Rating Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-300'>Stock Status</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <PackageOpen className="size-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                      </div>
                      <select
                        className='w-full bg-[#0a0c10] border border-gray-800 text-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer'
                        value={inStock}
                        onChange={(e) => setInStock(e.target.value === 'true')}
                      >
                        <option value="true">In Stock</option>
                        <option value="false">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-300'>Rating (1-5)</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Star className="size-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                      </div>
                      <input
                        type='number'
                        min='1'
                        max='5'
                        step='0.1'
                        placeholder='e.g. 4.5'
                        className='w-full bg-[#0a0c10] border border-gray-800 text-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-gray-600'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-300'>Description</label>
                  <div className="relative group">
                    <div className="absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none">
                      <AlignLeft className="size-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                    <textarea
                      placeholder='Brief specifications of the product...'
                      className='w-full bg-[#0a0c10] border border-gray-800 text-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-gray-600 min-h-[100px] resize-y'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className='pt-6'>
                  <button
                    type='submit'
                    className='w-full flex justify-center items-center gap-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-400 hover:text-[#0a0c10] py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      <>
                        <Save className="size-5" />
                        Create Product
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;