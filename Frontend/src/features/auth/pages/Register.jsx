import React, { useState } from 'react';
import {useAuth} from "../hook/useAuth"
import { Link, useNavigate } from 'react-router';

const Register = () => {

    const{handleRegister}=useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
        contact: '',
        isSeller: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleRadioChange = (isSellerValue) => {
        setFormData(prev => ({ ...prev, isSeller: isSellerValue }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Registration Data:', formData);
        await handleRegister({
            email: formData.email,
            contact: formData.contactNumber,
            password: formData.password,
            isSeller: formData.isSeller,
            fullname: formData.name,
        })
        navigate("/");
    };

    return (
        <div className="flex min-h-screen bg-white font-sans text-gray-800">
            {/* Left Column (Hidden on mobile) */}
            <div className="hidden lg:flex w-[45%] bg-gradient-to-b from-[#4939C9] to-[#8EE0FE] relative flex-col justify-center px-16 lg:px-20 overflow-hidden">
                {/* Globe Wireframe Background Graphic */}
                <div className="absolute left-10 bottom-24 opacity-10">
                    <svg width="250" height="250" viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="2">
                        <circle cx="50" cy="50" r="45" />
                        <ellipse cx="50" cy="50" rx="15" ry="45" />
                        <ellipse cx="50" cy="50" rx="30" ry="45" />
                        <line x1="5" y1="50" x2="95" y2="50" />
                        <line x1="15" y1="25" x2="85" y2="25" />
                        <line x1="15" y1="75" x2="85" y2="75" />
                    </svg>
                </div>

                <div className="z-10 text-white max-w-[400px] mb-40">
                    <h1 className="text-[2.5rem] lg:text-[3rem] font-bold mb-6 leading-[1.1] text-white">
   <span className="font-['Cinzel'] text-amber-300 tracking-[0.25em] drop-shadow-lg">
    ZIVA
</span>
    <span className="text-white">
        {" "}— Where Fashion Meets Identity
    </span>
</h1>
                  <p className="text-base text-white/85 leading-8 pr-8 tracking-wide font-light">
    <span className="font-semibold text-cyan-300 underline decoration-cyan-300/60 underline-offset-4">
        Join ZIVA
    </span>{" "}
    and discover
    <span className="font-medium text-white"> premium fashion </span>
    from trusted suppliers
    <span className="text-sky-200 font-medium"> worldwide.</span>
</p>
                </div>

                {/* Fashion & Apparel Graphic */}
                <div className="absolute bottom-12 left-24 z-10 scale-95 origin-bottom-left">
                    <div className="relative">
                        <svg width="300" height="220" viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Subtle Shadow */}
                            <ellipse cx="150" cy="200" rx="80" ry="10" fill="rgba(0,0,0,0.2)" />
                            
                            {/* Elegant Coat Hanger */}
                            <path d="M80 140 L150 90 L220 140" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                            <path d="M150 90 V70 Q150 55 165 55 Q180 55 180 70" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.7" />
                            <path d="M80 140 Q150 160 220 140" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.7" />
                            
                            {/* Premium Shopping Bag */}
                            <rect x="105" y="100" width="90" height="100" rx="4" fill="#3B2D9E" stroke="#A5E3FB" strokeWidth="4" />
                            
                            {/* Bag Handles */}
                            <path d="M130 100 V75 Q130 60 150 60 Q170 60 170 75 V100" stroke="#A5E3FB" strokeWidth="5" strokeLinecap="round" fill="none" />
                            
                            {/* ZIVA Text on Bag */}
                            <text x="150" y="160" fill="#FDE047" fontSize="22" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="2">ZIVA</text>
                            
                            {/* Golden Sparkles/Stars */}
                            <path d="M230 60 L235 75 L250 80 L235 85 L230 100 L225 85 L210 80 L225 75 Z" fill="#FDE047" opacity="0.9" />
                            <path d="M70 70 L73 80 L83 83 L73 86 L70 96 L67 86 L57 83 L67 80 Z" fill="#FDE047" opacity="0.8" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[55%] relative flex flex-col items-center justify-center p-8 sm:p-12 overflow-hidden bg-white">
                
                {/* Decorative Top Right Corner */}
                <div className="absolute top-0 right-0 w-48 h-48 sm:w-80 sm:h-80 pointer-events-none overflow-hidden sm:overflow-visible">
                    <div className="absolute top-[-20px] right-[-10px] sm:top-[-40px] sm:right-[-20px] w-40 h-40 sm:w-64 sm:h-64 bg-[#D1E6FF] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-80 z-0"></div>
                    <div className="absolute top-[10px] right-[-15px] sm:top-[20px] sm:right-[-30px] w-32 h-32 sm:w-48 sm:h-48 bg-[#BFE0FF] rounded-[50%_50%_30%_70%/50%_40%_60%_50%] opacity-60 z-0"></div>
                </div>

                {/* ZIVA Logo Top Right */}
                <div className="absolute top-4 right-4 sm:top-8 sm:right-12 flex flex-col items-center z-10">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span className="text-base font-black tracking-widest uppercase mt-1 text-gray-900">ZIVA</span>
                </div>

                <div className="w-full max-w-[380px] z-10">
                    <h2 className="text-[#3B2D9E] text-[1.75rem] font-bold mb-8">Create new account</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Name Input */}
                        <div className="flex flex-col">
                            <label className="text-[13px] text-gray-500 mb-1.5" htmlFor="name">Name</label>
                            <input 
                                type="text"
                                id="name"
                                name="name"
                                value={formData.fullame}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#4939C9] focus:ring-1 focus:ring-[#4939C9] transition-colors bg-white text-gray-900 h-10"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col">
                            <label className="text-[13px] text-gray-500 mb-1.5" htmlFor="password">Password</label>
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#4939C9] focus:ring-1 focus:ring-[#4939C9] transition-colors bg-white text-gray-900 h-10"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col">
                            <label className="text-[13px] text-gray-500 mb-1.5" htmlFor="email">Email Address</label>
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#4939C9] focus:ring-1 focus:ring-[#4939C9] transition-colors bg-white text-gray-900 h-10"
                            />
                        </div>

                        {/* Contact Number Input */}
                        <div className="flex flex-col">
                            <label className="text-[13px] text-gray-500 mb-1.5" htmlFor="contactNumber">Contact Number</label>
                            <input 
                                type="tel"
                                id="contactNumber"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#4939C9] focus:ring-1 focus:ring-[#4939C9] transition-colors bg-white text-gray-900 h-10"
                            />
                        </div>

                        {/* Signing As */}
                        <div className="flex flex-col pt-3">
                            <label className="text-[13px] text-gray-500 mb-2">Signing As</label>
                            <div className="flex items-center space-x-6 sm:space-x-12">
                                <label className="flex items-center cursor-pointer group">
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${!formData.isSeller ? 'border-black' : 'border-gray-400 group-hover:border-gray-600'}`}>
                                        {!formData.isSeller && <div className="w-2 h-2 bg-black rounded-full"></div>}
                                    </div>
                                    <input 
                                        type="radio" 
                                        name="signingAs" 
                                        className="hidden" 
                                        checked={!formData.isSeller}
                                        onChange={() => handleRadioChange(false)}
                                    />
                                    <span className="ml-2.5 text-[14px] text-gray-800">Buyer</span>
                                </label>

                                <label className="flex items-center cursor-pointer group">
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.isSeller ? 'border-black' : 'border-gray-400 group-hover:border-gray-600'}`}>
                                        {formData.isSeller && <div className="w-2 h-2 bg-black rounded-full"></div>}
                                    </div>
                                    <input 
                                        type="radio" 
                                        name="signingAs" 
                                        className="hidden" 
                                        checked={formData.isSeller}
                                        onChange={() => handleRadioChange(true)}
                                    />
                                    <span className="ml-2.5 text-[14px] text-gray-800">Supplier</span>
                                </label>
                            </div>
                        </div>

                       <a 
  href="/api/auth/google"
  className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="w-5 h-5"
  >
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.2 18.9 12 24 12c3 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.3 35 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.4 5.3-6.2 6.8l6.2 5.2C38.5 37 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"/>
  </svg>

  Continue with Google
</a>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
    type="submit"
    className="w-36 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 text-sm shadow-md hover:scale-105"
>
                                SIGN UP
                            </button>
                        </div>
                        
                        {/* Terms Text */}
                        <p className="text-[10px] text-gray-700 mt-1 pb-4 border-b border-transparent">
                            By registering, you agree to the <a href="#" className="text-[#3B2D9E] underline">Terms and Conditions</a>
                        </p>

                        {/* Login Link */}
                        <div className="text-center pt-8">
                            <p className="text-[14px] font-medium text-gray-800">
                                Already registered? <a href="/login" className="text-[#3B2D9E] font-semibold hover:underline">Login</a>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
