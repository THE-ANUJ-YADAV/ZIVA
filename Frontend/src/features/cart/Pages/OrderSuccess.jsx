import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";
import { Check, ShoppingBag, ArrowRight, Copy, CheckCheck, Package, Truck, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const OrderSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const rawOrderId = queryParams.get("order_id") || queryParams.get("order_id ") || "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase();
  const orderId = rawOrderId.trim();

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fire elegant celebratory confetti
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#4f46e5", "#818cf8", "#f43f5e", "#10b981", "#fbbf24"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#4f46e5", "#818cf8", "#f43f5e", "#10b981", "#fbbf24"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleCopy = () => {
    if (!orderId) return;
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFC] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-xl w-full bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100/80 overflow-hidden relative"
      >
        {/* Subtle decorative top banner */}
        <div className="h-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700"></div>

        <div className="p-6 sm:p-10 text-center">
          {/* Animated Success Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 18 }}
            className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-6"
          >
            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-30"></div>
            <div className="relative w-full h-full rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Check className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.5]" />
            </div>
          </motion.div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order Confirmed & Paid</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight mb-2">
            Thank You for Your Order
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
            Your purchase has been securely processed. We are carefully packaging your selections for prompt courier dispatch.
          </p>

          {/* Order Details & Reference Box */}
          <div className="bg-gray-50/80 rounded-2xl p-5 mb-8 border border-gray-100 text-left">
            <div className="flex items-center justify-between pb-3.5 border-b border-gray-200/60 mb-3.5">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Order Reference
                </span>
                <span className="text-sm sm:text-base font-bold font-mono text-gray-900 tracking-tight break-all">
                  {orderId}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-gray-300 text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 transition-all shrink-0"
                title="Copy reference code"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 font-medium block">Estimated Delivery</span>
                <span className="text-gray-900 font-semibold mt-0.5 block">3 - 5 Business Days</span>
              </div>
              <div>
                <span className="text-gray-400 font-medium block">Payment Status</span>
                <span className="text-emerald-700 font-semibold mt-0.5 inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified (100% Safe)
                </span>
              </div>
            </div>
          </div>

          {/* Order Tracking Progress Stepper */}
          <div className="mb-8 p-4 rounded-2xl bg-white border border-gray-100">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-gray-100 -z-0"></div>
              
              <div className="flex flex-col items-center relative z-10">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-sm ring-4 ring-white">
                  ✓
                </div>
                <span className="text-[10px] font-bold text-indigo-700 mt-1 uppercase tracking-wider">Placed</span>
              </div>

              <div className="flex flex-col items-center relative z-10">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold ring-4 ring-white">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-gray-600 mt-1 uppercase tracking-wider">Packing</span>
              </div>

              <div className="flex flex-col items-center relative z-10">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-bold ring-4 ring-white">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-wider">Transit</span>
              </div>

              <div className="flex flex-col items-center relative z-10">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-bold ring-4 ring-white">
                  ★
                </div>
                <span className="text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-wider">Delivered</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="flex-1 inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all duration-200 shadow-md shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl transition-all duration-200"
            >
              Back to Home
              <ArrowRight className="w-4 h-4 ml-2 text-gray-400" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
