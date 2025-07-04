import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    images: { url: string; alt: string }[];
    price: number;
    stock: number;
  };
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
}

type CartAction =
  | { type: 'CART_LOADING'; payload: boolean }
  | { type: 'CART_LOADED'; payload: { items: CartItem[]; totalAmount: number; totalItems: number } }
  | { type: 'CART_ERROR'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'CLEAR_ERROR' };

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
  loading: false,
  error: null,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'CART_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'CART_LOADED':
      return {
        ...state,
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
        totalItems: action.payload.totalItems,
        loading: false,
        error: null,
      };
    case 'CART_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalAmount: 0,
        totalItems: 0,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  clearError: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { state: authState } = useAuth();

  useEffect(() => {
    if (authState.user && authState.token) {
      fetchCart();
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [authState.user, authState.token]);

  const fetchCart = async () => {
    try {
      dispatch({ type: 'CART_LOADING', payload: true });
      
      const response = await axios.get('/cart');
      
      if (response.data.success) {
        dispatch({
          type: 'CART_LOADED',
          payload: {
            items: response.data.data.items,
            totalAmount: response.data.data.totalAmount,
            totalItems: response.data.data.totalItems,
          },
        });
      }
    } catch (error: any) {
      console.error('Fetch cart error:', error);
      dispatch({
        type: 'CART_ERROR',
        payload: error.response?.data?.message || 'Failed to fetch cart',
      });
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      dispatch({ type: 'CART_LOADING', payload: true });
      
      const response = await axios.post('/cart/add', {
        productId,
        quantity,
      });

      if (response.data.success) {
        dispatch({
          type: 'CART_LOADED',
          payload: {
            items: response.data.data.items,
            totalAmount: response.data.data.totalAmount,
            totalItems: response.data.data.totalItems,
          },
        });
      }
    } catch (error: any) {
      console.error('Add to cart error:', error);
      dispatch({
        type: 'CART_ERROR',
        payload: error.response?.data?.message || 'Failed to add item to cart',
      });
      throw new Error(error.response?.data?.message || 'Failed to add item to cart');
    }
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    try {
      dispatch({ type: 'CART_LOADING', payload: true });
      
      const response = await axios.put(`/cart/update/${productId}`, {
        quantity,
      });

      if (response.data.success) {
        dispatch({
          type: 'CART_LOADED',
          payload: {
            items: response.data.data.items,
            totalAmount: response.data.data.totalAmount,
            totalItems: response.data.data.totalItems,
          },
        });
      }
    } catch (error: any) {
      console.error('Update cart error:', error);
      dispatch({
        type: 'CART_ERROR',
        payload: error.response?.data?.message || 'Failed to update cart',
      });
      throw new Error(error.response?.data?.message || 'Failed to update cart');
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      dispatch({ type: 'CART_LOADING', payload: true });
      
      const response = await axios.delete(`/cart/remove/${productId}`);

      if (response.data.success) {
        dispatch({
          type: 'CART_LOADED',
          payload: {
            items: response.data.data.items,
            totalAmount: response.data.data.totalAmount,
            totalItems: response.data.data.totalItems,
          },
        });
      }
    } catch (error: any) {
      console.error('Remove from cart error:', error);
      dispatch({
        type: 'CART_ERROR',
        payload: error.response?.data?.message || 'Failed to remove item from cart',
      });
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('/cart/clear');
      dispatch({ type: 'CLEAR_CART' });
    } catch (error: any) {
      console.error('Clear cart error:', error);
      dispatch({
        type: 'CART_ERROR',
        payload: error.response?.data?.message || 'Failed to clear cart',
      });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        fetchCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        clearError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};