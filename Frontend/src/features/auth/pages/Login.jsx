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
        try {
            const user = await handleLogin({ email: formData.email, password: formData.password });
            if (user.role == "buyer" || user.role == "seller") {
                navigate("/");
            }
        } catch (error) {
            console.error("Login failed", error);
        }
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
                            Welcome back
                        </span>{" "}
                        to
                        <span className="font-medium text-white"> premium curated fashion </span>
                        from trusted ateliers
                        <span className="text-sky-200 font-medium"> worldwide.</span>
                    </p>
                </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[55%] relative flex flex-col items-center justify-center p-8 sm:p-12 overflow-hidden bg-white">

                {/* ZIVA Logo Top Right */}
                <div className="absolute top-6 right-6 sm:top-8 sm:right-12 flex items-center gap-2 z-10">
                    <div className="w-8 h-8 rounded-lg bg-indigo-950 flex items-center justify-center text-white font-brand font-bold text-sm">Z</div>
                    <span className="text-sm font-brand font-bold tracking-[0.25em] uppercase text-gray-950">ZIVA</span>
                </div>

                <div className="w-full max-w-[380px] z-10">
                    <div className="mb-8">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 block mb-1">Account Access</span>
                        <h2 className="text-gray-950 text-2xl sm:text-3xl font-extrabold tracking-tight">Sign in to ZIVA</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Email Input */}
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold text-gray-700 mb-1.5" htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="name@domain.com"
                                className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all bg-gray-50/50 hover:bg-white text-gray-900 text-sm h-11"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="text-xs font-semibold text-gray-700" htmlFor="password">Password</label>
                                <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Forgot Password?</a>
                            </div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all bg-gray-50/50 hover:bg-white text-gray-900 text-sm h-11"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm shadow-md shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Sign In
                            </button>
                        </div>
                        <ContinueWithGoogle />

                        {/* Register Link */}
                        <div className="text-center pt-6">
                            <p className="text-xs font-medium text-gray-600">
                                Don't have an account yet?{" "}
                                <a href="/register" className="text-indigo-600 font-bold hover:underline">Create an account</a>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;