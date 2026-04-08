import React from 'react';
import { motion } from 'framer-motion';

function ProductsTableLoading() {
  const skeletonRows = Array(5).fill(0);

  return (
    <motion.div
      className='bg-primary backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-border-primary mx-2 md:mx-0 mb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {/* Header */}
      <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0'>
        <div className='w-32 h-6 skeltoin rounded'></div>
        <div className='flex flex-col-reverse md:flex-row items-center gap-5 w-full md:w-auto'>
          <div className='w-full md:w-32 h-10 skeltoin rounded-lg'></div>
          <div className='w-full md:w-64 h-10 skeltoin rounded-lg'></div>
        </div>
      </div>
      
      {/* Table */}
      <div className='relative h-100 overflow-auto'>
        <table className='min-w-full'>
          <thead className="sticky -top-px z-20 bg-primary md:border-b border-gray-700">
            <tr>
              {['Image', 'Product ID', 'Title', 'Category', 'Price', 'Stock', 'Actions'].map((header) => (
                <th key={header} className='px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell'>
                  <div className='h-4 skeltoin rounded w-16'></div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-700'>
            {skeletonRows.map((_, index) => (
              <tr
                key={index}
                className='flex flex-col md:table-row mb-4 md:mb-0 border-b md:border-b-0 border-gray-700 md:border-none p-2 md:p-0'
              >
                {/* ===== Mobile View ===== */}
                <td className='md:hidden px-3 py-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-full skeltoin'></div>
                      <div className='space-y-2'>
                        <div className='w-24 h-4 skeltoin rounded'></div>
                        <div className='w-12 h-3 skeltoin rounded'></div>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-4 h-4 skeltoin rounded'></div>
                      <div className='w-4 h-4 skeltoin rounded'></div>
                    </div>
                  </div>

                  <div className='mt-2 space-y-2'>
                    <div className='w-full h-3 skeltoin rounded'></div>
                    <div className='w-3/4 h-3 skeltoin rounded'></div>
                    <div className='w-1/2 h-3 skeltoin rounded'></div>
                    <div className='w-1/4 h-3 skeltoin rounded'></div>
                  </div>
                </td>

                {/* ===== Desktop View ===== */}
                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap border-b border-gray-700'>
                  <div className='w-12 h-12 rounded-full skeltoin p-1'></div>
                </td>
                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap border-b border-gray-700'>
                  <div className='w-8 h-4 skeltoin rounded'></div>
                </td>

                {['title', 'category', 'price', 'stock'].map((field) => (
                  <td key={field} className='hidden md:table-cell px-6 py-4 whitespace-nowrap border-b border-gray-700'>
                    <div className='w-20 h-4 skeltoin rounded'></div>
                  </td>
                ))}

                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap border-b border-gray-700'>
                  <div className='flex items-center gap-3'>
                    <div className='w-4 h-4 skeltoin rounded'></div>
                    <div className='w-4 h-4 skeltoin rounded'></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default ProductsTableLoading;
