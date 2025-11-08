import { useState, useEffect } from "react";
import { api } from "../services/api";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import { Loader2, PackageX } from "lucide-react";
import ProductSkeleton from "./ProductSkeleton";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
        setFilteredProducts(data);

        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((p) => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (searchTerm) => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleFilter = ({ category, priceRange }) => {
    let filtered = products;

    // Category filter
    if (category && category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    // Price filter
    if (priceRange && priceRange !== "all") {
      if (priceRange === "0-50") {
        filtered = filtered.filter((p) => p.price < 50);
      } else if (priceRange === "50-100") {
        filtered = filtered.filter((p) => p.price >= 50 && p.price <= 100);
      } else if (priceRange === "100+") {
        filtered = filtered.filter((p) => p.price > 100);
      }
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse" />
          <div className="h-5 bg-gray-200 rounded w-64 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Now 🔥</h2>
      <p className="text-gray-600">Curated picks just for you</p>
    </div>

    <SearchBar
      onSearch={handleSearch}
      onFilter={handleFilter}
      categories={categories}
    />

    {filteredProducts.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-16">
        <PackageX className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    )}
  </div>
);
};



export default ProductGrid;
