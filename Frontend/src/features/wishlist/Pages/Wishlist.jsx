import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { getWishlistApi, removeFromWishlistApi } from '../service/wishlist.api';
import { setWishlistItems, removeWishlistItem } from '../state/wishlist.slice';
import { FiTrash2, FiShoppingCart, FiHeart, FiArrowLeft } from 'react-icons/fi';
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
            const variantId = product.variants?.length > 0 ? product.variants[0]._id : "null";
            const data = await handleaddItem({ productId: product._id, variantId: variantId !== "null" ? variantId : undefined });
            if (data && data.success) {
                await handleRemove(e, product._id);
            }
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 block mb-1">Saved Items</span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight flex items-center gap-2.5">
                        <FiHeart className="text-rose-500 w-6 h-6 fill-rose-500/10" />
                        <span>My Wishlist</span>
                        {wishlistItems.length > 0 && (
                            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                                {wishlistItems.length}
                            </span>
                        )}
                    </h1>
                </div>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-indigo-600 transition-colors bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-2xs hover:border-gray-300"
                >
                    <FiArrowLeft size={14} /> Back to Store
                </Link>
            </div>

            {wishlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-4 bg-gray-50/70 rounded-3xl border border-gray-100 text-center max-w-md mx-auto my-12">
                    <div className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
                        <FiHeart size={36} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-950 mb-2">Your wishlist is empty</h2>
                    <p className="text-xs text-gray-500 mb-6 leading-relaxed max-w-xs">
                        Save your favorite items here to track seasonal drops and availability.
                    </p>
                    <Link 
                        to="/" 
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5"
                    >
                        Explore Trending Pieces
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlistItems.map((item) => {
                        const product = item.product;
                        if (!product) return null;
                        
                        return (
                            <motion.div 
                                key={product._id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onClick={() => navigate(`/product/${product._id}`)}
                                className="bg-white rounded-2xl p-4 shadow-2xs border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer group"
                            >
                                <div className="relative aspect-[3/4] bg-gray-50 rounded-xl overflow-hidden mb-4 border border-gray-100">
                                    <img 
                                        src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop'} 
                                        alt={product.title}
                                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                    <button 
                                        onClick={(e) => handleRemove(e, product._id)}
                                        className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-md p-2 rounded-full text-rose-500 hover:bg-rose-50 transition-colors shadow-xs z-10"
                                        title="Remove from wishlist"
                                    >
                                        <FiTrash2 size={15} />
                                    </button>
                                </div>
                                
                                <div className="flex-1 flex flex-col">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-0.5">
                                        {product.brand || "ZIVA Atelier"}
                                    </span>
                                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors text-sm line-clamp-1 mb-2">
                                        {product.title}
                                    </h3>
                                    
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="font-extrabold text-base text-gray-950">
                                            {product.price?.currency === 'INR' ? '₹' : product.price?.currency}
                                            {product.price?.amount?.toLocaleString()}
                                        </span>
                                    </div>
                                    
                                    <div className="mt-auto pt-3 border-t border-gray-100">
                                        <button 
                                            onClick={(e) => handleAddToCart(e, product)}
                                            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-indigo-600 transition-colors z-10 relative shadow-2xs"
                                        >
                                            <FiShoppingCart size={14} /> Move to Bag
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
