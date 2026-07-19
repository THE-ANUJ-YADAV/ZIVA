import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { getWishlistApi, removeFromWishlistApi } from '../service/wishlist.api';
import { setWishlistItems, removeWishlistItem } from '../state/wishlist.slice';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useCart } from '../../cart/hook/useCart';

const Wishlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleaddItem } = useCart();
    const [loading, setLoading] = useState(true);
    const wishlistItems = useSelector((state) => state.wishlist.items);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await getWishlistApi();
                if (response.success) {
                    dispatch(setWishlistItems(response.wishlist.items));
                }
            } catch (error) {
                console.error("Failed to fetch wishlist:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [dispatch]);

    const handleRemove = async (e, productId) => {
        e.stopPropagation();
        try {
            await removeFromWishlistApi(productId);
            dispatch(removeWishlistItem(productId));
        } catch (error) {
            console.error("Failed to remove from wishlist:", error);
        }
    };

    const handleAddToCart = async (e, product) => {
        e.stopPropagation();
        try {
            // Pick the first variant or undefined if none
            const variantId = product.variants?.length > 0 ? product.variants[0]._id : "null";
            const data = await handleaddItem({ productId: product._id, variantId: variantId !== "null" ? variantId : undefined });
            // Optionally remove from wishlist after adding to cart
            if (data && data.success) {
                await handleRemove(e, product._id);
            }
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen text-xl">Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">My Wishlist</h1>

            {wishlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl">
                    <div className="text-gray-400 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-500 mb-6">Explore our products and find something you love!</p>
                    <Link to="/" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlistItems.map((item) => {
                        const product = item.product;
                        if (!product) return null;
                        
                        return (
                            <motion.div 
                                key={product._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => navigate(`/product/${product._id}`)}
                                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
                            >
                                <div className="relative aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-4">
                                    <img 
                                        src={product.images?.[0]?.url || 'https://via.placeholder.com/300x400?text=Product'} 
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <button 
                                        onClick={(e) => handleRemove(e, product._id)}
                                        className="absolute top-3 right-3 bg-white/80 p-2 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors z-10"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                                
                                <div className="flex-1 flex flex-col">
                                    <h3 className="font-semibold text-gray-800 line-clamp-1 mb-1">{product.title}</h3>
                                    <p className="text-sm text-gray-500 mb-3">{product.brand}</p>
                                    
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="font-bold text-lg text-gray-900">
                                            {product.price?.currency === 'INR' ? '₹' : product.price?.currency}{product.price?.amount}
                                        </span>
                                    </div>
                                    
                                    <div className="mt-auto pt-3 border-t border-gray-100">
                                        <button 
                                            onClick={(e) => handleAddToCart(e, product)}
                                            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors z-10 relative"
                                        >
                                            <FiShoppingCart size={16} /> Move to Cart
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
