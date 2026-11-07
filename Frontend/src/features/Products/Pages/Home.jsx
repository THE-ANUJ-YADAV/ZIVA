import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hooks/useProducts';
import { useNavigate } from 'react-router';
import { ArrowRight, Sparkles, ShieldCheck, RefreshCw, Truck, Award } from 'lucide-react';
import { HeartIcon } from '../../../components/Navbar';

const Hero = () => (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/40 via-white to-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                {/* Left Content */}
                <div className="lg:col-span-7 z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold uppercase tracking-widest mb-6">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Spring / Summer 2026 Collection</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.08] mb-6">
                        Discover Your Style <span className="font-editorial italic font-normal text-indigo-600 block sm:inline">with ZIVA</span>
                    </h1>

                    <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed mb-8">
                        Curated contemporary fashion crafted for the modern visionary. Experience timeless silhouettes, bespoke craftsmanship, and sustainable luxury.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                        <a
                            href="#trending"
                            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Shop Collection
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                        <a
                            href="#categories"
                            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-sm text-gray-800 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                        >
                            Explore Categories
                        </a>
                    </div>

                    {/* Quick Stats / Micro Social Proof */}
                    <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-gray-100 max-w-lg">
                        <div>
                            <p className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">25k+</p>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Satisfied Buyers</p>
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">500+</p>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Exclusive Styles</p>
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">4.9★</p>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Top Rated Quality</p>
                        </div>
                    </div>
                </div>

                {/* Right Hero Image Container */}
                <div className="lg:col-span-5 relative">
                    <div className="relative mx-auto max-w-md lg:max-w-none">
                        {/* Ambient Glow */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-200/50 to-pink-200/40 rounded-3xl blur-2xl opacity-70 -z-10 transform -rotate-1"></div>
                        
                        {/* Main Image Container with 3:4 Aspect Ratio */}
                        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-gray-100">
                            <img
                                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
                                alt="ZIVA Fashion Model"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                            {/* Floating Glass Badges */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50 flex items-center justify-between">
                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Editorial Choice</p>
                                        <p className="text-sm font-bold text-gray-900">Tailored Oversized Blazer</p>
                                    </div>
                                    <span className="text-sm font-extrabold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">₹3,499</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const CategorySection = () => {
    const categories = [
        { name: 'Men', count: '120+ Styles', img: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop' },
        { name: 'Women', count: '240+ Styles', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop' },
        { name: 'Shirts', count: '85+ Styles', img: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?q=80&w=800&auto=format&fit=crop' },
        { name: 'Denim', count: '60+ Styles', img: 'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=800&auto=format&fit=crop' },
        { name: 'Footwear', count: '45+ Styles', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop' },
        { name: 'Accessories', count: '90+ Styles', img: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=800&auto=format&fit=crop' },
    ];

    return (
        <section id="categories" className="bg-gray-50/70 py-20 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-2">Curated Departments</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">Shop by Category</h2>
                    <p className="text-sm text-gray-500 mt-2">Explore handcrafted apparel and timeless wardrobe essentials.</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/60 bg-white flex flex-col"
                        >
                            {/* Controlled 3:4 aspect container for consistent card geometry */}
                            <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
                                <img
                                    src={cat.img}
                                    alt={cat.name}
                                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors duration-300"></div>
                                
                                <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                                    <h3 className="text-base sm:text-lg font-bold tracking-tight">{cat.name}</h3>
                                    <p className="text-[11px] text-gray-300 font-medium group-hover:text-indigo-200 transition-colors">{cat.count}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeaturesSection = () => {
    const features = [
        { icon: Truck, title: 'Free Express Shipping', desc: 'Complimentary shipping on orders over ₹999' },
        { icon: RefreshCw, title: 'Seamless 15-Day Returns', desc: 'Hassle-free pickups with instant refund' },
        { icon: ShieldCheck, title: '100% Secure Checkout', desc: 'Encrypted payments via Razorpay & Cards' },
        { icon: Award, title: 'Bespoke Quality', desc: 'Strict inspection and certified textiles' },
    ];

    return (
        <section className="bg-white py-16 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feat, idx) => {
                        const Icon = feat.icon;
                        return (
                            <div
                                key={idx}
                                className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50/70 border border-gray-100 hover:border-indigo-100 hover:bg-white hover:shadow-md transition-all duration-200"
                            >
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 mb-1">{feat.title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const Newsletter = () => (
    <section className="bg-gray-950 py-20 text-white relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-400 mb-3">Privilege Access</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Stay Ahead with ZIVA Insiders</h2>
            <p className="text-gray-400 mb-8 max-w-xl text-sm sm:text-base leading-relaxed">
                Receive private access to seasonal drops, invite-only capsule releases, and exclusive editorial perspectives.
            </p>
            <div className="flex w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-1.5 border border-white/15 focus-within:border-indigo-400 transition-colors">
                <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 bg-transparent px-5 py-3 outline-none text-white placeholder-gray-400 text-sm w-full"
                />
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-500 transition-colors whitespace-nowrap shadow-md">
                    Subscribe
                </button>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-gray-900 py-16 text-gray-300 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-brand font-bold text-base">Z</div>
                        <span className="font-brand text-2xl font-bold tracking-[0.25em] text-white">ZIVA</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                        Refining the intersection of modern luxury and accessible bespoke fashion. Curated for the discerning wardrobe.
                    </p>
                </div>
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Explore</h4>
                    <ul className="space-y-3 text-xs">
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Men's Capsule</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Women's Atelier</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">New Arrivals</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Editorial Journal</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Client Care</h4>
                    <ul className="space-y-3 text-xs">
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Order Tracking</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Shipping & Returns</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Size Guide</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact Concierge</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Social & Connect</h4>
                    <ul className="space-y-3 text-xs">
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Instagram</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Pinterest</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Twitter (X)</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800/80 pt-8 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; 2026 ZIVA Atelier Inc. All Rights Reserved.</p>
                <div className="flex space-x-6">
                    <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
                    <span className="hover:text-gray-400 cursor-pointer">Cookie Preferences</span>
                </div>
            </div>
        </div>
    </footer>
);

const Home = () => {
    const products = useSelector((state) => state.product.products);
    const { handleGetAllProducts } = useProduct();
    const navigate = useNavigate();

    useEffect(() => {
        handleGetAllProducts();
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <Hero />
            
            {/* Category Section */}
            <CategorySection />

            {/* PRODUCT SECTION */}
            <main id="trending" className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <div className="mb-14 text-center max-w-2xl mx-auto">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-2">Curated Edit</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">Trending Collection</h2>
                    <p className="text-sm text-gray-500 mt-2">Handpicked pieces designed with timeless silhouettes and premium fabrics.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <div
                                onClick={() => navigate(`/product/${product._id}`)}
                                key={product._id}
                                className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                            >
                                {/* Top: Product Image Container (Consistent 3:4 Aspect Ratio) */}
                                <div className="aspect-[3/4] relative overflow-hidden bg-gray-50">
                                    {product.images && product.images.length > 0 ? (
                                        <img
                                            src={product.images[0].url}
                                            alt={product.title}
                                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-xs text-gray-400 bg-gray-100 font-medium">
                                            No Image Available
                                        </div>
                                    )}

                                    {/* Floating Badges */}
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                        <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm border border-white/50">
                                            NEW
                                        </span>
                                    </div>

                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Optional: quick wishlist hook if needed
                                        }}
                                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-all shadow-sm z-10 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
                                        title="Save to Wishlist"
                                    >
                                        <HeartIcon />
                                    </button>
                                </div>
                                
                                {/* Middle & Bottom: Content */}
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="mb-2">
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 mb-1">
                                            {product.brand || "ZIVA ESSENTIALS"}
                                        </p>
                                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                            {product.title}
                                        </h3>
                                    </div>

                                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-1">
                                        {product.description}
                                    </p>
                                    
                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                                        <div>
                                            <span className="text-xs text-gray-400 block font-medium">Price</span>
                                            <span className="font-extrabold text-xl text-gray-950 tracking-tight">
                                                {product.price?.currency === 'INR' ? '₹' : product.price?.currency}
                                                {product.price?.amount?.toLocaleString('en-IN')}
                                            </span>
                                        </div>

                                        <button className="px-3.5 py-2 bg-gray-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-24 flex flex-col justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                            <p className="text-sm font-medium text-gray-500">Curating the finest styles for you...</p>
                        </div>
                    )}
                </div>
            </main>

            <FeaturesSection />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Home;
