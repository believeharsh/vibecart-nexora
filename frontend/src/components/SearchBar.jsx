import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

const SearchBar = ({ onSearch, onFilter, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('all');

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilter({ category, priceRange });
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    onFilter({ category: selectedCategory, priceRange: range });
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange('all');
    setSearchTerm('');
    onSearch('');
    onFilter({ category: 'All', priceRange: 'all' });
  };

  return (
    <div className="mb-8">
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center gap-2 font-semibold"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900">Category</h3>
              {(selectedCategory !== 'All' || priceRange !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'All', value: 'all' },
                { label: 'Under $50', value: '0-50' },
                { label: '$50 - $100', value: '50-100' },
                { label: 'Over $100', value: '100+' }
              ].map((range) => (
                <button
                  key={range.value}
                  onClick={() => handlePriceChange(range.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    priceRange === range.value
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;