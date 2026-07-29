import React from "react";
import { useLocation, Link } from "react-router";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const OrderSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("order_id");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="p-8 sm:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8"
          >
            <CheckCircle
              className="h-12 w-12 text-green-600"
              strokeWidth={2.5}
            />
          </motion.div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Payment Successful!
          </h1>
          <p className="text-base text-gray-500 mb-8">
            Thank you for your purchase. We've received your order and are
            getting it ready for shipment.
          </p>

          {orderId && (
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                Order Reference
              </p>
              <p className="text-xl font-bold text-gray-900 break-all font-mono">
                {orderId}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="group flex items-center justify-center w-full px-6 py-4 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>

            <Link
              to="/orders"
              className="group flex items-center justify-center w-full px-6 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl transition-all duration-200"
            >
              View Order Details
              <ArrowRight className="w-5 h-5 ml-2 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
