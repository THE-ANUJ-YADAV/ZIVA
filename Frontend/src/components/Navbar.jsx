import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { useEffect } from 'react';
import { getWishlistApi } from '../features/wishlist/service/wishlist.api';
import { setWishlistItems } from '../features/wishlist/state/wishlist.slice';
import { getCart } from '../features/cart/service/cart.api';
import { setCart } from '../features/cart/state/cart.slice';

// --- Icons ---
export const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
export const HeartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>);
export const CartIcon = ({ className = "h-6 w-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>);
export const UserIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>);

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth?.user);
    const wishlistItems = useSelector(state => state.wishlist?.items || []);
    const cartItems = useSelector(state => state.cart?.items || []);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        if (user) {
            getWishlistApi().then(res => {
                if (res.success) {
                    dispatch(setWishlistItems(res.wishlist.items));
                }
            }).catch(err => console.error(err));

            getCart().then(res => {
                if (res.success) {
                    dispatch(setCart(res.cart));
                }
            }).catch(err => console.error(err));
        }
    }, [user, dispatch]);

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100/80 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Left - Logo */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-950 via-indigo-900 to-indigo-700 flex items-center justify-center text-white shadow-sm shadow-indigo-950/20 group-hover:scale-105 transition-transform">
                                <span className="font-brand font-bold text-lg tracking-wider">Z</span>
                            </div>
                            <span className="font-brand text-2xl font-bold tracking-[0.25em] text-gray-950 uppercase group-hover:text-indigo-900 transition-colors">
                                ZIVA
                            </span>
                        </Link>
                    </div>
                    
                    {/* Center - Links */}
                    <div className="hidden md:flex space-x-7 items-center">
                        {['Home', 'Men', 'Women', 'New Arrivals', 'Categories'].map((item) => (
                            <Link 
                                key={item} 
                                to="/" 
                                className="text-[13px] font-semibold uppercase tracking-wider text-gray-700 hover:text-indigo-600 relative group transition-colors duration-200 py-1"
                            >
                                {item}
                                <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-indigo-600 transition-all duration-200 group-hover:w-full rounded-full"></span>
                            </Link>
                        ))}
                        {user?.role === 'seller' && (
                            <Link to="/seller/dashboard" className="bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all duration-200 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-sm ml-2">
                                Seller Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Right - Icons */}
                    <div className="flex items-center space-x-3 text-gray-700">
                        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 hover:text-indigo-600 transition-colors" title="Search">
                            <SearchIcon />
                        </button>
                        <Link 
                            to="/wishlist" 
                            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 hover:text-indigo-600 transition-colors relative"
                            title="Wishlist"
                        >
                            <HeartIcon />
                            {wishlistItems.length > 0 && (
                                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold h-4 min-w-4 px-1 rounded-full flex items-center justify-center ring-2 ring-white">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>
                        <Link 
                            to="/cart" 
                            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 hover:text-indigo-600 transition-colors relative"
                            title="Shopping Bag"
                        >
                            <CartIcon />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] font-bold h-4 min-w-4 px-1 rounded-full flex items-center justify-center ring-2 ring-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <div className="flex items-center gap-2 pl-2 border-l border-gray-200 ml-1">
                            {user ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-gray-800 max-w-[120px] truncate hidden sm:inline-block">
                                        {user.fullname}
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold">
                                        {user.fullname ? user.fullname.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                </div>
                            ) : (
                                <Link 
                                    to="/login" 
                                    className="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 px-3 py-1.5 rounded-full hover:bg-indigo-50 transition-colors"
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
