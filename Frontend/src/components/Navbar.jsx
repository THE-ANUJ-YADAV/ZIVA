import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { useEffect } from 'react';
import { getWishlistApi } from '../features/wishlist/service/wishlist.api';
import { setWishlistItems } from '../features/wishlist/state/wishlist.slice';
import { getCart } from '../features/cart/service/cart.api';
import { setItems } from '../features/cart/state/cart.slice';

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
                    dispatch(setItems(res.cart.items));
                }
            }).catch(err => console.error(err));
        }
    }, [user, dispatch]);

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Left - Logo */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer gap-2">
                        <Link to="/" className="flex items-center gap-2">
                            <CartIcon className="h-10 w-10 text-[#2E2A8F]" />
                            <span className="text-4xl font-black tracking-[0.3em] uppercase text-[#2E2A8F] drop-shadow-sm">
                                ZIVA
                            </span>
                        </Link>
                    </div>
                    
                    {/* Center - Links */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {['Home', 'Men', 'Women', 'New Arrivals', 'Categories'].map((item) => (
                            <a key={item} href="#" className="text-gray-800 font-medium hover:text-indigo-600 relative group transition-colors duration-300">
                                {item}
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                        {user?.role === 'seller' && (
                            <Link to="/seller/dashboard" className="bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors duration-300 px-4 py-1.5 rounded-full text-sm shadow-sm ml-2">
                                Seller Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Right - Icons */}
                    <div className="flex items-center space-x-6 text-gray-600">
                        <button className="hover:text-indigo-600 transition-colors"><SearchIcon /></button>
                        <button className="hover:text-indigo-600 transition-colors relative">
                            <Link to="/wishlist">
                                <HeartIcon />
                            </Link>
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </button>
                        <button className="hover:text-indigo-600 transition-colors relative">
                            <Link to="/cart">
                                <CartIcon/>
                            </Link>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <div className="flex items-center gap-2">
                            {user ? (
                                <span className="text-sm font-semibold text-gray-800">{user.fullname}</span>
                            ) : (
                                <Link to="/login" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Login</Link>
                            )}
                            <button className="hover:text-indigo-600 transition-colors"><UserIcon /></button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
