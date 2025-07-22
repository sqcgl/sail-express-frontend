import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-ocean-900 via-ocean-800 to-sea-900 relative overflow-hidden">
      {/* 科技感背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

      {/* 几何装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-md"></div>
      </div>

      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* 公司信息 */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <span className="text-white font-bold text-xl">SE</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Sail Express</h3>
                  <p className="text-white/70 text-sm">专业寿司食材批发</p>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed">
                专业的寿司海鲜餐厅物品批发商，为您的寿司店提供优质食材和器具，是您值得信赖的合作伙伴。
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: "📧", label: "邮箱" },
                  { icon: "📱", label: "微信" },
                  { icon: "📞", label: "电话" },
                ].map((social, index) => (
                  <button
                    key={index}
                    className="group w-12 h-12 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
                  >
                    <span className="text-white text-lg group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 快速链接 */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-white">快速链接</h4>
              <div className="space-y-3">
                {[
                  { path: "/", label: "首页" },
                  { path: "/about", label: "关于我们" },
                  { path: "/products", label: "产品列表" },
                  { path: "/contact", label: "联系我们" },
                ].map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="block text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2 group"
                  >
                    <span className="relative">
                      {link.label}
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 产品分类 */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-white">产品分类</h4>
              <div className="space-y-3">
                {[
                  "新鲜海鲜",
                  "寿司食材",
                  "调味料",
                  "厨房器具",
                  "包装材料",
                  "冷冻食品",
                ].map((category, index) => (
                  <button
                    key={index}
                    className="block text-white/80 hover:text-white transition-all duration-300 hover:translate-x-2 group text-left w-full"
                  >
                    <span className="relative">
                      {category}
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 联系信息 */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-white">联系我们</h4>
              <div className="space-y-4">
                {[
                  { icon: "📍", label: "地址", value: "深圳市南山区科技园" },
                  { icon: "📞", label: "电话", value: "400-888-8888" },
                  { icon: "📧", label: "邮箱", value: "info@sail-express.com" },
                  {
                    icon: "🕒",
                    label: "营业时间",
                    value: "周一至周日 8:00-18:00",
                  },
                ].map((contact, index) => (
                  <div key={index} className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all duration-300">
                      <span className="text-white text-sm">{contact.icon}</span>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm font-medium">
                        {contact.label}
                      </p>
                      <p className="text-white/90 text-sm">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 分隔线 */}
          <div className="border-t border-white/20 my-12"></div>

          {/* 底部信息 */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/70 text-sm">
              © 2024 Sail Express. 保留所有权利。
            </div>
            <div className="flex space-x-6">
              {[
                { label: "隐私政策", path: "/privacy" },
                { label: "服务条款", path: "/terms" },
                { label: "网站地图", path: "/sitemap" },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-white/70 hover:text-white text-sm transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
