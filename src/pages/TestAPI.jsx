import React, { useState, useEffect } from "react";
import { productAPI, handleAPIError } from "../services/apiService";
import { useLanguage } from "../contexts/LanguageContext";

const TestAPI = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    // 显示当前使用的API URL
    setApiUrl("https://web-production-c3853.up.railway.app");
  }, []);

  const runTests = async () => {
    setLoading(true);
    setTestResults({});

    const results = {};

    try {
      // 测试产品API
      console.log(t("testAPI.tests.products.log"));
      const products = await productAPI.getAllProducts();
      results.products = { success: true, data: products };
    } catch (error) {
      results.products = { success: false, error: handleAPIError(error) };
    }

    try {
      // 测试分类API
      console.log(t("testAPI.tests.categories.log"));
      const fresh = await productAPI.getProductsByCategory("fresh");
      results.categories = { success: true, data: fresh };
    } catch (error) {
      results.categories = { success: false, error: handleAPIError(error) };
    }

    setTestResults(results);
    setLoading(false);
  };

  const TestResult = ({ title, result }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <h3 className="font-semibold text-ocean-900 mb-2">{title}</h3>
      {result?.success ? (
        <div className="text-green-600">
          <p>✅ 成功</p>
          <p className="text-sm text-gray-600">
            数据: {JSON.stringify(result.data, null, 2)}
          </p>
        </div>
      ) : (
        <div className="text-red-600">
          <p>❌ 失败</p>
          <p className="text-sm">{result?.error || "未知错误"}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ocean-900 mb-4">
            {t("testAPI.title")}
          </h1>
          <p className="text-ocean-600">{t("testAPI.description")}</p>
        </div>

        {/* API URL 显示 */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 className="font-semibold text-blue-900 mb-2">当前API配置</h2>
          <p className="text-blue-700 font-mono text-sm">{apiUrl}</p>
        </div>

        {/* 测试按钮 */}
        <div className="text-center mb-8">
          <button
            onClick={runTests}
            disabled={loading}
            className="bg-ocean-600 text-white px-6 py-3 rounded-lg hover:bg-ocean-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "测试中..." : t("testAPI.runTests")}
          </button>
        </div>

        {/* 测试结果 */}
        {Object.keys(testResults).length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-ocean-900 mb-4">
              {t("testAPI.results")}
            </h2>
            <TestResult
              title={t("testAPI.tests.products.title")}
              result={testResults.products || {}}
            />
            <TestResult
              title={t("testAPI.tests.categories.title")}
              result={testResults.categories || {}}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestAPI;
