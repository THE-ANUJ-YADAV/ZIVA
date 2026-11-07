import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlistApi,
  removeFromWishlistApi,
} from "../../../wishlist/service/wishlist.api";
import {
  addWishlistItem,
  removeWishlistItem,
} from "../../../wishlist/state/wishlist.slice";
import { FiShoppingCart, FiHeart, FiShare2, FiStar } from "react-icons/fi";
import { BsLightningFill } from "react-icons/bs";

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
  selectedVariant,
}) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  // Check if current product is in the wishlist
  const isWishlisted = wishlistItems.some((item) => {
    const id = item.product?._id || item.product;
    return id === productId;
  });

  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const handleWishlistToggle = async () => {
    if (isWishlistLoading) return;
    setIsWishlistLoading(true);
    try {
      if (isWishlisted) {
        await removeFromWishlistApi(productId);
        dispatch(removeWishlistItem(productId));
      } else {
        await addToWishlistApi(productId);
        dispatch(addWishlistItem({ product: productId }));
      }
    } catch (error) {
      console.error("Failed to toggle wishlist", error);
    } finally {
      setIsWishlistLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header: Brand, Title, Category */}
      <div className="mb-6">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-[0.2em] mb-2 block">
          {brand}
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 leading-tight mb-3 tracking-tight">
          {title}
        </h1>
        <div className="flex items-center gap-3 text-xs">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-semibold uppercase tracking-wider text-[11px]">
            {category}
          </span>
          <div className="flex items-center text-amber-400">
            <FiStar className="fill-current w-3.5 h-3.5" />
            <FiStar className="fill-current w-3.5 h-3.5" />
            <FiStar className="fill-current w-3.5 h-3.5" />
            <FiStar className="fill-current w-3.5 h-3.5" />
            <FiStar className="text-gray-200 fill-current w-3.5 h-3.5" />
            <span className="text-gray-500 ml-1.5 font-medium">
              (128 Verified Reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Price & Stock */}
      <div className="mb-6">
        <div className="flex items-baseline gap-3 mb-1.5">
          <span className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
            {displayPrice.currency === "INR" ? "₹" : displayPrice.currency}
            {displayPrice.amount?.toLocaleString()}
          </span>
          <span className="text-lg text-gray-400 line-through font-normal">
            ₹{Math.round((displayPrice.amount || 0) * 1.5).toLocaleString()}
          </span>
          <span className="text-xs font-bold text-emerald-700 px-2 py-0.5 bg-emerald-50 rounded-md tracking-wider">
            33% OFF
          </span>
        </div>
        <p className="text-xs text-gray-400 font-medium">
          Inclusive of all taxes & duty charges
        </p>

        <div className="mt-3">
          {displayStock !== 0 ? (
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              {displayStock > 0 ? `${displayStock} units available` : "In Stock - Ready to Dispatch"}
            </span>
          ) : (
            <span className="text-xs font-semibold text-rose-600 flex items-center">
              <span className="w-2 h-2 rounded-full bg-rose-500 mr-2"></span>
              Out of Stock
            </span>
          )}
        </div>
      </div>

      <hr className="border-gray-200/80 mb-6" />

      {/* Attributes Selection (Size, Color, etc.) */}
      {attributeKeys?.length > 0 && (
        <div className="mb-8 flex flex-col gap-6">
          {attributeKeys.map((attrName) => (
            <div key={attrName}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                  {attrName}:{" "}
                  <span className="text-indigo-600 font-medium ml-1">
                    {selectedAttributes[attrName]}
                  </span>
                </h3>
                {attrName.toLowerCase() === "size" && (
                  <button className="text-xs font-semibold text-indigo-600 hover:underline">
                    Size Guide
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {availableAttributes[attrName].map((val) => {
                  const isSelected = selectedAttributes[attrName] === val;
                  const isValid = checkIsValidOption(attrName, val);
                  return (
                    <button
                      key={val}
                      onClick={() => handleAttributeSelect(attrName, val)}
                      disabled={!isValid}
                      className={`
                                                relative px-5 py-2.5 rounded-[12px] text-sm font-semibold transition-all duration-200 border
                                                ${
                                                  isSelected
                                                    ? "bg-gray-900 text-white border-gray-900 shadow-md ring-2 ring-gray-900 ring-offset-2"
                                                    : isValid
                                                      ? "bg-white text-gray-700 border-gray-300 hover:border-gray-900 hover:text-gray-900"
                                                      : "bg-gray-50 text-gray-400 border-gray-200 opacity-50 cursor-not-allowed"
                                                }
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
      <div className="flex flex-col sm:flex-row gap-3.5 mb-6 mt-4">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-900 border-2 border-gray-900 px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
          disabled={
            displayStock === 0 || (attributeKeys.length > 0 && !selectedVariant)
          }
          onClick={() => {
            if (selectedVariant || attributeKeys.length === 0) {
              handleaddItem({
                productId: productId,
                variantId: selectedVariant?._id,
              });
            }
          }}
        >
          <FiShoppingCart size={18} strokeWidth={2.5} /> Add to Bag
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          disabled={
            displayStock === 0 || (attributeKeys.length > 0 && !selectedVariant)
          }
        >
          <BsLightningFill size={18} /> Instant Checkout
        </motion.button>
      </div>

      {/* Secondary Actions */}
      <div className="flex items-center gap-6 mb-8 pt-2">
        <button
          onClick={handleWishlistToggle}
          disabled={isWishlistLoading}
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${
            isWishlisted
              ? "text-rose-600 hover:text-rose-700"
              : "text-gray-600 hover:text-rose-600"
          }`}
        >
          <FiHeart
            size={16}
            className={isWishlisted ? "fill-current text-rose-600" : ""}
          />
          {isWishlisted ? "In Wishlist" : "Save to Wishlist"}
        </button>
        <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-indigo-600 transition-colors">
          <FiShare2 size={16} /> Share Style
        </button>
      </div>

      {/* Badges / Trust marks */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2.5 rounded-full text-gray-700">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <span className="text-xs font-semibold text-gray-600 uppercase">
            Secure Payment
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2.5 rounded-full text-gray-700">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <span className="text-xs font-semibold text-gray-600 uppercase">
            15 Days Return
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
