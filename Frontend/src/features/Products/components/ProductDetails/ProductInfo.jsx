import React from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiShare2, FiStar } from 'react-icons/fi';
import { BsLightningFill } from 'react-icons/bs';

const ProductInfo = ({
    brand,
    title,
    category,
    displayPrice,
    displayStock,
    attributeKeys,
    availableAttributes,
    selectedAttributes,
    handleAttributeSelect,
    checkIsValidOption,
    handleaddItem,
    productId,
    selectedVariant
}) => {
    return (
        <div className="flex flex-col">
            {/* Header: Brand, Title, Category */}
            <div className="mb-6">
                <h2 className="text-[14px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-2">{brand}</h2>
                <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 leading-snug mb-3 tracking-tight">{title}</h1>
                <div className="flex items-center gap-4 text-sm">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">{category}</span>
                    <div className="flex items-center text-yellow-500">
                        <FiStar className="fill-current" />
                        <FiStar className="fill-current" />
                        <FiStar className="fill-current" />
                        <FiStar className="fill-current" />
                        <FiStar className="text-gray-300 fill-current" />
                        <span className="text-gray-500 ml-2 font-medium">(128 Reviews)</span>
                    </div>
                </div>
            </div>

            {/* Price & Stock */}
            <div className="mb-8">
                <div className="flex items-end gap-3 mb-2">
                    <span className="text-4xl font-bold text-gray-900 tracking-tight">
                        {displayPrice.currency === 'INR' ? '₹' : displayPrice.currency}{displayPrice.amount}
                    </span>
                    <span className="text-xl text-gray-400 line-through mb-1 font-medium">
                        ₹{Math.round((displayPrice.amount || 0) * 1.5)}
                    </span>
                    <span className="text-xs font-bold text-green-700 mb-1.5 px-2 py-1 bg-green-100 rounded-md tracking-wider">
                        33% OFF
                    </span>
                </div>
                <p className="text-xs text-gray-500 font-medium">Inclusive of all taxes</p>
                
                <div className="mt-4">
                    {displayStock !== 0 ? (
                        <span className="text-sm font-semibold text-green-600 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                            {displayStock > 0 ? `${displayStock} in stock` : 'In Stock'}
                        </span>
                    ) : (
                        <span className="text-sm font-semibold text-red-600 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                            Out of Stock
                        </span>
                    )}
                </div>
            </div>

            <hr className="border-gray-200 mb-8" />

            {/* Attributes Selection (Size, Color, etc.) */}
            {attributeKeys?.length > 0 && (
                <div className="mb-8 flex flex-col gap-6">
                    {attributeKeys.map(attrName => (
                        <div key={attrName}>
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                                    {attrName}: <span className="text-indigo-600 font-medium ml-1">{selectedAttributes[attrName]}</span>
                                </h3>
                                {attrName.toLowerCase() === 'size' && (
                                    <button className="text-xs font-semibold text-indigo-600 hover:underline">Size Guide</button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {availableAttributes[attrName].map(val => {
                                    const isSelected = selectedAttributes[attrName] === val;
                                    const isValid = checkIsValidOption(attrName, val);
                                    return (
                                        <button
                                            key={val}
                                            onClick={() => handleAttributeSelect(attrName, val)}
                                            disabled={!isValid}
                                            className={`
                                                relative px-5 py-2.5 rounded-[12px] text-sm font-semibold transition-all duration-200 border
                                                ${isSelected 
                                                    ? 'bg-gray-900 text-white border-gray-900 shadow-md ring-2 ring-gray-900 ring-offset-2' 
                                                    : isValid 
                                                        ? 'bg-white text-gray-700 border-gray-300 hover:border-gray-900 hover:text-gray-900' 
                                                        : 'bg-gray-50 text-gray-400 border-gray-200 opacity-50 cursor-not-allowed'}
                                            `}
                                        >
                                            {val}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 mt-4">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-900 border-2 border-gray-900 px-6 py-4 rounded-[16px] font-bold text-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={displayStock === 0 || (attributeKeys.length > 0 && !selectedVariant)}
                    onClick={() => {
                        if (selectedVariant || attributeKeys.length === 0) {
                            handleaddItem({
                                productId: productId,
                                variantId: selectedVariant?._id
                            });
                        }
                    }}
                >
                    <FiShoppingCart size={20} strokeWidth={2.5} /> Add to Bag
                </motion.button>
                
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-4 rounded-[16px] font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={displayStock === 0 || (attributeKeys.length > 0 && !selectedVariant)}
                >
                    <BsLightningFill size={20} /> Buy Now
                </motion.button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-4 mb-10">
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-red-500 transition-colors">
                    <FiHeart size={18} /> Add to Wishlist
                </button>
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors ml-4">
                    <FiShare2 size={18} /> Share
                </button>
            </div>
            
            {/* Badges / Trust marks */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2.5 rounded-full text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-600 uppercase">Secure Payment</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2.5 rounded-full text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-600 uppercase">15 Days Return</span>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
