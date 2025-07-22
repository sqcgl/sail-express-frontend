import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useCart } from "../contexts/CartContext";
import { validateForm, validateField } from "../utils/formValidation";
import { sendInquiryEmail } from "../services/emailService";
import CartDisplay from "../components/CartDisplay";

const Contact = () => {
  const { t } = useLanguage();
  const { selectedProducts, clearCart } = useCart();

  // 表单状态
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  // 表单验证状态
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // 提交状态
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // 处理输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 实时验证
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  // 处理字段失焦
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 标记所有字段为已触摸
    setTouched({
      name: true,
      company: true,
      email: true,
      phone: true,
      message: true,
    });

    // 验证表单
    const validation = validateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // 发送邮件
      const result = await sendInquiryEmail(formData, selectedProducts);

      if (result.success) {
        setSubmitStatus("success");
        // 重置表单
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          message: "",
        });
        setErrors({});
        setTouched({});
        // 清空购物车
        clearCart();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("提交失败:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 重置表单
  const handleReset = () => {
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    });
    setErrors({});
    setTouched({});
    clearCart();
  };

  return (
    <div className="w-full pt-20">
      {/* 页面标题 - 海洋蓝色主题 */}
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
              {t("contact.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/20">
              {t("contact.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* 联系信息 - 毛玻璃效果 */}
      <section className="w-full py-20 bg-gradient-to-br from-ocean-50 to-sea-50 relative overflow-hidden">
        {/* 科技感背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,35,102,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,35,102,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* 联系表单 - 毛玻璃卡片 */}
              <div className="group bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-md rounded-2xl shadow-xl p-8 relative overflow-hidden hover:border-2 hover:border-[#002366]/30">
                <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/5 to-blue-400/5"></div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-ocean-900 mb-6">
                    {t("contact.form.title")}
                  </h2>

                  {/* 成功消息 */}
                  {submitStatus === "success" && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
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
                        <span className="text-green-700 font-medium">
                          {t("contact.form.successMessage")}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 错误消息 */}
                  {submitStatus === "error" && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-red-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-red-700 font-medium">
                          {t("contact.form.errorMessage")}
                        </span>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-ocean-700 mb-2"
                      >
                        {t("contact.form.name")} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#002366] focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 ${
                          errors.name ? "border-red-300" : "border-ocean-200/50"
                        }`}
                        placeholder={t("contact.form.namePlaceholder")}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-ocean-700 mb-2"
                      >
                        {t("contact.form.company")}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#002366] focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 ${
                          errors.company
                            ? "border-red-300"
                            : "border-ocean-200/50"
                        }`}
                        placeholder={t("contact.form.companyPlaceholder")}
                      />
                      {errors.company && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.company}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-ocean-700 mb-2"
                      >
                        {t("contact.form.email")} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#002366] focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 ${
                          errors.email
                            ? "border-red-300"
                            : "border-ocean-200/50"
                        }`}
                        placeholder={t("contact.form.emailPlaceholder")}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-ocean-700 mb-2"
                      >
                        {t("contact.form.phone")} *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#002366] focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 ${
                          errors.phone
                            ? "border-red-300"
                            : "border-ocean-200/50"
                        }`}
                        placeholder={t("contact.form.phonePlaceholder")}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-ocean-700 mb-2"
                      >
                        {t("contact.form.message")} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        rows={6}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#002366] focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 ${
                          errors.message
                            ? "border-red-300"
                            : "border-ocean-200/50"
                        }`}
                        placeholder={t("contact.form.messagePlaceholder")}
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-[#002366] to-[#1e40af] hover:from-[#1e40af] hover:to-[#002366] disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {t("contact.form.sending")}
                          </span>
                        ) : (
                          t("contact.form.submit")
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-3 bg-white/80 hover:bg-white text-ocean-700 font-medium rounded-lg border border-ocean-200/50 hover:border-[#002366]/30 transition-all duration-300"
                      >
                        {t("contact.form.reset")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* 右侧内容 */}
              <div className="space-y-8">
                {/* 购物车显示 */}
                <CartDisplay />

                {/* 联系信息 - 毛玻璃卡片 */}
                <div className="group bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-md rounded-2xl shadow-xl p-8 relative overflow-hidden hover:border-2 hover:border-[#002366]/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/5 to-blue-400/5"></div>
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-ocean-900 mb-6">
                      {t("contact.info.title")}
                    </h2>

                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#002366] to-[#1e40af] rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-ocean-900">
                            {t("contact.info.phone.title")}
                          </h3>
                          <p className="text-ocean-700">+86 138-0000-0000</p>
                          <p className="text-ocean-600 text-sm">
                            {t("contact.info.phone.hours")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#002366] to-[#1e40af] rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-ocean-900">
                            {t("contact.info.email.title")}
                          </h3>
                          <p className="text-ocean-700">
                            info@sail-express.com
                          </p>
                          <p className="text-ocean-600 text-sm">
                            {t("contact.info.email.response")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#002366] to-[#1e40af] rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-ocean-900">
                            {t("contact.info.address.title")}
                          </h3>
                          <p className="text-ocean-700">
                            {t("contact.info.address.location")}
                          </p>
                          <p className="text-ocean-600 text-sm">
                            {t("contact.info.address.visit")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-md rounded-2xl shadow-xl p-8 relative overflow-hidden hover:border-2 hover:border-[#002366]/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/5 to-blue-400/5"></div>
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-ocean-900 mb-6">
                      {t("contact.promises.title")}
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#002366] to-[#1e40af] rounded-full flex items-center justify-center mr-3 shadow-md">
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
                          {t("contact.promises.response")}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#002366] to-[#1e40af] rounded-full flex items-center justify-center mr-3 shadow-md">
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
                          {t("contact.promises.service")}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#002366] to-[#1e40af] rounded-full flex items-center justify-center mr-3 shadow-md">
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
                          {t("contact.promises.quality")}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#002366] to-[#1e40af] rounded-full flex items-center justify-center mr-3 shadow-md">
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
                          {t("contact.promises.delivery")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
