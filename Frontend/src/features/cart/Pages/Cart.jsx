import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRazorpay } from "react-razorpay";
import { useCart } from "../hook/useCart";
import { useNavigate } from "react-router";
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
  const totalPrice = useSelector((state) => state.cart.totalPrice) || 0;
  const currency = useSelector((state) => state.cart.currency) || "INR";
  const currencySymbol = currency === "INR" ? "₹" : currency;
  const { handleGetcart, handleRemoveItemApi, handleIncrementCartItem,handleDecrementCartItem,handleCreateCartOrder,handleVerifyCartOrder } =
    useCart();
  const dispatch = useDispatch();
  const { error, isLoading, Razorpay } = useRazorpay();
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate();

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

  async function handleCheckOut() {
    const Order = await handleCreateCartOrder();
    console.log(Order)

    const options =  {
      key: "rzp_test_THprxKidKcPYdm",
      amount: Order.order.amount, // Amount in paise
      currency: Order.order.currency,
      name: "ZIVA",
      description: "Test Transaction",
      order_id: Order.order.id,
       // Generate order_id on server
      handler: async(response) => {
       const isValid = await handleVerifyCartOrder(response)

       if(isValid){
        navigate(`/order-success?order_id=${response?.razorpay_order_id || ""}`)
       }

      },
      prefill: {
        name: user.fullname,
        email: user.email,
        contact: user.contact,
      },
      theme: {
        color: "#F37254",
      },

     
  }
  const rzp = new Razorpay(options);
  rzp.open();
  }
  const subtotal = Math.max(0, totalPrice);
  const total = subtotal;

  return (
    <div className="min-h-screen bg-[#FBFBFC] py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200/60">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 block mb-1">Your Bag</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight flex items-center gap-3">
              <FiShoppingBag className="w-7 h-7 text-indigo-600" />
              <span>Shopping Cart</span>
              {cartItems.length > 0 && (
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </span>
              )}
            </h1>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-indigo-600 transition-colors bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-xs hover:border-gray-300"
          >
            <FiArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-12 sm:p-16 text-center border border-gray-100 max-w-xl mx-auto my-12">
            <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
              <FiShoppingBag size={36} />
            </div>
            <h2 className="text-2xl font-bold text-gray-950 mb-2 tracking-tight">
              Your bag is empty
            </h2>
            <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
              Explore our trending collections and find something extraordinary for your wardrobe.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5"
            >
              Start Exploring
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-3xl shadow-xs border border-gray-200/70 p-6 sm:p-8">
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-gray-100">
                  <h2 className="text-base font-bold uppercase tracking-wider text-gray-900">
                    Items In Cart
                  </h2>
                  <span className="text-xs font-medium text-gray-400">
                    Standard delivery applies
                  </span>
                </div>

                <div className="space-y-6">
                  {cartItems.map((item, idx) => {
                    const variant = Array.isArray(item.product?.variants) 
                      ? item.product.variants.find((v) => v._id === item.variant)
                      : item.product?.variants;
                    const displayImage =
                      variant?.images?.[0]?.url ||
                      item.product?.images?.[0]?.url;
                    const title =
                      variant?.title ||
                      item.product?.title ||
                      "Unknown Product";
                    const itemPrice = item.price?.amount ? item.price : (variant?.price || item.product?.price || { amount: 0, currency: 'INR' });
                    const attributes = variant?.attributes || {};
                    const stock = variant?.stock ?? item.product?.stock ?? 0;
                    const isOutOfStock = stock === 0;

                    return (
                      <div
                        key={item._id || idx}
                        className="flex flex-col sm:flex-row gap-5 p-5 rounded-2xl border border-gray-100 hover:border-indigo-100/80 bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all duration-200 group"
                      >
                        {/* Properly sized and locked 3:4 image container */}
                        <div className="w-24 sm:w-28 aspect-[3/4] shrink-0 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-xs relative">
                          {displayImage ? (
                            <img
                              src={displayImage}
                              alt={title}
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                              <FiShoppingBag size={24} />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col flex-1">
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <div>
                              <h3 className="text-base font-semibold text-gray-950 leading-snug group-hover:text-indigo-600 transition-colors">
                                {title}
                              </h3>
                              {Object.keys(attributes).length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {Object.entries(attributes).map(([k, v]) => (
                                    <span
                                      key={k}
                                      className="text-[10px] font-bold uppercase tracking-wider text-gray-600 bg-white px-2 py-1 rounded-md border border-gray-200 shadow-xs"
                                    >
                                      {k}: <span className="text-gray-900">{v}</span>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="text-right shrink-0">
                              <div className="text-base sm:text-lg font-bold text-gray-950">
                                {itemPrice.currency === "INR"
                                  ? "₹"
                                  : itemPrice.currency}
                                {(itemPrice.amount * item.quantity).toLocaleString()}
                              </div>
                              <div className="text-xs font-medium text-gray-400 mt-0.5">
                                {itemPrice.currency === "INR"
                                  ? "₹"
                                  : itemPrice.currency}
                                {itemPrice.amount.toLocaleString()} each
                              </div>
                            </div>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100/80">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-xs ${isOutOfStock ? "opacity-50" : ""}`}
                              >
                                <button
                                  className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                  disabled={item.quantity <= 1 || isOutOfStock}
                                  onClick={() =>
                                    handleDecrementCartItem({
                                      productId: item.product._id,
                                      variantId: item.variant,
                                    })
                                  }
                                >
                                  <FiMinus size={13} strokeWidth={2.5} />
                                </button>
                                <span className="w-8 text-center text-xs font-bold text-gray-900">
                                  {item.quantity}
                                </span>
                                <button
                                  className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
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
                                  <FiPlus size={13} strokeWidth={2.5} />
                                </button>
                              </div>
                              {isOutOfStock && (
                                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                                  Out of Stock
                                </span>
                              )}
                            </div>

                            <button
                              className="text-gray-400 hover:text-rose-600 transition-colors flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-rose-50"
                              onClick={() => handleRemoveItem(item._id)}
                            >
                              <FiTrash2 size={15} />{" "}
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary Column */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-3xl shadow-xs border border-gray-200/70 p-6 sm:p-8 sticky top-28">
                <h2 className="text-base font-bold uppercase tracking-wider text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  Order Summary
                </h2>

                <div className="space-y-3.5 mb-6 text-sm text-gray-600">
                  <div className="flex justify-between items-center">
                    <span className="font-normal">Subtotal</span>
                    <span className="text-gray-950 font-semibold">{currencySymbol}{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-normal">Estimated Shipping</span>
                    <span className="text-emerald-600 font-semibold text-xs uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">Free</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-normal">Estimated Taxes</span>
                    <span className="text-gray-500 font-medium text-xs">Included in prices</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-bold uppercase tracking-wider text-gray-900">
                      Total Due
                    </span>
                    <span className="text-2xl font-extrabold text-gray-950 tracking-tight">
                      {currencySymbol}{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckOut}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-semibold text-sm shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-gray-400">
                  <FiShield className="text-emerald-600 w-4 h-4" />
                  <span>256-Bit SSL Encrypted Checkout</span>
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
