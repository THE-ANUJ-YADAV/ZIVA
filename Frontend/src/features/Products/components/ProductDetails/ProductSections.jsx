import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiTruck, FiShield, FiRotateCcw } from 'react-icons/fi';

const Section = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center focus:outline-none"
            >
                <h3 className="text-lg font-semibold text-gray-900 tracking-wide">{title}</h3>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <FiChevronDown className="text-gray-500" size={20} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 text-gray-600 text-sm leading-relaxed">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ProductSections = ({ displayDesc, specs }) => {
    return (
        <div className="w-full mt-24 max-w-4xl mx-auto">
            {/* Horizontal Sections */}
            
            <Section title="Product Description" defaultOpen={true}>
                <div className="whitespace-pre-wrap">{displayDesc}</div>
            </Section>

            <Section title="Product Details & Features">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {Object.entries(specs).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{key}</span>
                            <span className="text-sm font-medium text-gray-900">{value}</span>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Size Guide">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-900">
                                <th className="pb-3 font-semibold">Size</th>
                                <th className="pb-3 font-semibold">Chest (in)</th>
                                <th className="pb-3 font-semibold">Waist (in)</th>
                                <th className="pb-3 font-semibold">Length (in)</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            <tr className="border-b border-gray-100">
                                <td className="py-3 font-medium text-gray-900">S</td>
                                <td className="py-3">38</td>
                                <td className="py-3">36</td>
                                <td className="py-3">28</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-3 font-medium text-gray-900">M</td>
                                <td className="py-3">40</td>
                                <td className="py-3">38</td>
                                <td className="py-3">29</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-3 font-medium text-gray-900">L</td>
                                <td className="py-3">42</td>
                                <td className="py-3">40</td>
                                <td className="py-3">30</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-3 font-medium text-gray-900">XL</td>
                                <td className="py-3">44</td>
                                <td className="py-3">42</td>
                                <td className="py-3">31</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="Delivery Information">
                <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                        <FiTruck className="text-indigo-600 mt-1" size={20} />
                        <div>
                            <p className="font-semibold text-gray-900 mb-1">Free Standard Delivery</p>
                            <p>Delivery within 3-5 business days. Free for orders over ₹999.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <BsLightningFill className="text-indigo-600 mt-1" size={20} />
                        <div>
                            <p className="font-semibold text-gray-900 mb-1">Express Delivery</p>
                            <p>Delivery within 1-2 business days. Additional charges apply.</p>
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Return Policy">
                <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                        <FiRotateCcw className="text-indigo-600 mt-1" size={20} />
                        <div>
                            <p className="font-semibold text-gray-900 mb-1">15-Day Returns</p>
                            <p>We offer a hassle-free 15-day return policy. Items must be unused, unwashed, and with all original tags attached.</p>
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Customer Reviews (128)">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4 mb-2">
                        <h4 className="text-4xl font-bold text-gray-900">4.8</h4>
                        <div className="flex flex-col">
                            <div className="flex text-yellow-500 text-lg">
                                ★★★★★
                            </div>
                            <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">Based on 128 Reviews</span>
                        </div>
                    </div>
                    
                    {/* Mock Review */}
                    <div className="border-t border-gray-100 pt-6">
                        <div className="flex justify-between items-center mb-2">
                            <div className="font-semibold text-gray-900">Sarah M.</div>
                            <div className="text-xs text-gray-400">2 days ago</div>
                        </div>
                        <div className="flex text-yellow-500 text-sm mb-3">★★★★★</div>
                        <p className="text-gray-600 text-sm leading-relaxed">Absolutely love the quality of this product! The fit is perfect and the material feels very premium. Will definitely be purchasing more from ZIVA.</p>
                    </div>
                    
                    <button className="text-sm font-semibold text-indigo-600 border border-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-50 transition-colors w-max mt-4">
                        Read All Reviews
                    </button>
                </div>
            </Section>
            
        </div>
    );
};

// Also import BsLightningFill at the top since we use it
import { BsLightningFill } from 'react-icons/bs';

export default ProductSections;
