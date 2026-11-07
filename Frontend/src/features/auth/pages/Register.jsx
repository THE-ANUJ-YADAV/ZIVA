import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth"
import { useNavigate } from 'react-router';
import ContinueWithGoogle from '../components/ContinueWithGoogle';

const Register = () => {

    const { handleRegister } = useAuth();
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
            <div 
                className="hidden lg:flex w-[45%] relative flex-col justify-center px-16 lg:px-20 overflow-hidden bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(73, 57, 201, 0.45), rgba(142, 224, 254, 0.45)), url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop')`
                }}
            >
                <div className="z-10 text-white max-w-[400px] mb-40">
                    <h1 className="text-[2.25rem] lg:text-[2.75rem] font-bold mb-6 leading-[1.15] text-white">
                        <span className="font-brand text-amber-300 tracking-[0.2em] drop-shadow-md">
                            ZIVA
                        </span>
                        <span className="text-white">
                            {" "}— Where Fashion Meets Identity
                        </span>
                    </h1>
                    <p className="text-sm lg:text-base text-white/90 leading-relaxed pr-6 tracking-normal font-normal">
                        <span className="font-semibold text-cyan-200">
                            Join ZIVA
                        </span>{" "}
                        and discover
                        <span className="font-medium text-white"> premium curated fashion </span>
                        from trusted ateliers
                        <span className="text-sky-200 font-medium"> worldwide.</span>
                    </p>
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
                <div className="absolute top-6 right-6 sm:top-8 sm:right-12 flex items-center gap-2 z-10">
                    <div className="w-8 h-8 rounded-lg bg-indigo-950 flex items-center justify-center text-white font-brand font-bold text-sm">Z</div>
                    <span className="text-sm font-brand font-bold tracking-[0.25em] uppercase text-gray-950">ZIVA</span>
                </div>

                <div className="w-full max-w-[400px] z-10 py-4">
                    <div className="mb-6">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 block mb-1">New Member</span>
                        <h2 className="text-gray-950 text-2xl sm:text-3xl font-extrabold tracking-tight">Create your account</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">

                        {/* Name Input */}
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold text-gray-700 mb-1" htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your Name"
                                className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all bg-gray-50/50 hover:bg-white text-gray-900 text-sm h-10"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold text-gray-700 mb-1" htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="name@domain.com"
                                className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all bg-gray-50/50 hover:bg-white text-gray-900 text-sm h-10"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold text-gray-700 mb-1" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all bg-gray-50/50 hover:bg-white text-gray-900 text-sm h-10"
                            />
                        </div>

                        {/* Contact Number */}
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold text-gray-700 mb-1" htmlFor="contactNumber">Contact Number</label>
                            <input
                                type="tel"
                                id="contactNumber"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                required
                                placeholder="+91 98765 43210"
                                className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all bg-gray-50/50 hover:bg-white text-gray-900 text-sm h-10"
                            />
                        </div>

                        {/* Signing As Radio Buttons */}
                        <div className="pt-1">
                            <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Signing As</label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className={`flex items-center justify-center p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${!formData.isSeller ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-2xs' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                                    <input
                                        type="radio"
                                        name="signingAs"
                                        className="hidden"
                                        checked={!formData.isSeller}
                                        onChange={() => handleRadioChange(false)}
                                    />
                                    <span>Individual Buyer</span>
                                </label>

                                <label className={`flex items-center justify-center p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${formData.isSeller ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-2xs' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                                    <input
                                        type="radio"
                                        name="signingAs"
                                        className="hidden"
                                        checked={formData.isSeller}
                                        onChange={() => handleRadioChange(true)}
                                    />
                                    <span>Brand / Supplier</span>
                                </label>
                            </div>
                        </div>

                        <ContinueWithGoogle />

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm shadow-md shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Complete Registration
                            </button>
                        </div>

                        {/* Terms Text */}
                        <p className="text-[11px] text-gray-400 text-center">
                            By registering, you agree to ZIVA's <a href="#" className="text-indigo-600 underline">Terms and Conditions</a>
                        </p>

                        {/* Login Link */}
                        <div className="text-center pt-2">
                            <p className="text-xs font-medium text-gray-600">
                                Already registered? <a href="/login" className="text-indigo-600 font-bold hover:underline">Login</a>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};



export default Register;
