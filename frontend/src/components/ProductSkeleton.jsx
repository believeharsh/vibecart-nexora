const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      <div className="w-full h-64 bg-gray-200" />
      <div className="p-5">
        <div className="h-6 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded mb-4 w-3/4" />
        <div className="h-12 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default ProductSkeleton;