import React, { useState } from 'react';
import { useProduct } from '../hooks/useProducts';
import { useNavigate } from 'react-router';

const CreateProduct = () => {
    const { handleCreateproduct } = useProduct();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
        images: []
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 7) {
            alert('You can only upload up to 7 images.');
            return;
        }
        setFormData(prev => ({ ...prev, images: files }));

        // Generate previews
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Product Data:', formData);

        // Usually you'd use FormData to send files
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('priceAmount', formData.priceAmount);
        data.append('priceCurrency', formData.priceCurrency);
        formData.images.forEach(image => {
            data.append('images', image);
        });

        if (handleCreateproduct) {
            await handleCreateproduct(data);
        }
        navigate("/"); // Or navigate to products list
    };

    return (
        <div className="flex min-h-screen bg-white font-sans text-gray-800">
            {/* Left Column (Hidden on mobile) */}
            <div
                className="hidden lg:flex w-[40%] relative flex-col justify-center px-12 lg:px-16 overflow-hidden bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(73, 57, 201, 0.45), rgba(142, 224, 254, 0.45)), url('https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1470&auto=format&fit=crop')`
                }}
            >

                <div className="z-10 text-white max-w-[400px]">
                    <h1 className="text-[2.5rem] lg:text-[3rem] font-bold mb-6 leading-[1.1] text-white">
                        <span className="font-['Cinzel'] text-amber-300 tracking-[0.25em] drop-shadow-lg">
                            ZIVA
                        </span>
                        <span className="block mt-2 text-[2rem] text-white">
                            Expand Your Collection
                        </span>
                    </h1>
                    <p className="text-base text-white/85 leading-8 pr-8 tracking-wide font-light">
                        <span className="font-semibold text-cyan-100 underline decoration-cyan-300/60 underline-offset-4">
                            Add new pieces
                        </span>{" "}
                        to your catalog. Showcase the latest trends and premium fashion to our
                        <span className="text-sky-200 font-medium"> global audience.</span>
                    </p>
                </div>
            </div>

            {/* Right Column (Form) */}
            <div className="w-full lg:w-[60%] relative flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12 overflow-y-auto bg-white">

                {/* Decorative Top Right Corner */}
                <div className="absolute top-0 right-0 w-48 h-48 sm:w-80 sm:h-80 pointer-events-none overflow-hidden sm:overflow-visible">
                    <div className="absolute top-[-20px] right-[-10px] sm:top-[-40px] sm:right-[-20px] w-40 h-40 sm:w-64 sm:h-64 bg-[#D1E6FF] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-80 z-0"></div>
                </div>

                {/* ZIVA Logo Top Right */}
                <div className="absolute top-4 right-4 sm:top-8 sm:right-12 flex flex-col items-center z-10">
                    <svg width="28" height="28" className="sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span className="text-sm sm:text-base font-black tracking-widest uppercase mt-1 text-gray-900">ZIVA</span>
                </div>

                <div className="w-full max-w-[500px] z-10 mt-14 sm:mt-8 lg:mt-0">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3B2D9E] to-[#6C63FF] mb-8 text-center sm:text-left relative inline-block">
                        Create New Product
                        <span className="absolute left-0 -bottom-2 w-20 h-1 bg-gradient-to-r from-[#3B2D9E] to-[#6C63FF] rounded-full"></span>
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

                        {/* Title Input */}
                        <div className="flex flex-col">
                            <label className="text-[13px] text-gray-500 mb-1.5 font-medium" htmlFor="title">Product Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Elegant Summer Dress"
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#4939C9] focus:ring-1 focus:ring-[#4939C9] transition-colors bg-white text-gray-900 h-11"
                            />
                        </div>

                        {/* Description Input */}
                        <div className="flex flex-col">
                            <label className="text-[13px] text-gray-500 mb-1.5 font-medium" htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Describe the product details..."
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#4939C9] focus:ring-1 focus:ring-[#4939C9] transition-colors bg-white text-gray-900 resize-none"
                            ></textarea>
                        </div>

                        {/* Price & Currency */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex flex-col flex-1">
                                <label className="text-[13px] text-gray-500 mb-1.5 font-medium" htmlFor="priceAmount">Price Amount</label>
                                <input
                                    type="number"
                                    id="priceAmount"
                                    name="priceAmount"
                                    value={formData.priceAmount}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#4939C9] focus:ring-1 focus:ring-[#4939C9] transition-colors bg-white text-gray-900 h-11"
                                />
                            </div>
                            <div className="flex flex-col w-full sm:w-1/3">
                                <label className="text-[13px] text-gray-500 mb-1.5 font-medium" htmlFor="priceCurrency">Currency</label>
                                <select
                                    id="priceCurrency"
                                    name="priceCurrency"
                                    value={formData.priceCurrency}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#4939C9] focus:ring-1 focus:ring-[#4939C9] transition-colors bg-white text-gray-900 h-11 appearance-none"
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                    <option value="INR">INR (₹)</option>
                                </select>
                            </div>
                        </div>

                        {/* Images Upload */}
                        <div className="flex flex-col">
                            <label className="text-[13px] text-gray-500 mb-1.5 font-medium" htmlFor="images">Product Images (Up to 7)</label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                onChange={handleImageChange}
                                multiple
                                accept="image/*"
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-[#EAF4FF] file:text-[#3B2D9E]
                                    hover:file:bg-[#D1E6FF] transition-colors cursor-pointer border border-gray-300 rounded py-2 px-3"
                            />

                            {/* Image Previews */}
                            {imagePreviews.length > 0 && (
                                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                                    {imagePreviews.map((src, idx) => (
                                        <img key={idx} src={src} alt={`preview ${idx}`} className="w-16 h-16 object-cover rounded shadow-sm border border-gray-200 flex-shrink-0" />
                                    ))}
                                </div>
                            )}
                            {formData.images.length > 0 && (
                                <p className="text-xs text-gray-500 mt-1">{formData.images.length}/7 images selected.</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="w-full sm:w-auto px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 sm:hover:bg-transparent rounded-lg sm:rounded-none transition-colors text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-gradient-to-r from-[#4939C9] to-blue-500 hover:from-[#3B2D9E] hover:to-blue-600 text-white font-semibold py-2.5 px-8 rounded-lg transition-all duration-300 text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5"
                            >
                                Create Product
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct; 