import React, { useState } from "react";
import { getImageUrl } from "../services/apiService";

const ProductImage = ({
  imagePath,
  alt = "Product Image",
  className = "w-full h-48 object-cover rounded-lg",
  fallbackClassName = "w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center",
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  // 获取图片URL
  const imageUrl = imagePath ? getImageUrl(imagePath) : null;

  // 如果没有图片路径或图片加载失败，显示占位符
  if (!imageUrl || imageError) {
    return (
      <div className={fallbackClassName}>
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-500">暂无图片</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {imageLoading && (
        <div className={`${className} bg-gray-200 animate-pulse`}>
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400">加载中...</div>
          </div>
        </div>
      )}
      <img
        src={imageUrl}
        alt={alt}
        className={`${className} ${imageLoading ? "hidden" : ""}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />
    </div>
  );
};

export default ProductImage; 