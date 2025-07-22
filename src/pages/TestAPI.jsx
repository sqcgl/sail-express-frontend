import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { productAPI, systemAPI, handleAPIError } from "../services/apiService";

const TestAPI = () => {
  const { t } = useLanguage();
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const results = {};

    try {
      // 测试1: 健康检查
      console.log(t("testAPI.tests.health.log"));
      const health = await systemAPI.healthCheck();
      results.health = { success: true, data: health };
    } catch (error) {
      results.health = { success: false, error: handleAPIError(error) };
    }

    try {
      // 测试2: 获取所有产品
      console.log(t("testAPI.tests.products.log"));
      const products = await productAPI.getAllProducts();
      results.products = { success: true, data: products };
    } catch (error) {
      results.products = { success: false, error: handleAPIError(error) };
    }

    try {
      // 测试3: 获取新鲜类产品
      console.log(t("testAPI.tests.fresh.log"));
      const fresh = await productAPI.getProductsByCategory("fresh");
      results.fresh = { success: true, data: fresh };
    } catch (error) {
      results.fresh = { success: false, error: handleAPIError(error) };
    }

    try {
      // 测试4: 获取单个产品
      console.log(t("testAPI.tests.singleProduct.log"));
      const product = await productAPI.getProductById(1);
      results.singleProduct = { success: true, data: product };
    } catch (error) {
      results.singleProduct = { success: false, error: handleAPIError(error) };
    }

    setTestResults(results);
    setLoading(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  const TestResult = ({ title, result }) => (
    <div
      className={`p-4 rounded-lg border ${
        result.success
          ? "bg-green-50 border-green-200"
          : "bg-red-50 border-red-200"
      }`}
    >
      <h3
        className={`font-bold mb-2 ${
          result.success ? "text-green-800" : "text-red-800"
        }`}
      >
        {title}
      </h3>
      {result.success ? (
        <div className="text-green-700">
          <p>✅ {t("testAPI.result.pass")}</p>
          {result.data && (
            <pre className="mt-2 text-xs bg-white p-2 rounded border overflow-auto">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          )}
        </div>
      ) : (
        <div className="text-red-700">
          <p>❌ {t("testAPI.result.fail")}</p>
          <p className="text-sm">{result.error}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full pt-20 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-ocean-900 mb-8">
          {t("testAPI.title")}
        </h1>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002366] mx-auto mb-4"></div>
            <p>{t("testAPI.loading")}</p>
          </div>
        )}

        <div className="grid gap-4">
          <TestResult
            title={t("testAPI.tests.health.title")}
            result={testResults.health || {}}
          />
          <TestResult
            title={t("testAPI.tests.products.title")}
            result={testResults.products || {}}
          />
          <TestResult
            title={t("testAPI.tests.fresh.title")}
            result={testResults.fresh || {}}
          />
          <TestResult
            title={t("testAPI.tests.singleProduct.title")}
            result={testResults.singleProduct || {}}
          />
        </div>

        <div className="mt-8">
          <button
            onClick={runTests}
            disabled={loading}
            className="bg-[#002366] text-white px-6 py-3 rounded-lg hover:bg-[#001a4d] disabled:opacity-50"
          >
            {loading ? t("testAPI.testing") : t("testAPI.retest")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestAPI;
