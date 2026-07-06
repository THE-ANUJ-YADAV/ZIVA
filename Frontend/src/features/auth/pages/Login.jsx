import React, { useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router';
import ContinueWithGoogle from '../components/ContinueWithGoogle';

const Login = () => {
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login Data:', formData);
        if (handleLogin) {
            await handleLogin({
                email: formData.email,
                password: formData.password
            });
        }
        navigate("/");
    };

    return (
        <div className="flex min-h-screen bg-white font-sans text-gray-800">
            {/* Left Column (Hidden on mobile) */}
            <div 
                className="hidden lg:flex w-[45%] relative flex-col justify-center px-16 lg:px-20 overflow-hidden bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(73, 57, 201, 0.45), rgba(142, 224, 254, 0.45)), url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1470&auto=format&fit=crop')`
                }}
            >
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
                            Welcome back
                        </span>{" "}
                        to
                        <span className="font-medium text-white"> premium fashion </span>
                        from trusted suppliers
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
                <div className="absolute top-4 right-4 sm:top-8 sm:right-12 flex flex-col items-center z-10">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span className="text-base font-black tracking-widest uppercase mt-1 text-gray-900">ZIVA</span>
                </div>

                <div className="w-full max-w-[380px] z-10">
                    <h2 className="text-[#3B2D9E] text-[1.75rem] font-bold mb-8">Sign in to ZIVA</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

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

                        <div className="flex justify-end pt-1">
                            <a href="#" className="text-[12px] text-[#3B2D9E] hover:underline font-medium">Forgot Password?</a>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-36 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 text-sm shadow-md hover:scale-105"
                            >
                                LOGIN
                            </button>
                        </div>
                        <ContinueWithGoogle />

                        {/* Register Link */}
                        <div className="text-center pt-8">
                            <p className="text-[14px] font-medium text-gray-800">
                                Don't have an account? <a href="/register" className="text-[#3B2D9E] font-semibold hover:underline">Register</a>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;