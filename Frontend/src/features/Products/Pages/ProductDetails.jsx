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
import ProductGallery from '../components/ProductDetails/ProductGallery';
import ProductInfo from '../components/ProductDetails/ProductInfo';
import ProductSections from '../components/ProductDetails/ProductSections';
import RelatedProducts from '../components/ProductDetails/RelatedProducts';

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

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <div className="mb-10 flex items-center text-[13px] text-gray-500 space-x-3 font-medium uppercase tracking-widest">
                    <span className="hover:text-indigo-600 cursor-pointer transition-colors">Home</span>
                    <span className="text-gray-300">/</span>
                    <span className="hover:text-gray-900 cursor-pointer transition-colors">Men</span>
                    <span className="text-gray-300">/</span>
                    <span className="hover:text-gray-900 cursor-pointer transition-colors">Shirts</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-xs">{displayTitle}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* Left: Gallery */}
                    <div className="w-full lg:w-1/2">
                        <ProductGallery images={displayImages} title={displayTitle} />
                    </div>

                    {/* Right: Info */}
                    <div className="w-full lg:w-1/2">
                        <ProductInfo
                            brand={brand}
                            title={displayTitle}
                            category={category}
                            displayPrice={displayPrice}
                            displayStock={displayStock}
                            attributeKeys={attributeKeys}
                            availableAttributes={availableAttributes}
                            selectedAttributes={selectedAttributes}
                            handleAttributeSelect={handleAttributeSelect}
                            checkIsValidOption={checkIsValidOption}
                            handleaddItem={handleaddItem}
                            productId={product._id}
                            selectedVariant={selectedVariant}
                        />
                    </div>
                </div>

                {/* Bottom Sections */}
                <ProductSections displayDesc={displayDesc} specs={specs} />
                <RelatedProducts />
            </div>
        </div>
    );
};

export default ProductDetails;