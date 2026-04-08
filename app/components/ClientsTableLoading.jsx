import React from 'react';
import { motion } from 'framer-motion';

function ClientsTableLoading() {
  const skeletonRows = Array(5).fill(0);

  return (
    <motion.div
      className='bg-primary backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 border border-border-primary mx-2 sm:mx-0 mb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0'>
        <div className='w-32 h-6 skeltoin rounded'></div>
        <div className='relative w-full sm:w-auto'>
          <div className='w-full sm:w-64 h-10 skeltoin rounded-lg'></div>
        </div>
      </div>
      
      {/* Table */}
      <div className='relative h-100 overflow-auto'>
        <table className='min-w-full'>
          <thead className="sticky -top-px z-20 bg-primary sm:border-b border-gray-700">
            <tr>
              {['Name', 'Email', 'Phone Number', 'City', 'Actions'].map((header) => (
                <th key={header} className='px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell'>
                  <div className='h-4 skeltoin rounded w-16'></div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-700'>
            {skeletonRows.map((_, index) => (
              <tr
                key={index}
                className='flex flex-col sm:table-row mb-4 sm:mb-0 border-b sm:border-b-0 border-gray-700 sm:border-none p-2 sm:p-0'
              >
                {/* ===== Mobile View ===== */}
                <td className='sm:hidden px-3 py-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <div className='w-9 h-9 skeltoin rounded-full'></div>
                      <div className='ml-3 space-y-2'>
                        <div className='w-24 h-4 skeltoin rounded'></div>
                        <div className='w-32 h-3 skeltoin rounded'></div>
                      </div>
                    </div>
                    <div className='flex space-x-1 -mt-5 -mr-4'>
                      <div className='w-4 h-4 skeltoin rounded'></div>
                      <div className='w-4 h-4 skeltoin rounded'></div>
                    </div>
                  </div>

                  <div className='mt-3 space-y-2'>
                    <div className='w-3/4 h-3 skeltoin rounded'></div>
                    <div className='w-1/2 h-3 skeltoin rounded'></div>
                  </div>
                </td>

                {/* ===== Desktop View ===== */}
                <td className='hidden sm:table-cell px-6 py-4 whitespace-nowrap border-b border-gray-700'>
                  <div className='flex items-center'>
                    <div className='w-10 h-10 skeltoin rounded-full'></div>
                    <div className='ml-4'>
                      <div className='w-24 h-4 skeltoin rounded'></div>
                    </div>
                  </div>
                </td>
                
                {['email', 'phone', 'city'].map((field) => (
                  <td key={field} className='hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm border-b border-gray-700'>
                     <div className='w-20 h-4 skeltoin rounded'></div>
                  </td>
                ))}

                <td className='hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm border-b border-gray-700'>
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

export default ClientsTableLoading;
