import React from 'react';
import { motion } from 'framer-motion';

const MOCK_PRODUCTS = [
    {
        id: 1,
        title: "Men Premium Slim Fit Shirt",
        price: "₹899",
        image: "https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=500&q=80"
    },
    {
        id: 2,
        title: "Casual Denim Jacket",
        price: "₹1,499",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80"
    },
    {
        id: 3,
        title: "Classic White Sneakers",
        price: "₹2,199",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80"
    },
    {
        id: 4,
        title: "Essential Basic Tee",
        price: "₹499",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80"
    }
];

const ProductCard = ({ product }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="group cursor-pointer flex flex-col"
    >
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 mb-4">
            <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300"></div>
        </div>
        <h4 className="text-sm font-semibold text-gray-900 truncate">{product.title}</h4>
        <span className="text-sm text-gray-500 font-medium">{product.price}</span>
    </motion.div>
);

const RelatedProducts = () => {
    return (
        <div className="w-full mt-24 max-w-7xl mx-auto border-t border-gray-200 pt-16">
            <div className="mb-16">
                <div className="flex items-end justify-between mb-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">You May Also Like</h2>
                    <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest">
                        View All
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {MOCK_PRODUCTS.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            <div className="mb-16">
                <div className="flex items-end justify-between mb-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Recently Viewed</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {MOCK_PRODUCTS.slice().reverse().map(product => (
                        <ProductCard key={`recent-${product.id}`} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;
