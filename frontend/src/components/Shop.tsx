import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ProductGrid from './ProductGrid';
import axios from 'axios';
import API_URL from '../config';
import { FaFilter } from 'react-icons/fa';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    material: string;
    department: string;
    gallery: string[];
    provider: 'brazilian' | 'european';
    hasDiscount: boolean;
}

export type SortOption = 'default' | 'price_low_high' | 'price_high_low' | 'popularity';

const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [materials, setMaterials] = useState<string[]>([]);
    const [activeFilters, setActiveFilters] = useState<{
        categories: string[];
        materials: string[];
        price: { min: number; max: number };
    }>({
        categories: [],
        materials: [],
        price: { min: 0, max: 3000 }
    });
    const [sortBy, setSortBy] = useState<SortOption>('default');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const productsPerPage = 12;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                params.append('_page', currentPage.toString());
                params.append('_limit', productsPerPage.toString());

                // Add category filters
                if (activeFilters.categories.length > 0) {
                    activeFilters.categories.forEach(category => {
                        params.append('category', category);
                    });
                }

                // Add material filters
                if (activeFilters.materials.length > 0) {
                    activeFilters.materials.forEach(material => {
                        params.append('material', material);
                    });
                }

                params.append('minPrice', activeFilters.price.min.toString());
                params.append('maxPrice', activeFilters.price.max.toString());

                // Add sorting
                if (sortBy !== 'default') {
                    params.append('sortBy', sortBy);
                }

                const response = await axios.get(`${API_URL}/products`, { params });
                const { data, total, categories, materials } = response.data;
                setCategories(categories);
                setMaterials(materials);

                setTotalProducts(total);
                setProducts(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch products. Is the backend server running?');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage, activeFilters, sortBy]);

    const handleFilterChange = (filterType: 'categories' | 'materials', value: string) => {
        setActiveFilters(prev => {
            const currentValues = prev[filterType];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [filterType]: newValues };
        });
        setCurrentPage(1); // Reset to first page on filter change
    };

    const handlePriceChange = (min: number, max: number) => {
        setActiveFilters(prev => ({ ...prev, price: { min, max } }));
        setCurrentPage(1);
    };

    const handleSortChange = (sortOption: SortOption) => {
        setSortBy(sortOption);
        setCurrentPage(1);
    };

    const clearAllFilters = () => {
        setActiveFilters({
            categories: [],
            materials: [],
            price: { min: 0, max: 3000 }
        });
        setSortBy('default');
        setCurrentPage(1);
    };

    const removeFilter = (filterType: 'categories' | 'materials', value: string) => {
        setActiveFilters(prev => ({
            ...prev,
            [filterType]: prev[filterType].filter(v => v !== value)
        }));
        setCurrentPage(1);
    };

    const removePriceFilter = () => {
        setActiveFilters(prev => ({
            ...prev,
            price: { min: 0, max: 3000 }
        }));
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-32">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Shop</h1>
                    <p className="text-gray-600">Home / Shop</p>
                </div>
            </div>

            <div className="w-full lg:hidden">
                {/* Top Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-gray-600 flex justify-center w-full">
                        <div>
                            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                                <span className="sr-only">Open filters</span>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaFilter />
                                    <p className="text-sm font-medium text-gray-600">Filters Options</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Shop Layout */}
            <div className="mx-auto py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="">
                        <Sidebar
                            categories={categories}
                            materials={materials}
                            onFilterChange={handleFilterChange}
                            onPriceChange={handlePriceChange}
                            activeFilters={activeFilters}
                        />
                    </div>

                    {/* Product Grid */}
                    <div className="w-full">
                        <ProductGrid
                            products={products}
                            loading={loading}
                            error={error}
                            currentPage={currentPage}
                            totalPages={Math.ceil(totalProducts / productsPerPage)}
                            totalProducts={totalProducts}
                            onPageChange={setCurrentPage}
                            sortBy={sortBy}
                            onSortChange={handleSortChange}
                            activeFilters={activeFilters}
                            onRemoveFilter={removeFilter}
                            onRemovePriceFilter={removePriceFilter}
                            onClearAllFilters={clearAllFilters}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop; 