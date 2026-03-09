import api from '../lib/axios';
import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

const CreateProductPage = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [warrantyPeriod, setWarrantyPeriod] = useState('');
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
        warrantyPeriod
      });

      toast.success('Product created successfully!');
      navigate('/');
    } catch (error) {
      console.log("Error creating product", error);
      toast.error('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>

          <Link to='/' className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' /> Back to Products
          </Link>

          <div className='card bg-base-100 shadow-lg'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Product</h2>

              <form onSubmit={handleSubmit}>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Product Name :- </span>
                  </label>
                  <input
                    type='text'
                    placeholder='    e.g. iPhone 15'
                    className='input input-bordered'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Brand :- </span>
                  </label>
                  <input
                    type='text'
                    placeholder='    e.g. Apple'
                    className='input input-bordered'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Price :- </span>
                  </label>
                  <input
                    type='number'
                    placeholder='    e.g. 999'
                    className='input input-bordered'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Category :- </span>
                  </label>
                  <input
                    type='text'
                    placeholder='    e.g. Mobile, Laptop'
                    className='input input-bordered'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>

                <div className='form-control mb-6'>
                  <label className='label'>
                    <span className='label-text'>Warranty Period :- </span>
                  </label>
                  <input
                    type='text'
                    placeholder='    e.g. 1 Year'
                    className='input input-bordered'
                    value={warrantyPeriod}
                    onChange={(e) => setWarrantyPeriod(e.target.value)}
                    required
                  />
                </div>

                <div className='card-actions justify-end'>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Product"}
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