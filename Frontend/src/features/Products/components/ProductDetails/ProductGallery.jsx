import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProductGallery = ({ images, title }) => {
    const [activeImage, setActiveImage] = useState(0);

    const handleNextImage = () => {
        if (!images?.length) return;
        setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handlePrevImage = () => {
        if (!images?.length) return;
        setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    if (!images || images.length === 0) {
        return (
            <div className="w-full max-w-[500px] h-[500px] bg-gray-100 rounded-[20px] flex items-center justify-center border border-gray-200">
                <span className="text-gray-400">No Image Available</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-6 sticky top-28 w-full max-w-[500px] mx-auto lg:mx-0">
            {/* Thumbnails (Vertical on LG, Horizontal on Mobile) */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto w-full lg:w-20 shrink-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {images.map((img, idx) => (
                    <button
                        key={img._id?.$oid || img._id || idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative w-20 h-24 lg:w-full lg:h-24 rounded-[16px] overflow-hidden shrink-0 transition-all duration-300 ease-in-out cursor-pointer
                            ${activeImage === idx 
                                ? 'ring-2 ring-indigo-600 ring-offset-2 opacity-100' 
                                : 'border border-gray-200 opacity-60 hover:opacity-100'}`}
                    >
                        <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover object-top" />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 rounded-[20px] overflow-hidden bg-gray-50 group h-[450px] sm:h-[500px] lg:h-[600px] border border-gray-100">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeImage}
                        src={images[activeImage]?.url}
                        alt={title}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover object-top"
                    />
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                    <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-sm">
                        NEW SEASON
                    </span>
                </div>

                {/* Nav Arrows */}
                {images.length > 1 && (
                    <>
                        <button onClick={handlePrevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-2.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <FiChevronLeft size={20} />
                        </button>
                        <button onClick={handleNextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-2.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <FiChevronRight size={20} />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductGallery;
