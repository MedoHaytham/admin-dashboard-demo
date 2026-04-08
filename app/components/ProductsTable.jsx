"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion';
import { Edit, Save, Search, Trash2 } from 'lucide-react';
import { GoPlus } from "react-icons/go";
import { toast } from 'react-toastify';
import Image from 'next/image';
import AddProductForm from './addProductFrom';

const categories = [
  { id: 1, name: "Beauty", slug: "beauty" },
  { id: 2, name: "Fragrances", slug: "fragrances" },
  { id: 3, name: "Furniture", slug: "furniture" },
  { id: 4, name: "Groceries", slug: "groceries" },
  { id: 5, name: "Home Decoration", slug: "home-decoration" },
  { id: 6, name: "Kitchen Accessories", slug: "kitchen-accessories" },
  { id: 7, name: "Laptops", slug: "laptops" },
  { id: 8, name: "Mens Shirts", slug: "mens-shirts" },
  { id: 9, name: "Mens Shoes", slug: "mens-shoes" },
  { id: 10, name: "Mens Watches", slug: "mens-watches" },
  { id: 11, name: "Mobile Accessories", slug: "mobile-accessories" },
  { id: 12, name: "Motorcycle", slug: "motorcycle" },
  { id: 13, name: "Skin Care", slug: "skin-care" },
  { id: 14, name: "Smartphones", slug: "smartphones" },
  { id: 15, name: "Sports Accessories", slug: "sports-accessories" },
  { id: 16, name: "Sunglasses", slug: "sunglasses" },
  { id: 17, name: "Tablets", slug: "tablets" },
  { id: 18, name: "Tops", slug: "tops" },
  { id: 19, name: "Vehicle", slug: "vehicle" },
  { id: 20, name: "Womens Bags", slug: "womens-bags" },
  { id: 21, name: "Womens Dresses", slug: "womens-dresses" },
  { id: 22, name: "Womens Jewellery", slug: "womens-jewellery" },
  { id: 23, name: "Womens Shoes", slug: "womens-shoes" },
  { id: 24, name: "Womens Watches", slug: "womens-watches" },
];

function ProductsTable() {
  const [productsData, setProductsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [editingRow, setEditingRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedTerm(searchTerm.trim()), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    const term = debouncedTerm.toLowerCase();
    if (!term) return productsData;
    return productsData.filter((product) => {
      const titleMatch = product.title?.toLowerCase().includes(term);
      const categoryMatch = product.category?.toLowerCase().includes(term);
      return titleMatch || categoryMatch;
    });
  }, [debouncedTerm, productsData]);

  const saveClickHandler = () => setEditingRow(null);

  const changeHandler = (id, field, value) => {
    const numericFields = ['price', 'stock'];
    if (numericFields.includes(field) && !/^\d*\.?\d*$/.test(value)) return;

    setProductsData((prevs) =>
      prevs.map((product) =>
        product.id === id
          ? { ...product, [field]: numericFields.includes(field) ? Number(value) : value }
          : product
      )
    );
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are You Sure You Want To Delete This Product?')) {
      setProductsData((prevs) => prevs.filter((product) => product.id !== id));
    }
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://dummyjson.com/products?sortBy=stock&order=asc&limit=194');
        const data = await response.json();
        setProductsData(data.products);
      } catch (error) {
        toast.error('Error fetching products: ' + error);
      }
    }
    fetchProducts();
  }, []);

  const CategorySelect = ({ product }) => (
    <select
      value={product.category}
      onChange={(e) => changeHandler(product.id, 'category', e.target.value)}
      className='bg-secondary text-text-theme border border-gray-500 rounded px-1 py-0.5 text-xs outline-none'
    >
      {categories.map((cat) => (
        <option key={cat.id} value={cat.slug}>{cat.name}</option>
      ))}
    </select>
  );

  return (
    <>
      {/* Add Product Modal */}
      {showAddModal && (
        <AddProductForm
          categories={categories}
          onClose={() => setShowAddModal(false)}
        />
      )}
      <motion.div
        className='bg-primary backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-border-primary mx-2 md:mx-0 mb-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Header */}
        <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0'>
          <h2 className='text-lg md:text-xl font-semibold text-text-secondary text-center md:text-left'>
            Products List
          </h2>
          <div className='flex flex-col-reverse md:flex-row items-center gap-5'>
            <button
              onClick={() => setShowAddModal(true)}
              className='flex items-center gap-2 bg-primary text-text-theme border border-gray-700 rounded-lg px-4 py-2 hover:bg-secondary hover:text-text-primary transition-colors text-sm'
            >
              <GoPlus size={20} className='text-text-theme' />
              Add Product
            </button>
            <div className='relative w-full md:w-auto'>
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                type="text"
                placeholder='Search Products...'
                className='bg-secondary text-text-theme placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm'
              />
              <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
            </div>
          </div>
        </div>
        {/* Table */}
        <div className='relative h-100 overflow-auto'>
          <table className='min-w-full'>
            <thead className="sticky -top-px z-20 bg-primary md:border-b border-gray-700">
              <tr>
                {['Image', 'Product ID', 'Title', 'Category', 'Price', 'Stock', 'Actions'].map((header) => (
                  <th key={header} className='px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell'>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-700'>
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className={`flex flex-col md:table-row mb-4 md:mb-0 border-b md:border-b-0 border-gray-700 md:border-none p-2 md:p-0 ${editingRow === product.id ? 'bg-secondary ring-gray-500' : ''}`}
                >
                  {/* ===== Mobile View ===== */}
                  <td className='md:hidden px-3 py-2'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <Image
                          src={product.images?.[0] || '/placeholder.jpg'}
                          alt={product.title}
                          width={36} height={36}
                          className='w-10 h-10 rounded-full object-cover bg-bg-theme'
                        />
                        <div>
                          <div className='text-sm font-medium text-text-secondary line-clamp-1'>{product.title}</div>
                          <div className='text-xs text-text-primary'>ID: {product.id}</div>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <button
                          className='text-indigo-500 hover:text-indigo-300'
                          onClick={() => editingRow === product.id ? saveClickHandler() : setEditingRow(product.id)}
                        >
                          {editingRow === product.id ? <Save size={16} /> : <Edit size={16} />}
                        </button>
                        <button className='text-red-500 hover:text-red-300' onClick={() => deleteHandler(product.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className='mt-2 text-xs text-text-primary space-y-1'>
                      <div className='capitalize'>
                        <span>Title: </span>
                        {editingRow === product.id
                          ? <input className='bg-transparent text-text-theme border border-gray-400 w-32 text-xs ml-1 px-1'
                              type="text" value={product.title}
                              onChange={(e) => changeHandler(product.id, 'title', e.target.value)} />
                          : product.title}
                      </div>
                      <div>
                        <span>Category: </span>
                        {editingRow === product.id
                          ? <CategorySelect product={product} />
                          : product.category}
                      </div>
                      <div>
                        <span>Price: </span>
                        {editingRow === product.id
                          ? <input className='bg-transparent text-text-theme border border-gray-400 w-16 text-center text-xs ml-1'
                              type="text" value={product.price}
                              onChange={(e) => changeHandler(product.id, 'price', e.target.value)} />
                          : `$${product.price?.toFixed(2)}`}
                      </div>
                      <div>
                        <span>Stock: </span>
                        {editingRow === product.id
                          ? <input className='bg-transparent text-text-theme border border-gray-400 w-16 text-center text-xs ml-1'
                              type="text" value={product.stock}
                              onChange={(e) => changeHandler(product.id, 'stock', e.target.value)} />
                          : product.stock}
                      </div>
                    </div>
                  </td>

                  {/* ===== Desktop View ===== */}
                  <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap border-b border-gray-700'>
                    <Image
                      src={product.images?.[0] || '/placeholder.jpg'}
                      alt={product.title}
                      width={40} height={40}
                      className='w-12 h-12 rounded-full object-cover bg-bg-theme p-1'
                    />
                  </td>
                  <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-text-primary border-b border-gray-700'>
                    {product.id}
                  </td>

                  {['title', 'category', 'price', 'stock'].map((field) => (
                    <td
                      key={field}
                      className={`hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-text-primary max-w-[200px] truncate
                        ${editingRow === product.id ? 'border-x border-gray-400' : 'border-b border-gray-700'}`}
                    >
                      {editingRow === product.id ? (
                        field === 'category' ? (
                          <CategorySelect product={product} />
                        ) : (
                          <input
                            type="text"
                            value={product[field]}
                            onChange={(e) => changeHandler(product.id, field, e.target.value)}
                            className='bg-transparent text-text-theme w-full border-none outline-none'
                          />
                        )
                      ) : (
                        field === 'price' ? `$${product[field]?.toFixed(2)}` : product[field]
                      )}
                    </td>
                  ))}

                  <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm border-b border-gray-700'>
                    <div className='flex items-center gap-3'>
                      <button
                        className='text-indigo-500 hover:text-indigo-300'
                        onClick={() => editingRow === product.id ? saveClickHandler() : setEditingRow(product.id)}
                      >
                        {editingRow === product.id ? <Save size={18} /> : <Edit size={18} />}
                      </button>
                      <button className='text-red-500 hover:text-red-300' onClick={() => deleteHandler(product.id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
}

export default ProductsTable;