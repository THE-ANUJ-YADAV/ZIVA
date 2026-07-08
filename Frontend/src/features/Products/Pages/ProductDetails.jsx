import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useProduct } from '../hooks/useProducts';
import { 
  FiShoppingCart, FiHeart, FiShare2, FiStar,
  FiTruck, FiShield, FiRotateCcw, FiDollarSign, FiShoppingBag,
  FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { BsLightningFill } from 'react-icons/bs';

const MOCK_PRODUCT = {
  "price": {
    "amount": 599,
    "currency": "INR"
  },
  "_id": "6a4e1dbd13f35b79b576f961",
  "title": "Men Regular Fit Solid Casual Shirt",
  "description": "Brand\r\nTYRELL\r\nSize\r\nXL\r\nPack of\r\n1\r\nStyle Code\r\nPLAIN SHIRT\r\nFit\r\nRegular\r\nFabric\r\nCotton Blend\r\nSleeve\r\nFull Sleeve\r\nPattern\r\nSolid\r\nReversible\r\nNo\r\nColor\r\nDark Green\r\nFabric Care\r\nDo not iron\r\nSuitable For\r\nWestern Wear\r\nNet Quantity\r\n1\r\nBrand Color\r\nRAMA\r\nIdeal For\r\nMen\r\nOccasion\r\nCasual",
  "seller": "6a49cb20ed92d92804f701f1",
  "images": [
    {
      "url": "https://ik.imagekit.io/grexd5jze/Ziva/shirt_7lbmAuholn.webp",
      "_id": "6a4e1dbd13f35b79b576f962"
    },
    {
      "url": "https://ik.imagekit.io/grexd5jze/Ziva/shirt2_vXNbV3n0Z.webp",
      "_id": "6a4e1dbd13f35b79b576f963"
    },
    {
      "url": "https://ik.imagekit.io/grexd5jze/Ziva/shirt3_83l65I1Tw.webp",
      "_id": "6a4e1dbd13f35b79b576f964"
    }
  ],
  "createdAt": "2026-07-08T09:51:57.618Z",
  "updatedAt": "2026-07-08T09:51:57.618Z",
  "__v": 0
};

const parseDescription = (desc) => {
  if (!desc) return {};
  const parts = desc.split(/\r\n|\n|\r/);
  const specs = {};
  for (let i = 0; i < parts.length; i += 2) {
    if (parts[i] && parts[i + 1]) {
      specs[parts[i]] = parts[i + 1];
    }
  }
  return specs;
};

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { handleGetProductById } = useProduct();

    useEffect(() => {
        let isMounted = true;
        async function fetchProductDetail() {
            setLoading(true);
            try {
                if (productId) {
                    const data = await handleGetProductById(productId);
                    if (isMounted) setProduct(data || MOCK_PRODUCT);
                } else {
                    if (isMounted) setProduct(MOCK_PRODUCT);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                if (isMounted) setProduct(MOCK_PRODUCT);
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        fetchProductDetail();
        
        return () => { isMounted = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!product) return null;

    const specs = parseDescription(product.description);
    const brand = specs['Brand'] || 'Unknown Brand';
    const category = specs['Occasion'] ? `${specs['Occasion']} Shirt` : 'Casual Shirt';

    // const handleMouseMove = (e) => {
    //     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    //     const x = ((e.clientX - left) / width) * 100;
    //     const y = ((e.clientY - top) / height) * 100;
    //     setMousePosition({ x, y });
    // };

    const handleNextImage = () => {
        if (!product?.images?.length) return;
        setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    };

    const handlePrevImage = () => {
        if (!product?.images?.length) return;
        setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    };

    return (
        <div className="min-h-screen bg-gray-50/40 py-8 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
            <div className="max-w-7xl mx-auto">
                
                {/* Application Logo */}
                <div className="flex items-center mb-10">
                    <div className="flex items-center gap-3 cursor-pointer text-indigo-800 transition-transform duration-300 hover:scale-105 origin-left">
                        <FiShoppingBag strokeWidth={2.5} size={32} />
                        <span className="text-4xl font-black tracking-[0.2em] uppercase mt-1">ZIVA</span>
                    </div>
                </div>

                {/* Breadcrumb */}
                <div className="mb-6 flex items-center text-sm text-gray-500 space-x-2 font-medium">
                    <span className="text-indigo-600 tracking-wider hover:text-indigo-800 cursor-pointer transition-colors">Home</span>
                    <span className="text-gray-300">/</span>
                    <span className="hover:text-gray-800 cursor-pointer transition-colors">Men</span>
                    <span className="text-gray-300">/</span>
                    <span className="hover:text-gray-800 cursor-pointer transition-colors">Shirts</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-900 truncate font-semibold">{product.title}</span>
                </div>

                <div className="bg-white rounded-[2rem] shadow-2xl shadow-indigo-100/40 overflow-hidden border border-gray-100/60">
                    <div className="flex flex-col lg:flex-row">
                        
                        {/* LEFT SECTION: Image Gallery */}
                        <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col-reverse lg:flex-row gap-6">
                            {/* Thumbnails */}
                            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto py-2 lg:py-0 w-full lg:w-24 shrink-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                                {product.images?.map((img, idx) => (
                                    <button
                                        key={img._id || idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-20 h-24 lg:w-full lg:h-28 rounded-2xl overflow-hidden shrink-0 transition-all duration-300 ease-in-out cursor-pointer
                                            ${activeImage === idx ? 'ring-2 ring-indigo-600 ring-offset-4 scale-[0.98] shadow-md opacity-100' : 'border border-gray-200 hover:border-indigo-300 hover:shadow-sm opacity-60 hover:opacity-100 hover:scale-105'}`}
                                    >
                                        <img 
                                            src={img.url} 
                                            alt={`Thumbnail ${idx}`} 
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Main Image */}
                            <div className="relative flex-1 rounded-3xl overflow-hidden bg-gray-50/50 group h-[400px] sm:h-[500px] lg:h-[600px] shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100/50"
                                // onMouseEnter={() => setIsHovered(true)}
                                // onMouseLeave={() => setIsHovered(false)}
                                // onMouseMove={handleMouseMove}
                            >
                                <img 
                                    src={product.images?.[activeImage]?.url} 
                                    alt={product.title}
                                    className="w-full h-full object-cover object-top transition-opacity duration-500 ease-in-out"
                                    style={{
                                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                                        transform: isHovered ? 'scale(2)' : 'scale(1)',
                                        transition: isHovered ? 'none' : 'transform 0.5s ease-out'
                                    }}
                                />
                                
                                {/* Badges overlay */}
                                <div className="absolute top-5 left-5 flex flex-col gap-2 pointer-events-none">
                                    <span className="bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-black tracking-widest uppercase px-4 py-2 rounded-xl shadow-lg shadow-gray-200/50">
                                        NEW
                                    </span>
                                </div>

                                {/* Slider Buttons */}
                                {product?.images?.length > 1 && (
                                    <>
                                        <button 
                                            onClick={handlePrevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                                        >
                                            <FiChevronLeft size={24} />
                                        </button>
                                        <button 
                                            onClick={handleNextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                                        >
                                            <FiChevronRight size={24} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* RIGHT SECTION: Product Info */}
                        <div className="w-full lg:w-1/2 p-6 lg:p-12 lg:pl-6 flex flex-col">
                            
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h2 className="text-[13px] font-black text-indigo-600 uppercase tracking-[0.15em] mb-3">{brand}</h2>
                                    <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-black text-gray-900 leading-tight mb-4 tracking-tight">
                                        {product.title}
                                    </h1>
                                    <div className="text-sm text-gray-500 mb-6 flex flex-wrap items-center gap-3">
                                        <span className="bg-gray-100 px-3 py-1.5 rounded-lg text-gray-700 font-semibold tracking-wide">{category}</span>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-green-600 font-bold flex items-center bg-green-50 px-3 py-1.5 rounded-lg">
                                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span> 
                                            In Stock
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-3 shrink-0">
                                    <button className="p-3.5 rounded-2xl bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200 hover:border-red-100 hover:-translate-y-0.5">
                                        <FiHeart size={22} strokeWidth={2.5} />
                                    </button>
                                    <button className="p-3.5 rounded-2xl bg-white hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200 hover:border-indigo-100 hover:-translate-y-0.5">
                                        <FiShare2 size={22} strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>

                            <div className="mb-2 mt-4 flex items-end gap-3">
                                <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                                    {product.price?.currency === 'INR' ? '₹' : product.price?.currency}{product.price?.amount}
                                </span>
                                <span className="text-xl text-gray-400 line-through mb-1.5 font-semibold">₹{Math.round((product.price?.amount || 0) * 1.5)}</span>
                                <span className="text-sm font-black text-orange-600 mb-2 px-3 py-1.5 bg-orange-50 rounded-xl tracking-wide">33% OFF</span>
                            </div>
                            <p className="text-xs font-semibold text-gray-500 mb-8 uppercase tracking-wider">Inclusive of all taxes</p>

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                                <div className="text-gray-600 text-[15px] font-medium leading-relaxed whitespace-pre-wrap bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50">
                                    {product.description}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <button className="flex-1 flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4.5 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-300 hover:-translate-y-1 active:translate-y-0">
                                    <FiShoppingCart size={22} strokeWidth={2.5} />
                                    Add to Cart
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white px-8 py-4.5 rounded-2xl font-bold text-lg shadow-xl shadow-orange-200/50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0">
                                    <BsLightningFill size={22} />
                                    Buy Now
                                </button>
                            </div>

                            <hr className="mb-8 border-gray-100" />

                            {/* Features */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
                                <div className="flex flex-col items-center text-center gap-3 group cursor-pointer">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-200 group-hover:-translate-y-1 transition-all duration-300 ease-in-out">
                                        <FiTruck size={24} />
                                    </div>
                                    <span className="text-[13px] font-bold text-gray-700 group-hover:text-indigo-600 transition-colors">Free Delivery</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-3 group cursor-pointer">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-200 group-hover:-translate-y-1 transition-all duration-300 ease-in-out">
                                        <FiRotateCcw size={24} />
                                    </div>
                                    <span className="text-[13px] font-bold text-gray-700 group-hover:text-indigo-600 transition-colors">7 Days Return</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-3 group cursor-pointer">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-200 group-hover:-translate-y-1 transition-all duration-300 ease-in-out">
                                        <FiShield size={24} />
                                    </div>
                                    <span className="text-[13px] font-bold text-gray-700 group-hover:text-indigo-600 transition-colors">Secure Payment</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-3 group cursor-pointer">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-200 group-hover:-translate-y-1 transition-all duration-300 ease-in-out">
                                        <FiDollarSign size={24} />
                                    </div>
                                    <span className="text-[13px] font-bold text-gray-700 group-hover:text-indigo-600 transition-colors">COD Available</span>
                                </div>
                            </div>

                            <hr className="mb-8 border-gray-100" />

                            {/* Specifications */}
                            <div className="flex-grow">
                                <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                                    Product Details
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                    {Object.entries(specs).map(([key, value]) => (
                                        <div key={key} className="flex flex-col py-3.5 px-4 bg-gray-50 rounded-2xl border border-gray-100/60 hover:bg-indigo-50/50 hover:border-indigo-100 transition-all duration-300">
                                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{key}</span>
                                            <span className="text-[15px] font-semibold text-gray-900">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer / IDs */}
                            <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                <span className="flex items-center gap-2">
                                    Seller ID: <span className="text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">{product.seller}</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    Product ID: <span className="text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">{product._id}</span>
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;