import React, { useState } from 'react';

interface SidebarProps {
    categories: string[];
    materials: string[];
    onFilterChange: (filterType: 'categories' | 'materials', value: string) => void;
    onPriceChange: (min: number, max: number) => void;
    activeFilters: {
        categories: string[];
        materials: string[];
        price: { min: number; max: number };
    };
}

const Sidebar: React.FC<SidebarProps> = ({ categories, materials, onFilterChange, onPriceChange, activeFilters }) => {
    const [price, setPrice] = useState(activeFilters.price.max);

    const handlePriceCommit = () => {
        onPriceChange(0, price); // Assuming min is always 0 for this slider
    };
    
    return (
        <div className="bg-white rounded-lg shadow-md transition-all duration-300 w-full">
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full lg:hidden block" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
                    <div className="space-y-2 font-medium">
                        {/* Categories Filter */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">By Categories</h4>
                            <div className="space-y-3">
                                {categories.map(category => (
                                    <label key={category} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={activeFilters.categories.includes(category)}
                                            onChange={() => onFilterChange('categories', category)}
                                            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="text-gray-700">{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Materials Filter */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">By Materials</h4>
                            <div className="space-y-3">
                                {materials.map(material => (
                                    <label key={material} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={activeFilters.materials.includes(material)}
                                            onChange={() => onFilterChange('materials', material)}
                                            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <span className="text-gray-700">{material}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Price</h4>
                            <div className="space-y-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="3000"
                                    value={price}
                                    onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                                    onMouseUp={handlePriceCommit}
                                    onTouchEnd={handlePriceCommit}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                />
                                <span className="text-gray-700 font-medium">$0.00 - ${price.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Review Filter */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Review</h4>
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2" />
                                    <span className="text-gray-700">⭐⭐⭐⭐⭐ 5 Star</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2" />
                                    <span className="text-gray-700">⭐⭐⭐⭐ 4 Star</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2" />
                                    <span className="text-gray-700">⭐⭐⭐ 3 Star</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2" />
                                    <span className="text-gray-700">⭐⭐ 2 Star</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2" />
                                    <span className="text-gray-700">⭐ 1 Star</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Sidebar Content */}
            <div className="p-6 lg:block hidden">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Filter Options</h3>

                {/* Categories Filter */}
                <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">By Categories</h4>
                    <div className="space-y-3">
                        {categories.map(category => (
                            <label key={category} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={activeFilters.categories.includes(category)}
                                    onChange={() => onFilterChange('categories', category)}
                                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                />
                                <span className="text-gray-700">{category}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Materials Filter */}
                <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">By Materials</h4>
                    <div className="space-y-3">
                        {materials.map(material => (
                            <label key={material} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={activeFilters.materials.includes(material)}
                                    onChange={() => onFilterChange('materials', material)}
                                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                />
                                <span className="text-gray-700">{material}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Filter */}
                <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Price</h4>
                    <div className="space-y-4">
                        <input
                            type="range"
                            min="0"
                            max="2000"
                            value={price}
                            onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                            onMouseUp={handlePriceCommit}
                            onTouchEnd={handlePriceCommit}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <span className="text-gray-700 font-medium">$0.00 - ${price.toFixed(2)}</span>
                    </div>
                </div>

                {/* Review Filter */}
                <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Review</h4>
                    <div className="space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2" />
                            <span className="text-gray-700">⭐⭐⭐⭐⭐ 5 Star</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2" />
                            <span className="text-gray-700">⭐⭐⭐⭐ 4 Star</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2" />
                            <span className="text-gray-700">⭐⭐⭐ 3 Star</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2" />
                            <span className="text-gray-700">⭐⭐ 2 Star</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2" />
                            <span className="text-gray-700">⭐ 1 Star</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar; 