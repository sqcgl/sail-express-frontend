import React, { createContext, useContext, useReducer } from "react";

// 购物车状态管理
const CartContext = createContext();

// 初始状态
const initialState = {
  selectedProducts: [],
};

// 购物车操作类型
const CART_ACTIONS = {
  ADD_PRODUCT: "ADD_PRODUCT",
  REMOVE_PRODUCT: "REMOVE_PRODUCT",
  CLEAR_CART: "CLEAR_CART",
};

// 购物车Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_PRODUCT:
      const existingProduct = state.selectedProducts.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        // 如果产品已存在，不重复添加
        return state;
      } else {
        return {
          ...state,
          selectedProducts: [...state.selectedProducts, action.payload],
        };
      }

    case CART_ACTIONS.REMOVE_PRODUCT:
      return {
        ...state,
        selectedProducts: state.selectedProducts.filter(
          (item) => item.id !== action.payload
        ),
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        selectedProducts: [],
      };

    default:
      return state;
  }
}

// 购物车Provider组件
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // 添加产品到购物车
  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_PRODUCT, payload: product });
  };

  // 从购物车移除产品
  const removeFromCart = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_PRODUCT, payload: productId });
  };

  // 清空购物车
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // 获取购物车总价值（参考价格）
  const getTotalValue = () => {
    return state.selectedProducts.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ""));
      return total + price;
    }, 0);
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalValue,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 使用购物车的Hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
