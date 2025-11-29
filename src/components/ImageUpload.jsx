import React, { useState, useRef, useEffect } from "react";
import { getImageUrl } from "../services/apiService";

const ImageUpload = ({
  currentImage,
  onImageChange,
  onImageRemove,
  className = "",
  disabled = false,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // 当currentImage改变时更新预览
  useEffect(() => {
    if (currentImage) {
      const imageUrl = getImageUrl(currentImage);
      setPreviewUrl(imageUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [currentImage]);

  // 处理文件选择
  const handleFileSelect = (file) => {
    if (!file) return;

    // 验证文件类型
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("请选择有效的图片文件 (JPEG, PNG, GIF, WebP)");
      return;
    }

    // 验证文件大小 (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("图片文件大小不能超过5MB");
      return;
    }

    // 创建预览URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // 通知父组件
    onImageChange(file);
  };

  // 处理拖拽事件
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // 处理拖拽放下
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // 处理文件输入变化
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  // 删除图片
  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 点击上传区域
  const handleUploadClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`image-upload ${className}`}>
      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* 上传区域 */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
          ${
            dragActive
              ? "border-[#002366] bg-blue-50"
              : "border-ocean-300 hover:border-ocean-400"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${previewUrl ? "border-solid" : ""}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleUploadClick}
      >
        {previewUrl ? (
          // 图片预览
          <div className="relative">
            <img
              src={previewUrl}
              alt="产品图片预览"
              className="max-w-full h-48 object-cover rounded-lg mx-auto"
            />
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-colors"
                title="删除图片"
              >
                ×
              </button>
            )}
          </div>
        ) : (
          // 上传提示
          <div className="space-y-4">
            <div className="text-6xl text-ocean-400">📷</div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-ocean-700">
                {dragActive ? "释放鼠标上传图片" : "点击或拖拽上传图片"}
              </p>
              <p className="text-sm text-ocean-500">
                支持 JPEG, PNG, GIF, WebP 格式，最大 5MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 上传提示信息 */}
      {!previewUrl && !disabled && (
        <div className="mt-2 text-xs text-ocean-500">
          💡 提示：您可以拖拽图片文件到上方区域，或点击选择文件
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
