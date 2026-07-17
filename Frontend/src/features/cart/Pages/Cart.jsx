import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCart } from "../hook/useCart";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiArrowLeft,
  FiShoppingBag,
  FiShield,
} from "react-icons/fi";
// import { Link } from 'react-router-dom';
import { Link } from "react-router";
import { updateQuantity, removeItem } from "../state/cart.slice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items) || [];
  const { handleGetcart, handleRemoveItemApi, handleIncrementCartItem,handleDecrementCartItem } =
    useCart();
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetcart();
  }, []);

  const handleQuantityChange = (id, newQuantity, stock) => {
    if (newQuantity >= 1 && newQuantity <= stock) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = async (id) => {
    dispatch(removeItem(id));
    try {
      await handleRemoveItemApi(id);
    } catch (error) {
      console.error("Failed to remove item from backend:", error);
      // Optionally, we could dispatch an action to revert the UI,
      // but typical optimistic UI just logs the error.
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price?.amount || 0) * (item.quantity || 1),
    0,
  );
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50/40 py-8 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 text-indigo-800">
            <FiShoppingBag strokeWidth={2.5} size={32} />
            <span className="text-3xl font-black tracking-[0.2em] uppercase mt-1">
              Cart
            </span>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <FiArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-[2rem] shadow-xl shadow-indigo-100/40 p-12 text-center border border-gray-100/60">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShoppingBag size={48} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8 font-medium">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-[2rem] shadow-xl shadow-indigo-100/40 overflow-hidden border border-gray-100/60 p-6 sm:p-8">
                <h2 className="text-xl font-black text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  Shopping Cart ({cartItems.length} Items)
                </h2>
                <div className="space-y-6">
                  {cartItems.map((item, idx) => {
                    const variant = item.product?.variants?.find(
                      (v) => v._id === item.variant,
                    );
                    const displayImage =
                      variant?.images?.[0]?.url ||
                      item.product?.images?.[0]?.url;
                    const title =
                      variant?.title ||
                      item.product?.title ||
                      "Unknown Product";
                    const attributes = variant?.attributes || {};
                    const stock = variant?.stock ?? item.product?.stock ?? 0;
                    const isOutOfStock = stock === 0;

                    return (
                      <div
                        key={item._id || idx}
                        className="flex gap-4 sm:gap-6 p-4 rounded-2xl border border-gray-100 hover:border-indigo-100 bg-gray-50/50 hover:bg-indigo-50/10 transition-colors group"
                      >
                        <div className="w-24 h-28 sm:w-32 sm:h-36 shrink-0 rounded-xl overflow-hidden bg-white border border-gray-200">
                          {displayImage ? (
                            <img
                              src={displayImage}
                              alt={title}
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                              <FiShoppingBag size={32} />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col flex-1 py-1">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
                                {title}
                              </h3>
                              {Object.keys(attributes).length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {Object.entries(attributes).map(([k, v]) => (
                                    <span
                                      key={k}
                                      className="text-[11px] font-bold uppercase tracking-wider text-gray-500 bg-white px-2 py-1.5 rounded border border-gray-200 shadow-sm"
                                    >
                                      {k}:{" "}
                                      <span className="text-gray-800">{v}</span>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-lg font-black text-gray-900">
                                {item.price?.currency === "INR"
                                  ? "₹"
                                  : item.price?.currency}
                                {item.price?.amount * item.quantity}
                              </div>
                              <div className="text-xs font-semibold text-gray-400 mt-1">
                                {item.price?.currency === "INR"
                                  ? "₹"
                                  : item.price?.currency}
                                {item.price?.amount} each
                              </div>
                            </div>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm ${isOutOfStock ? "opacity-50" : ""}`}
                              >
                                <button
                                  className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                  disabled={item.quantity <= 1 || isOutOfStock}
                                  onClick={() =>
                                    handleDecrementCartItem({
                                      productId: item.product._id,
                                      variantId: item.variant,
                                    })
                                  }
                                >
                                  <FiMinus size={14} strokeWidth={3} />
                                </button>
                                <span className="w-8 text-center text-sm font-bold text-gray-900">
                                  {item.quantity}
                                </span>
                                <button
                                  className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                  disabled={
                                    item.quantity >= stock || isOutOfStock
                                  }
                                  onClick={() => {
                                    handleIncrementCartItem({
                                      productId: item.product._id,
                                      variantId: item.variant,
                                    });
                                  }}
                                >
                                  <FiPlus size={14} strokeWidth={3} />
                                </button>
                              </div>
                              {isOutOfStock && (
                                <span className="text-xs font-bold text-red-500">
                                  Out of Stock
                                </span>
                              )}
                            </div>
                            <button
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-semibold"
                              onClick={() => handleRemoveItem(item._id)}
                            >
                              <FiTrash2 size={16} strokeWidth={2.5} />{" "}
                              <span className="hidden sm:inline">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-[2rem] shadow-xl shadow-indigo-100/40 border border-gray-100/60 p-6 sm:p-8 sticky top-8">
                <h2 className="text-xl font-black text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 text-sm font-medium text-gray-600">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="text-gray-900 font-bold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Shipping estimate</span>
                    <span className="text-gray-900 font-bold">₹{shipping}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tax estimate</span>
                    <span className="text-green-600 font-bold">Included</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900">
                      Order Total
                    </span>
                    <span className="text-2xl font-black text-gray-900">
                      ₹{total}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 active:translate-y-0">
                  Checkout
                </button>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
                  <FiShield size={16} />
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
