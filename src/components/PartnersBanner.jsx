import React, { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

// 导入合作伙伴logo图片
import partner1 from "../assets/partners/images.png";
import partner2 from "../assets/partners/588ce1_997e24a226c44900a2e11ebf84999bbd~mv2.png";
import partner3 from "../assets/partners/OBP-Blk-Vert-Large.png";
import partner4 from "../assets/partners/Ajinomoto-Logo.jpg";
import partner5 from "../assets/partners/logo+2_transparent.png";
import partner6 from "../assets/partners/Bakkafrost_logo.svg.png";

const PartnersBanner = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 合作伙伴数据
  const partners = [
    { id: 1, logo: partner1, name: "Partner 1" },
    { id: 2, logo: partner2, name: "Partner 2" },
    { id: 3, logo: partner3, name: "Partner 3" },
    { id: 4, logo: partner4, name: "Partner 4" },
    { id: 5, logo: partner5, name: "Partner 5" },
    { id: 6, logo: partner6, name: "Partner 6" },
  ];

  // 自动滚动效果
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
    }, 3000); // 每3秒切换一次

    return () => clearInterval(interval);
  }, [partners.length]);

  return (
    <div className="w-full py-20 bg-gradient-to-br from-[#002366] to-[#1e40af] relative overflow-hidden">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
          <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            {t("about.clients.title")}
          </span>
        </h2>

        <div className="max-w-6xl mx-auto">
          {/* 滚动Banner容器 */}
          <div className="relative overflow-hidden">
            {/* 滚动条 */}
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {partners.map((partner, index) => (
                <div key={partner.id} className="flex-shrink-0 w-1/3 px-4">
                  <div className="group bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center hover:border-2 hover:border-[#002366]/30 h-32">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersBanner;
