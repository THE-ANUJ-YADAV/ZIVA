import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { useProduct } from '../hooks/useProducts';
import {
    FiShoppingCart, FiHeart, FiShare2, FiStar,
    FiTruck, FiShield, FiRotateCcw, FiDollarSign, FiShoppingBag,
    FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { BsLightningFill } from 'react-icons/bs';
import { useCart } from '../../cart/hook/useCart';

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

const getAvailableAttributes = (variants) => {
    if (!variants || !Array.isArray(variants)) return {};
    const attrs = {};
    variants.forEach(variant => {
        if (variant.attributes) {
            Object.entries(variant.attributes).forEach(([key, value]) => {
                const normKey = key.trim().toLowerCase();
                if (!attrs[normKey]) attrs[normKey] = { originalKey: key.trim(), values: new Map() };
                
                const strValue = String(value).trim();
                const normValue = strValue.toLowerCase();
                if (!attrs[normKey].values.has(normValue)) {
                    attrs[normKey].values.set(normValue, strValue);
                }
            });
        }
    });
    const result = {};
    Object.keys(attrs).forEach(key => {
        result[attrs[key].originalKey] = Array.from(attrs[key].values.values());
    });
    return result;
};

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [selectedAttributes, setSelectedAttributes] = useState({});

    const { handleGetProductById } = useProduct();

    const { handleaddItem } = useCart();

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
    }, [productId]);

    useEffect(() => {
        if (product?.variants?.length > 0) {
            const availableAttrs = getAvailableAttributes(product.variants);
            const keys = Object.keys(availableAttrs);
            if (keys.length > 0) {
                const initialAttrs = {};
                let validVariants = product.variants;
                
                // Auto-select attributes if they have exactly one valid option
                let changed = true;
                while (changed) {
                    changed = false;
                    keys.forEach(k => {
                        if (!initialAttrs[k]) {
                            const availableVals = new Set();
                            validVariants.forEach(v => {
                                const vKey = Object.keys(v.attributes || {}).find(vk => vk.toLowerCase() === k.toLowerCase());
                                if (vKey && v.attributes[vKey]) {
                                    availableVals.add(String(v.attributes[vKey]).trim().toLowerCase());
                                }
                            });
                            
                            if (availableVals.size === 1) {
                                const normVal = Array.from(availableVals)[0];
                                const origVal = availableAttrs[k].find(val => String(val).trim().toLowerCase() === normVal);
                                if (origVal) {
                                    initialAttrs[k] = origVal;
                                    changed = true;
                                    validVariants = validVariants.filter(v => {
                                        const vKey = Object.keys(v.attributes || {}).find(vk => vk.toLowerCase() === k.toLowerCase());
                                        return vKey && String(v.attributes[vKey]).trim().toLowerCase() === normVal;
                                    });
                                }
                            }
                        }
                    });
                }
                
                setSelectedAttributes(initialAttrs);
            }
        }
    }, [product]);

    const availableAttributes = useMemo(() => getAvailableAttributes(product?.variants), [product]);
    const attributeKeys = useMemo(() => Object.keys(availableAttributes), [availableAttributes]);

    const selectedVariant = useMemo(() => {
        if (!product?.variants || !attributeKeys.length) return null;
        // Require all attributes to be selected to find a definitive exact variant
        if (Object.keys(selectedAttributes).length < attributeKeys.length) return null;
        
        return product.variants.find(variant => {
            if (!variant.attributes) return false;
            return attributeKeys.every(key => {
                const selectedVal = selectedAttributes[key];
                const varAttrKey = Object.keys(variant.attributes).find(k => k.toLowerCase() === key.toLowerCase());
                return varAttrKey && String(variant.attributes[varAttrKey]).trim().toLowerCase() === String(selectedVal).trim().toLowerCase();
            });
        });
    }, [product, selectedAttributes, attributeKeys]);

    const handleAttributeSelect = (attrName, attrValue) => {
        setSelectedAttributes(prev => {
            if (prev[attrName] === attrValue) {
                const next = { ...prev };
                delete next[attrName];
                return next;
            }

            let resolved = { [attrName]: attrValue };
            
            let validVariants = product.variants.filter(v => {
                const vKey = Object.keys(v.attributes || {}).find(vk => vk.toLowerCase() === attrName.toLowerCase());
                return vKey && String(v.attributes[vKey]).trim().toLowerCase() === String(attrValue).trim().toLowerCase();
            });
            
            attributeKeys.forEach(k => {
                if (k !== attrName && prev[k]) {
                    const candidateVariants = validVariants.filter(v => {
                        const vKey = Object.keys(v.attributes || {}).find(vk => vk.toLowerCase() === k.toLowerCase());
                        return vKey && String(v.attributes[vKey]).trim().toLowerCase() === String(prev[k]).trim().toLowerCase();
                    });
                    
                    if (candidateVariants.length > 0) {
                        resolved[k] = prev[k];
                        validVariants = candidateVariants; 
                    }
                }
            });
            
            let changed = true;
            while (changed) {
                changed = false;
                attributeKeys.forEach(k => {
                    if (!resolved[k]) {
                        const availableVals = new Set();
                        validVariants.forEach(v => {
                            const vKey = Object.keys(v.attributes || {}).find(vk => vk.toLowerCase() === k.toLowerCase());
                            if (vKey && v.attributes[vKey]) {
                                availableVals.add(String(v.attributes[vKey]).trim().toLowerCase());
                            }
                        });
                        
                        if (availableVals.size === 1) {
                            const normVal = Array.from(availableVals)[0];
                            const origVal = availableAttributes[k].find(val => String(val).trim().toLowerCase() === normVal);
                            if (origVal) {
                                resolved[k] = origVal;
                                changed = true;
                                validVariants = validVariants.filter(v => {
                                    const vKey = Object.keys(v.attributes || {}).find(vk => vk.toLowerCase() === k.toLowerCase());
                                    return vKey && String(v.attributes[vKey]).trim().toLowerCase() === normVal;
                                });
                            }
                        }
                    }
                });
            }
            
            return resolved;
        });
        setActiveImage(0);
    };

    const checkIsValidOption = (attrName, attrValue) => {
        if (!product?.variants) return false;
        
        const attrIndex = attributeKeys.findIndex(k => k.toLowerCase() === attrName.toLowerCase());
        
        return product.variants.some(v => {
            const vKey = Object.keys(v.attributes || {}).find(vk => vk.toLowerCase() === attrName.toLowerCase());
            if (!vKey || String(v.attributes[vKey]).trim().toLowerCase() !== String(attrValue).trim().toLowerCase()) {
                return false;
            }
            
            return Object.entries(selectedAttributes).every(([k, selectedVal]) => {
                const kIndex = attributeKeys.findIndex(key => key.toLowerCase() === k.toLowerCase());
                if (kIndex >= attrIndex) return true;
                
                const vk = Object.keys(v.attributes || {}).find(key => key.toLowerCase() === k.toLowerCase());
                return vk && String(v.attributes[vk]).trim().toLowerCase() === String(selectedVal).trim().toLowerCase();
            });
        });
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!product) return null;

    const displayImages = selectedVariant?.images?.length ? selectedVariant.images : (product.images || []);
    const displayPrice = selectedVariant?.price || product.price || { amount: 0, currency: 'INR' };
    const displayTitle = selectedVariant?.title || product.title || '';
    const displayDesc = selectedVariant?.description || product.description || '';
    const displayStock = selectedVariant?.stock !== undefined ? selectedVariant.stock : (product.stock ?? -1);

    const rawVariantId = selectedVariant?._id;
    const variantIdStr = rawVariantId ? (rawVariantId.$oid || rawVariantId) : null;
    const rawProductId = product._id;
    const productIdStr = rawProductId ? (rawProductId.$oid || rawProductId) : null;
    const finalCartId = variantIdStr || productIdStr;

    const rawSellerId = product.seller;
    const sellerIdStr = rawSellerId ? (rawSellerId.$oid || rawSellerId) : 'Unknown';

    const specs = parseDescription(displayDesc);
    const brand = specs['Brand'] || 'Unknown Brand';
    const category = specs['Occasion'] ? `${specs['Occasion']} Shirt` : 'Casual Shirt';

    const handleNextImage = () => {
        if (!displayImages?.length) return;
        setActiveImage((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
    };

    const handlePrevImage = () => {
        if (!displayImages?.length) return;
        setActiveImage((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
    };

    return (
        <div className="min-h-screen bg-gray-50/40 py-8 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-10">
                    <div className="flex items-center gap-3 cursor-pointer text-indigo-800 transition-transform duration-300 hover:scale-105 origin-left">
                        <FiShoppingBag strokeWidth={2.5} size={32} />
                        <span className="text-4xl font-black tracking-[0.2em] uppercase mt-1">ZIVA</span>
                    </div>
                </div>

                <div className="mb-6 flex items-center text-sm text-gray-500 space-x-2 font-medium">
                    <span className="text-indigo-600 tracking-wider hover:text-indigo-800 cursor-pointer transition-colors">Home</span>
                    <span className="text-gray-300">/</span>
                    <span className="hover:text-gray-800 cursor-pointer transition-colors">Men</span>
                    <span className="text-gray-300">/</span>
                    <span className="hover:text-gray-800 cursor-pointer transition-colors">Shirts</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-900 truncate font-semibold">{displayTitle}</span>
                </div>

                <div className="bg-white rounded-[2rem] shadow-2xl shadow-indigo-100/40 overflow-hidden border border-gray-100/60">
                    <div className="flex flex-col lg:flex-row">
                        <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col-reverse lg:flex-row gap-6">
                            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto py-2 lg:py-0 w-full lg:w-24 shrink-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                                {displayImages?.map((img, idx) => (
                                    <button
                                        key={img._id?.$oid || img._id || idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-20 h-24 lg:w-full lg:h-28 rounded-2xl overflow-hidden shrink-0 transition-all duration-300 ease-in-out cursor-pointer
                                            ${activeImage === idx ? 'ring-2 ring-indigo-600 ring-offset-4 scale-[0.98] shadow-md opacity-100' : 'border border-gray-200 hover:border-indigo-300 hover:shadow-sm opacity-60 hover:opacity-100 hover:scale-105'}`}
                                    >
                                        <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover object-top" />
                                    </button>
                                ))}
                            </div>
                            <div className="relative flex-1 rounded-3xl overflow-hidden bg-gray-50/50 group h-[400px] sm:h-[500px] lg:h-[600px] shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100/50">
                                <img
                                    src={displayImages?.[activeImage]?.url}
                                    alt={displayTitle}
                                    className="w-full h-full object-cover object-top transition-opacity duration-500 ease-in-out"
                                    style={{
                                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                                        transform: isHovered ? 'scale(2)' : 'scale(1)',
                                        transition: isHovered ? 'none' : 'transform 0.5s ease-out'
                                    }}
                                />
                                <div className="absolute top-5 left-5 flex flex-col gap-2 pointer-events-none">
                                    <span className="bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-black tracking-widest uppercase px-4 py-2 rounded-xl shadow-lg shadow-gray-200/50">NEW</span>
                                </div>
                                {displayImages?.length > 1 && (
                                    <>
                                        <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                                            <FiChevronLeft size={24} />
                                        </button>
                                        <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                                            <FiChevronRight size={24} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 p-6 lg:p-12 lg:pl-6 flex flex-col">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h2 className="text-[13px] font-black text-indigo-600 uppercase tracking-[0.15em] mb-3">{brand}</h2>
                                    <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-black text-gray-900 leading-tight mb-4 tracking-tight">{displayTitle}</h1>
                                    <div className="text-sm text-gray-500 mb-6 flex flex-wrap items-center gap-3">
                                        <span className="bg-gray-100 px-3 py-1.5 rounded-lg text-gray-700 font-semibold tracking-wide">{category}</span>
                                        <span className="text-gray-300">•</span>
                                        {displayStock !== 0 ? (
                                            <span className="text-green-600 font-bold flex items-center bg-green-50 px-3 py-1.5 rounded-lg">
                                                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                                {displayStock > 0 ? `${displayStock} In Stock` : 'In Stock'}
                                            </span>
                                        ) : (
                                            <span className="text-red-600 font-bold flex items-center bg-red-50 px-3 py-1.5 rounded-lg">
                                                <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>Out of Stock
                                            </span>
                                        )}
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
                                    {displayPrice.currency === 'INR' ? '₹' : displayPrice.currency}{displayPrice.amount}
                                </span>
                                <span className="text-xl text-gray-400 line-through mb-1.5 font-semibold">₹{Math.round((displayPrice.amount || 0) * 1.5)}</span>
                                <span className="text-sm font-black text-orange-600 mb-2 px-3 py-1.5 bg-orange-50 rounded-xl tracking-wide">33% OFF</span>
                            </div>
                            <p className="text-xs font-semibold text-gray-500 mb-8 uppercase tracking-wider">Inclusive of all taxes</p>
                            <hr className="mb-8 border-gray-100" />
                            {attributeKeys.length > 0 && (
                                <div className="mb-8">
                                    {attributeKeys.map(attrName => (
                                        <div key={attrName} className="mb-6">
                                            <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                {attrName}: <span className="text-indigo-600">{selectedAttributes[attrName]}</span>
                                            </h3>
                                            <div className="flex flex-wrap gap-3">
                                                {availableAttributes[attrName].map(val => {
                                                    const isSelected = selectedAttributes[attrName] === val;
                                                    const isValid = checkIsValidOption(attrName, val);
                                                    return (
                                                        <button
                                                            key={val}
                                                            onClick={() => handleAttributeSelect(attrName, val)}
                                                            disabled={!isValid}
                                                            className={`relative overflow-hidden px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${isSelected ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 ring-2 ring-indigo-200 ring-offset-2' : isValid ? 'bg-white text-gray-700 border-gray-200 hover:border-indigo-600 hover:text-indigo-600 hover:shadow-sm' : 'bg-gray-50 text-gray-400 border-gray-200 opacity-50 cursor-not-allowed'}`}
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
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                                <div className="text-gray-600 text-[15px] font-medium leading-relaxed whitespace-pre-wrap bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50">{displayDesc}</div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <button className="flex-1 flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4.5 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed" disabled={displayStock === 0 || !selectedVariant}
                                    onClick={() => {
                                        if (selectedVariant) {
                                            handleaddItem({
                                                productId: product._id,
                                                variantId: selectedVariant._id
                                            });
                                        }
                                    }}
                                >
                                    <FiShoppingCart size={22} strokeWidth={2.5} />Add to Cart
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white px-8 py-4.5 rounded-2xl font-bold text-lg shadow-xl shadow-orange-200/50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed" disabled={displayStock === 0 || !selectedVariant}>
                                     <BsLightningFill size={22} />Buy Now
                                </button>
                            </div>
                            <hr className="mb-8 border-gray-100" />
                            <div className="flex-grow">
                                <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">Product Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                    {Object.entries(specs).map(([key, value]) => (
                                        <div key={key} className="flex flex-col py-3.5 px-4 bg-gray-50 rounded-2xl border border-gray-100/60 hover:bg-indigo-50/50 hover:border-indigo-100 transition-all duration-300">
                                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{key}</span>
                                            <span className="text-[15px] font-semibold text-gray-900">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                <span className="flex items-center gap-2">Seller ID: <span className="text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">{sellerIdStr}</span></span>
                                <span className="flex items-center gap-2">Product/Variant ID: <span className="text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">{finalCartId}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;