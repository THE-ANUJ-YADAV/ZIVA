import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-indigo-200 selection:text-indigo-900">
            <Navbar />
            <Outlet />
            <Toaster position="top-right" />
        </div>
    );
};

export default Layout;
