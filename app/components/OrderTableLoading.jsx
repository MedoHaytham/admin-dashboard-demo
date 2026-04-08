import React from 'react';
import { motion } from 'framer-motion';

function OrderTableLoading() {
  const skeletonRows = Array(5).fill(0);

  return (
    <motion.div
      className='bg-primary backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-border-primary mx-2 md:mx-0 mb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0'>
        <div className='w-32 h-6 skeltoin rounded'></div>
        <div className='relative w-full md:w-auto'>
          <div className='w-full md:w-64 h-10 skeltoin rounded-lg'></div>
        </div>
      </div>
      <div className='relative h-100 overflow-auto'>
        <table className='min-w-full'>
          <thead className="sticky -top-px z-20 bg-primary md:border-b border-gray-700">
            <tr>
              {[
                'Order ID',
                'Client',
                'Total',
                'Status',
                'Date',
                'City',
                'Actions',
              ].map((header) => (
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
                {/* Mobile View */}
                <td className='md:hidden px-3 py-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex flex-col space-y-2'>
                      <div className='w-16 h-4 skeltoin rounded'></div>
                      <div className='w-32 h-3 skeltoin rounded'></div>
                      <div className='w-40 h-3 skeltoin rounded'></div>
                    </div>
                    <div className='flex space-x-1 -mt-1 -mr-1'>
                      <div className='w-4 h-4 skeltoin rounded'></div>
                      <div className='w-4 h-4 skeltoin rounded'></div>
                    </div>
                  </div>
                  <div className='mt-3 space-y-2 text-xs'>
                    <div className='w-24 h-4 skeltoin rounded'></div>
                    <div className='w-20 h-5 skeltoin rounded-full'></div>
                    <div className='w-32 h-4 skeltoin rounded'></div>
                    <div className='w-24 h-4 skeltoin rounded'></div>
                  </div>
                </td>
                
                {/* Desktop View */}
                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm border-b border-gray-700'>
                  <div className='w-16 h-4 skeltoin rounded'></div>
                </td>
                <td className='hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm border-b border-gray-700'>
                  <div className='flex flex-col space-y-2'>
                    <div className='w-32 h-4 skeltoin rounded'></div>
                    <div className='w-40 h-3 skeltoin rounded'></div>
                  </div>
                </td>
                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm border-b border-gray-700'>
                  <div className='w-16 h-4 skeltoin rounded'></div>
                </td>
                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm border-b border-gray-700'>
                  <div className='w-20 h-5 skeltoin rounded-full'></div>
                </td>
                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm border-b border-gray-700'>
                  <div className='w-24 h-4 skeltoin rounded'></div>
                </td>
                <td className='hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm border-b border-gray-700'>
                  <div className='w-20 h-4 skeltoin rounded'></div>
                </td>
                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm border-b border-gray-700'>
                  <div className='flex space-x-1 -ml-2'>
                    <div className='w-4 h-4 skeltoin rounded mr-2'></div>
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

export default OrderTableLoading;
