import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import chuttersnap from "../assets/carousel/chuttersnap-bmJIOogVW-w-unsplash.jpg";
import duangphorn from "../assets/carousel/duangphorn-wiriya-vJzsb8W2lhQ-unsplash.jpg";
import karyna from "../assets/carousel/karyna-panchenko-1OnuYCARYmc-unsplash.jpg";
import rachel from "../assets/carousel/rachel-martin-MJIUILstEHM-unsplash.jpg";
import michaelWave1 from "../assets/carousel/michael-wave-qdXgjxS3tZk-unsplash.jpg";
import michaelWave2 from "../assets/carousel/michael-wave-5BlIoNsg1zY-unsplash.jpg";

const Home = () => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 轮播图片数组
  const carouselImages = [
    chuttersnap,
    duangphorn,
    karyna,
    rachel,
    michaelWave1,
    michaelWave2,
  ];

  // 自动轮播效果
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 每5秒切换一次

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="w-full">
      {/* Hero区域 - 自动轮播背景 */}
      <section className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* 轮播背景图片 */}
        <div className="absolute inset-0">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                alt={`Carousel image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* 图片遮罩层，确保文字可读性 */}
              <div className="absolute inset-0 bg-gradient-to-bl from-white/20 via-[#002366]/40 to-[#002366]/80"></div>
            </div>
          ))}
        </div>

        {/* 科技感背景几何图形 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/30 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white/20 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/40 rounded-full blur-md animate-pulse delay-1500"></div>
        </div>

        {/* 轮播指示器 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <div className="inline-block p-2 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 hover:border hover:border-white/20 transition-all duration-300">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Sail Express
              </h1>
            </div>
            <p className="text-xl md:text-2xl lg:text-3xl text-white mb-12 max-w-6xl mx-auto leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-xl mb-8 hover:border hover:border-white/10 transition-all duration-300">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="group bg-white hover:bg-gray-100 text-[#002366] font-semibold py-4 px-10 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:scale-105 relative overflow-hidden">
                <span className="relative z-10">
                  {t("home.hero.viewProducts")}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group bg-transparent hover:bg-white/10 text-white font-semibold py-4 px-10 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm hover:border-2 hover:border-white">
                {t("home.hero.contactUs")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 核心业务展示 - 科技感卡片 */}
      <section className="w-full py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-50/50 to-transparent"></div>
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-ocean-900 mb-16">
            <span className="bg-gradient-to-r from-ocean-900 to-sea-700 bg-clip-text text-transparent">
              {t("home.coreBusiness.title")}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* 产品批发 */}
            <div className="group bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-md rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden hover:border-2 hover:border-[#002366]/30">
              <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#002366] to-[#1e40af] rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-ocean-900 mb-6 text-center">
                  {t("home.coreBusiness.wholesale.title")}
                </h3>
                <p className="text-ocean-700 text-lg leading-relaxed text-center">
                  {t("home.coreBusiness.wholesale.description")}
                </p>
              </div>
            </div>

            {/* 专业服务 */}
            <div className="group bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-md rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden hover:border-2 hover:border-[#002366]/30">
              <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#002366] to-[#1e40af] rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-ocean-900 mb-6 text-center">
                  {t("home.coreBusiness.service.title")}
                </h3>
                <p className="text-ocean-700 text-lg leading-relaxed text-center">
                  {t("home.coreBusiness.service.description")}
                </p>
              </div>
            </div>

            {/* 品质保证 */}
            <div className="group bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-md rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden hover:border-2 hover:border-[#002366]/30">
              <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#002366] to-[#1e40af] rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-ocean-900 mb-6 text-center">
                  {t("home.coreBusiness.quality.title")}
                </h3>
                <p className="text-ocean-700 text-lg leading-relaxed text-center">
                  {t("home.coreBusiness.quality.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 产品预览区域 - 科技感网格 */}
      <section className="w-full py-20 bg-gradient-to-br from-ocean-50 to-sea-50 relative overflow-hidden">
        {/* 科技感背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,35,102,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,35,102,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-ocean-900 mb-16">
            <span className="bg-gradient-to-r from-ocean-900 to-sea-700 bg-clip-text text-transparent">
              {t("home.featuredProducts.title")}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* 产品卡片 */}
            {t("home.featuredProducts.items").map((product, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-2 hover:border-[#002366]/30"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="text-ocean-700 text-lg font-medium relative z-10">
                    {product.name}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-sm text-ocean-600 font-medium">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-semibold text-ocean-900 mt-2">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-ocean-900 mt-2">
                    {product.price}
                  </p>
                  <button className="w-full mt-4 bg-gradient-to-r from-[#002366] to-[#1e40af] hover:from-[#1e40af] hover:to-[#002366] text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105">
                    {t("home.featuredProducts.inquiry")}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="group bg-gradient-to-r from-[#002366] to-[#1e40af] hover:from-[#1e40af] hover:to-[#002366] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:scale-105">
              <span className="relative z-10">
                {t("home.featuredProducts.viewAll")}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 服务优势区域 - 科技感图标 */}
      <section className="w-full py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-50/30 to-transparent"></div>
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-ocean-900 mb-16">
            <span className="bg-gradient-to-r from-ocean-900 to-sea-700 bg-clip-text text-transparent">
              {t("home.advantages.title")}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {t("home.advantages.items").map((item, index) => (
              <div
                key={index}
                className="group text-center bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-md rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-2 hover:border-[#002366]/30"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-ocean-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-ocean-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
