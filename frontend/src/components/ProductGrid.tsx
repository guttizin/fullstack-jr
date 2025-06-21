import React from 'react';
import ProductCard from './ProductCard';
import { IoClose } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import type { Product, SortOption } from './Shop';

interface ProductGridProps {
    products: Product[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    onPageChange: (page: number) => void;
    sortBy: SortOption;
    onSortChange: (sortOption: SortOption) => void;
    activeFilters: {
        categories: string[];
        materials: string[];
        price: { min: number; max: number };
    };
    onRemoveFilter: (filterType: 'categories' | 'materials', value: string) => void;
    onRemovePriceFilter: () => void;
    onClearAllFilters: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
    products, 
    loading, 
    error, 
    currentPage, 
    totalPages,
    totalProducts,
    onPageChange,
    sortBy,
    onSortChange,
    activeFilters,
    onRemoveFilter,
    onRemovePriceFilter,
    onClearAllFilters
}) => {

    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 7;
        
        if (totalPages <= maxVisiblePages) {
            // Show all pages if total is 7 or less
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={`px-3 py-2 mx-1 rounded-lg transition-colors ${currentPage === i
                            ? 'bg-green-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            // Complex pagination logic
            let startPage = Math.max(1, currentPage - 3);
            const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            
            // Adjust start page if we're near the end
            if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
            
            // Ellipsis after first page
            if (startPage > 2) {
                pages.push(
                    <span key="ellipsis1" className="px-3 py-2 mx-1 text-gray-500">
                        ...
                    </span>
                );
            }
            
            // Visible pages
            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={`px-3 py-2 mx-1 rounded-lg transition-colors ${currentPage === i
                            ? 'bg-green-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                    >
                        {i}
                    </button>
                );
            }
        }
        
        return pages;
    };

    const hasActiveFilters = () => {
        return activeFilters.categories.length > 0 || 
               activeFilters.materials.length > 0 || 
               activeFilters.price.min > 0 || 
               activeFilters.price.max < 3000;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <p className="text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <main className="space-y-6 p-10 sm:p-10">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="text-gray-600">
                    Showing {products.length} results of {totalProducts} products
                </div>
                <div className="flex items-center space-x-2">
                    <label htmlFor="sort" className="text-gray-700 font-medium">Sort by:</label>
                    <select 
                        id="sort" 
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value as SortOption)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        <option value="default">Default Sorting</option>
                        <option value="popularity">Popularity</option>
                        <option value="price_low_high">Price: Low to High</option>
                        <option value="price_high_low">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters() && (
                <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <span className="text-gray-700 font-medium">Active Filters:</span>
                    
                    {/* Category Filters */}
                    {activeFilters.categories.map(category => (
                        <span key={`category-${category}`} className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            Category: {category}
                            <button 
                                onClick={() => onRemoveFilter('categories', category)}
                                className="hover:text-blue-900"
                            >
                                <IoClose size={16} />
                            </button>
                        </span>
                    ))}
                    
                    {/* Material Filters */}
                    {activeFilters.materials.map(material => (
                        <span key={`material-${material}`} className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                            Material: {material}
                            <button 
                                onClick={() => onRemoveFilter('materials', material)}
                                className="hover:text-purple-900"
                            >
                                <IoClose size={16} />
                            </button>
                        </span>
                    ))}
                    
                    {/* Price Filter */}
                    {(activeFilters.price.min > 0 || activeFilters.price.max < 3000) && (
                        <span className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            Price: ${activeFilters.price.min.toFixed(2)} - ${activeFilters.price.max.toFixed(2)}
                            <button 
                                onClick={onRemovePriceFilter}
                                className="hover:text-green-900"
                            >
                                <IoClose size={16} />
                            </button>
                        </span>
                    )}
                    
                    <button 
                        onClick={onClearAllFilters}
                        className="text-gray-600 hover:text-gray-800 text-sm underline"
                    >
                        Clear All
                    </button>
                </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard key={`${product.provider}-${product.id}`} product={product} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                    {/* First Page Button */}
                    <button 
                        onClick={() => onPageChange(1)} 
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-lg transition-colors ${currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                        title="First page"
                    >
                        <FaAngleDoubleLeft size={14} />
                    </button>
                    
                    {/* Previous Button */}
                    <button 
                        onClick={() => onPageChange(currentPage - 1)} 
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-lg transition-colors ${currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                        title="Previous page"
                    >
                        <FaChevronLeft size={14} />
                    </button>
                    
                    {/* Page Numbers */}
                    {renderPagination()}
                    
                    {/* Next Button */}
                    <button 
                        onClick={() => onPageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded-lg transition-colors ${currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                        title="Next page"
                    >
                        <FaChevronRight size={14} />
                    </button>
                    
                    {/* Last Page Button */}
                    <button 
                        onClick={() => onPageChange(totalPages)} 
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded-lg transition-colors ${currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                        title="Last page"
                    >
                        <FaAngleDoubleRight size={14} />
                    </button>
                </div>
            )}
        </main>
    );
};

export default ProductGrid;