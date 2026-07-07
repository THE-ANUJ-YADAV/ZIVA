import React, { useEffect, useState, useMemo } from 'react';
import { useProduct } from '../hooks/useProducts';
import { useSelector } from 'react-redux';
import { Package, Plus, Calendar, Edit, Trash2, Eye, TrendingUp, DollarSign, Clock, AlertCircle, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router';

const Dashboard = () => {
  const { handleGetSellerProduct } = useProduct();
  const sellerProducts = useSelector(state => state.product.sellerProducts) || [];
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await handleGetSellerProduct();
    } catch (err) {
      console.error(err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCurrencySymbol = (currencyCode) => {
      switch(currencyCode) {
          case 'USD': return '$';
          case 'EUR': return '€';
          case 'GBP': return '£';
          case 'INR': return '₹';
          default: return currencyCode || '₹';
      }
  }

  const formatPrice = (amount, currencyCode) => {
    if (amount === undefined || amount === null) return 'N/A';
    const symbol = getCurrencySymbol(currencyCode);
    return `${symbol}${amount.toLocaleString()}`;
  }

  // Calculate Statistics
  const stats = useMemo(() => {
    if (!sellerProducts || sellerProducts.length === 0) {
      return { total: 0, inventory: 'N/A', avgPrice: 0, lastAdded: 'None' };
    }
    
    let totalPrice = 0;
    let latestDate = new Date(0);
    
    sellerProducts.forEach(p => {
      if (p.price?.amount) totalPrice += Number(p.price.amount);
      const created = new Date(p.createdAt);
      if (created > latestDate) latestDate = created;
    });

    return {
      total: sellerProducts.length,
      inventory: 'N/A', // Placeholder for now
      avgPrice: (totalPrice / sellerProducts.length).toFixed(2),
      lastAdded: latestDate.getTime() === 0 ? 'Unknown' : formatDate(latestDate)
    };
  }, [sellerProducts]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-12">
      {/* ZIVA Brand Header Section */}
      <div className="bg-[#FAFBFF] border-b border-[#EAF4FF] pt-8 pb-10 px-6 md:px-10 lg:px-12 mb-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-6">
            {/* ZIVA Logo */}
            <div className="hidden sm:flex flex-col items-center bg-white p-3 rounded-xl shadow-sm border border-[#EAF4FF]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B2D9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="text-[10px] font-black tracking-widest uppercase mt-1 text-gray-900">ZIVA</span>
            </div>
            
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3B2D9E] to-[#6C63FF] inline-block">
                Seller Dashboard
              </h1>
              <p className="text-gray-500 mt-2 text-sm md:text-base font-light">Manage your ZIVA fashion catalog and track your products.</p>
            </div>
          </div>
          <Link 
            to="/seller/create-product"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4939C9] to-blue-500 hover:from-[#3B2D9E] hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-[0_4px_14px_0_rgba(73,57,201,0.39)] hover:shadow-[0_6px_20px_rgba(73,57,201,0.23)] hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <Plus size={18} />
            Create Product
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 space-y-10">
        
        {/* Statistics Section */}
        {!error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              // Stats Skeletons
              Array(4).fill(0).map((_, i) => (
                <div key={`stat-skel-${i}`} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-pulse">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="w-12 h-12 bg-gray-100 rounded-full"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                </div>
              ))
            ) : (
              // Actual Stats
              <>
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-[#EAF4FF] group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#EAF4FF] rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-110"></div>
                  <div className="flex justify-between items-start mb-2 relative z-10">
                    <h3 className="text-sm font-medium text-gray-500">Total Collection</h3>
                    <div className="w-12 h-12 bg-[#EAF4FF] text-[#4939C9] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <Package size={20} />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-3xl font-extrabold text-gray-900">{stats.total}</p>
                    <p className="text-xs text-gray-400 mt-2 font-medium uppercase tracking-wider">Active listings</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-emerald-50 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-110"></div>
                  <div className="flex justify-between items-start mb-2 relative z-10">
                    <h3 className="text-sm font-medium text-gray-500">Total Inventory</h3>
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <TrendingUp size={20} />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-3xl font-extrabold text-gray-900">{stats.inventory}</p>
                    <p className="text-xs text-gray-400 mt-2 font-medium uppercase tracking-wider">Units in stock</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-amber-50 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-110"></div>
                  <div className="flex justify-between items-start mb-2 relative z-10">
                    <h3 className="text-sm font-medium text-gray-500">Avg. Piece Price</h3>
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <DollarSign size={20} />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-3xl font-extrabold text-gray-900">{formatPrice(stats.avgPrice, sellerProducts[0]?.price?.currency)}</p>
                    <p className="text-xs text-gray-400 mt-2 font-medium uppercase tracking-wider">Across collection</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-blue-50 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-110"></div>
                  <div className="flex justify-between items-start mb-2 relative z-10">
                    <h3 className="text-sm font-medium text-gray-500">Last Added</h3>
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <Clock size={20} />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-xl font-extrabold text-gray-900 mt-2">{stats.lastAdded}</p>
                    <p className="text-xs text-gray-400 mt-2.5 font-medium uppercase tracking-wider">Most recent</p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* States & Grid */}
        {error ? (
          <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="text-red-500 w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-500 max-w-sm mb-6">{error}</p>
            <button 
              onClick={fetchProducts}
              className="bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 inline-flex items-center gap-2 py-2.5 px-6 rounded-lg transition-colors shadow-sm"
            >
              <RefreshCcw size={16} /> Retry
            </button>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array(8).fill(0).map((_, i) => (
              <div key={`prod-skel-${i}`} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse flex flex-col">
                <div className="aspect-[4/5] bg-gray-100"></div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-100 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-100 rounded w-5/6 mb-4"></div>
                  
                  <div className="h-3 bg-gray-100 rounded w-1/3 mb-4 mt-auto"></div>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-5">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/3"></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-10 bg-gray-100 rounded col-span-1"></div>
                    <div className="h-10 bg-gray-100 rounded col-span-1"></div>
                    <div className="h-10 bg-[#EAF4FF] rounded col-span-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : sellerProducts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#EAF4FF] p-16 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-[#EAF4FF] rounded-full flex items-center justify-center mb-6 relative">
              <Package className="text-[#4939C9] w-12 h-12 relative z-10" />
              <div className="absolute inset-0 bg-[#4939C9]/10 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Products Yet</h3>
            <p className="text-gray-500 max-w-md mb-8 text-lg">Start building your ZIVA fashion catalog. Your pieces will appear here once you create them.</p>
            <Link 
              to="/seller/create-product"
              className="bg-gradient-to-r from-[#4939C9] to-blue-500 hover:from-[#3B2D9E] hover:to-blue-600 text-white font-semibold py-3.5 px-8 rounded-lg transition-all duration-300 shadow-[0_4px_14px_0_rgba(73,57,201,0.39)] hover:shadow-[0_6px_20px_rgba(73,57,201,0.23)] inline-flex items-center gap-2"
            >
              <Plus size={20} /> Create Your First Piece
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sellerProducts.map((product) => (
              <div 
                key={product._id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group flex flex-col"
              >
                {/* Image Container (Fashion Aspect Ratio 4:5) */}
                <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden border-b border-gray-100">
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0].url} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-300">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-50">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      <span className="text-xs font-medium uppercase tracking-wider">No Image</span>
                    </div>
                  )}
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold text-[#4939C9] shadow-sm uppercase tracking-widest border border-white">
                    Active
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col bg-white">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1.5 line-clamp-1 group-hover:text-[#4939C9] transition-colors" title={product.title}>
                      {product.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 line-clamp-2 leading-relaxed font-light" title={product.description}>
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="text-[10px] text-gray-400 font-mono mb-4 mt-auto uppercase tracking-wider">
                    ID: {product._id.slice(-8)}
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-6">
                    <div className="text-lg font-extrabold text-gray-900">
                      {formatPrice(product.price?.amount, product.price?.currency)}
                    </div>
                    <div className="flex flex-col items-end gap-1 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                      <div className="flex items-center gap-1.5" title="Created on">
                        <Calendar size={10} />
                        <span>{formatDate(product.createdAt)}</span>
                      </div>
                      {product.updatedAt !== product.createdAt && (
                        <div className="flex items-center gap-1.5 text-gray-300" title="Updated on">
                          <Edit size={10} />
                          <span>{formatDate(product.updatedAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    <button className="flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 py-2.5 rounded-xl transition-colors border border-gray-200">
                      <Edit size={14} /> Edit
                    </button>
                    <button className="flex items-center justify-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 py-2.5 rounded-xl transition-colors border border-red-100">
                      <Trash2 size={14} /> Delete
                    </button>
                    <button className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#4939C9] bg-[#EAF4FF] hover:bg-[#D1E6FF] py-2.5 rounded-xl transition-colors border border-[#EAF4FF]">
                      <Eye size={14} /> View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;