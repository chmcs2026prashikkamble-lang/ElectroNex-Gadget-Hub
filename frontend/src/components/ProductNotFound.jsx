import { NotebookIcon } from 'lucide-react'
import { Link } from 'react-router'
import React from 'react'

const ProductNotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center py-16 space-y-6 max-wd mx-auto text-center'>
            <div className='bg-primary/10 rounded-full p-8'>
                <NotebookIcon className='size-10 text-primary' />
            </div>
            <h3 className='text-2xl font-bold'> No products yet</h3>
            <p className='text-base-content/70'>
                Ready to add products? Add first product to the Electronic Gadget Store
            </p>
            <Link to='/create' className='btn btn-primary'>
                Add First Product
            </Link>
        </div>
    )
}

export default ProductNotFound