import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hooks/useProducts';
import {useNavigate} from 'react-router'


// --- Icons ---
const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const HeartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>);
const CartIcon = ({ className = "h-6 w-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>);
const UserIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>);

const Navbar = () => {
    const user = useSelector(state => state.auth?.user);

    

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Left - Logo */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer gap-2">
                        <CartIcon className="h-10 w-10 text-[#2E2A8F]" />
                        <span className="text-4xl font-black tracking-[0.3em] uppercase text-[#2E2A8F] drop-shadow-sm">
  ZIVA
</span>
                    </div>
                    
                    {/* Center - Links */}
                    <div className="hidden md:flex space-x-8">
                        {['Home', 'Men', 'Women', 'New Arrivals', 'Categories'].map((item) => (
                            <a key={item} href="#" className="text-gray-800 font-medium hover:text-indigo-600 relative group transition-colors duration-300">
                                {item}
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    {/* Right - Icons */}
                    <div className="flex items-center space-x-6 text-gray-600">
                        <button className="hover:text-indigo-600 transition-colors"><SearchIcon /></button>
                        <button className="hover:text-indigo-600 transition-colors"><HeartIcon /></button>
                        <button className="hover:text-indigo-600 transition-colors relative">
                            <CartIcon />
                            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">2</span>
                        </button>
                        <div className="flex items-center gap-2">
                            {user && <span className="text-sm font-semibold text-gray-800">{user.fullname}</span>}
                            <button className="hover:text-indigo-600 transition-colors"><UserIcon /></button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const Hero = () => (
    <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
                <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28 relative z-20">
                    <div className="sm:text-center lg:text-left bg-white/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-6 lg:p-0 rounded-2xl">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">Discover Your Style</span>{' '}
                            <span className="block text-indigo-600 xl:inline">with ZIVA</span>
                        </h1>
                        <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                            Premium fashion curated for every personality. Elevate your wardrobe with our latest exclusive collections.
                        </p>
                        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                                Shop Now
                            </button>
                            <button className="w-full flex items-center justify-center px-8 py-3 border-2 border-indigo-600 text-base font-medium rounded-xl text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
                                Explore Collection
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <div className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:w-1/2 lg:left-auto">
            <div className="h-full w-full relative">
                <img
                    className="w-full h-full object-cover object-top"
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                    alt="Fashion Model"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent lg:via-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-white"></div>
            </div>
        </div>
    </div>
);

const CategorySection = () => {
    const categories = [
        { name: 'Men', img: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop' },
        { name: 'Women', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop' },
        { name: 'Shirts', img: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSdKsQl_2XA_l5nxbHfxIiVd7dUQHyjN2msu5p_nrtFbOaNE76CaMe6-9-H6OU0iMZWuxGjNtXCFJfZW4iOKTYllBs4ynOudJcBhWIF_eTakMGCJcTRcwMmGg' },
        { name: 'Jeans', img: 'https://rukminim2.flixcart.com/image/1536/1536/xif0q/jean/t/8/s/34-sd-men-s-blue-tint-baggy-steple-denims-original-imahg3z6zmzwdhut.jpeg?q=90' },
        { name: 'Shoes', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop' },
        { name: 'Accessories', img: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=800&auto=format&fit=crop' },
    ];

    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
                            <div className="aspect-[4/5] relative">
                                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-white text-xl font-bold tracking-wide">{cat.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const FeaturesSection = () => {
    const features = [
        { icon: '🚚', title: 'Free Shipping', desc: 'On orders over ₹999' },
        { icon: '🔄', title: 'Easy Returns', desc: '15-day return policy' },
        { icon: '💳', title: 'Secure Payments', desc: '100% safe & secure' },
        { icon: '⭐', title: 'Premium Quality', desc: 'Top grade materials' },
    ];

    return (
        <div className="bg-white py-16 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feat, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                            <div className="text-4xl mb-4">{feat.icon}</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{feat.title}</h3>
                            <p className="text-sm text-gray-500">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Newsletter = () => (
    <div className="bg-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">Stay Updated with ZIVA</h2>
            <p className="text-indigo-100 mb-8 max-w-2xl text-lg">Subscribe to our newsletter to get the latest updates on new arrivals, exclusive discounts, and fashion trends.</p>
            <div className="flex w-full max-w-md bg-white rounded-full p-1.5 shadow-lg">
                <input type="email" placeholder="Email Address" className="flex-1 bg-transparent px-6 py-3 outline-none text-gray-700 w-full" />
                <button className="bg-indigo-900 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-800 transition-colors whitespace-nowrap">Subscribe</button>
            </div>
        </div>
    </div>
);

const Footer = () => (
    <footer className="bg-gray-900 py-16 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div>
                    <h3 className="text-3xl font-black text-white tracking-tighter mb-6">ZIVA</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">Premium fashion curated for every personality. Discover your style today and elevate your everyday look.</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">About</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-white mb-6">Support</h4>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Returns</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">FAQ</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Shipping</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-white mb-6">Social</h4>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Instagram</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Facebook</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
                <p>&copy; 2026 ZIVA. All Rights Reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <span>💳 Visa</span>
                    <span>💳 MasterCard</span>
                    <span>💳 PayPal</span>
                </div>
            </div>
        </div>
    </footer>
);

const Home = () => {
    const products = useSelector(state => state.product.products);
    const { handleGetAllProducts } = useProduct();
    const navigate = useNavigate()

    useEffect(() => {
        handleGetAllProducts();
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-indigo-200 selection:text-indigo-900">
            <Navbar />
            <Hero />
            
            {/* Category Section */}
            <CategorySection />

            {/* PRODUCT SECTION */}
            <main className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <div className="mb-14 text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Trending Collection</h2>
                    <div className="h-1.5 w-24 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <div
                            onClick={()=> navigate(`/product/${product._id}`)}
                             key={product._id}  className="group flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 overflow-hidden border border-gray-100">
                                {/* Top: Product Image */}
                                <div  className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                                    {product.images && product.images.length > 0 ? (
                                        <img
                                            src={product.images[0].url}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
                                    )}
                                    <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                                        <HeartIcon />
                                    </button>
                                </div>
                                
                                {/* Middle & Bottom: Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{product.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1 leading-relaxed">{product.description}</p>
                                    
                                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
                                        <div className="font-extrabold text-2xl text-gray-900">
                                            {product.price?.currency === 'INR' ? '₹' : product.price?.currency}{product.price?.amount?.toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3 mt-6">
                                        <button className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-colors text-sm">
                                            View Details
                                        </button>
                                        <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-24 flex flex-col justify-center items-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-6"></div>
                            <p className="text-xl font-medium text-gray-500">Curating the best collections...</p>
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