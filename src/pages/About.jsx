import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  return (
    <div className="w-full pt-20">
      {/* Hero区域 - 科技感背景 */}
      <section className="w-full py-20 bg-gradient-to-bl from-white via-blue-50 to-[#002366] relative overflow-hidden">
        {/* 科技感背景几何图形 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-1/4 w-40 h-40 bg-[#002366]/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-[#002366]/30 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#002366]/25 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>

        {/* 网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,35,102,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,35,102,0.08)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {t("about.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/20">
              {t("about.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* 公司简介 */}
      <section className="w-full py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-50/30 to-transparent"></div>
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-ocean-900 mb-8">
                  <span className="bg-gradient-to-r from-ocean-900 to-sea-700 bg-clip-text text-transparent">
                    {t("about.company.title")}
                  </span>
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-ocean-700 leading-relaxed">
                    {t("about.company.paragraph1")}
                  </p>
                  <p className="text-lg text-ocean-700 leading-relaxed">
                    {t("about.company.paragraph2")}
                  </p>
                  <p className="text-lg text-ocean-700 leading-relaxed">
                    {t("about.company.paragraph3")}
                  </p>
                </div>

                {/* 数据统计 */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  {t("about.company.stats").map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-md rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-2 hover:border-[#002366]/30">
                        <div className="text-3xl font-bold text-ocean-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                          {stat.number}
                        </div>
                        <div className="text-ocean-700 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-md rounded-2xl p-8 shadow-xl relative overflow-hidden hover:border-2 hover:border-[#002366]/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/5 to-blue-400/5"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-ocean-900 mb-6">
                      {t("about.company.advantages.title")}
                    </h3>
                    <div className="space-y-4">
                      {t("about.company.advantages.items").map(
                        (item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-6 h-6 bg-[#002366] rounded-full flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span className="text-ocean-700 font-medium">
                              {item}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 发展历程 */}
      <section className="w-full py-20 bg-gradient-to-br from-ocean-50 to-sea-50 relative overflow-hidden">
        {/* 科技感背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,35,102,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,35,102,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-ocean-900 mb-16">
            <span className="bg-gradient-to-r from-ocean-900 to-sea-700 bg-clip-text text-transparent">
              {t("about.timeline.title")}
            </span>
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t("about.timeline.items").map((milestone, index) => (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 relative overflow-hidden hover:border-2 hover:border-[#002366]/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-3xl font-bold text-ocean-900 mb-4 group-hover:scale-110 transition-transform duration-300">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-ocean-900 mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-ocean-700 leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 团队介绍 */}
      <section className="w-full py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-50/20 to-transparent"></div>
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-ocean-900 mb-16">
            <span className="bg-gradient-to-r from-ocean-900 to-sea-700 bg-clip-text text-transparent">
              {t("about.team.title")}
            </span>
          </h2>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {t("about.team.members").map((member, index) => (
                <div
                  key={index}
                  className="group text-center bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 relative overflow-hidden hover:border-2 hover:border-[#002366]/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#002366] to-[#1e40af] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <span className="text-white text-2xl font-bold">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-ocean-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-ocean-700 font-medium mb-4">
                      {member.position}
                    </p>
                    <p className="text-ocean-600 leading-relaxed">
                      {member.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 合作客户 */}
      <section className="w-full py-20 bg-gradient-to-br from-ocean-50 to-sea-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,35,102,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,35,102,0.05)_1px,transparent_1px)] bg-[size:25px_25px]"></div>

        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-ocean-900 mb-16">
            <span className="bg-gradient-to-r from-ocean-900 to-sea-700 bg-clip-text text-transparent">
              {t("about.clients.title")}
            </span>
          </h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {Array.from({ length: 12 }, (_, index) => (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center hover:border-2 hover:border-[#002366]/30"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-ocean-700 font-bold text-lg">
                      {t("about.clients.client")}
                      {index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-ocean-700 mb-8">
                {t("about.clients.description")}
              </p>
              <button className="group bg-gradient-to-r from-[#002366] to-[#1e40af] hover:from-[#1e40af] hover:to-[#002366] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:scale-105">
                <span className="relative z-10">
                  {t("about.clients.learnMore")}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
