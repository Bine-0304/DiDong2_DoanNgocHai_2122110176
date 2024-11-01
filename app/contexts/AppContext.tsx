import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
};
 type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

type AppContextType = {
  user: { username: string; email: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ username: string; email: string } | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  removeMultipleFromCart: (itemIds: number[]) => void;
  updateCartItemQuantity: (itemId: number, newQuantity: number) => void;
  addToFavorites: (product: Product) => void;
  favorites: Product[];
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  clearCart: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const removeMultipleFromCart = (itemIds: number[]) => {
    setCartItems(prevItems => prevItems.filter(item => !itemIds.includes(item.id)));
  };
  const updateCartItemQuantity = (itemId: number, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const addToFavorites = (product: Product) => {
    setFavorites(prev => [...prev, product]);
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
  };

  const isFavorite = (productId: number) => {
    return favorites.some(item => item.id === productId);
  };
  const clearCart = () => {
    setCartItems([]); // Simply set the cart items to an empty array
  };
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const savedCredentials = await AsyncStorage.getItem('savedCredentials');
        const isLoggedInValue = await AsyncStorage.getItem('isLoggedIn');
        const userData = await AsyncStorage.getItem('user');

        if (savedCredentials && (!isLoggedInValue || !userData)) {
          // Nếu có thông tin đăng nhập đã lưu nhưng chưa đăng nhập
          const credentials = JSON.parse(savedCredentials);
          // Thực hiện đăng nhập tự động với thông tin đã lưu
          await handleAutoLogin(credentials);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleAutoLogin = async (credentials: { username: string; password: string }) => {
    try {
      // Thực hiện API đăng nhập ở đây
      // const response = await loginAPI(credentials);
      
      // Giả lập response thành công
      const mockUser = {
        username: credentials.username,
        email: `${credentials.username}@example.com`
      };

      // Lưu thông tin người dùng
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('isLoggedIn', 'true');

      // Cập nhật context
      setUser(mockUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Auto login failed:', error);
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      isLoggedIn,
      setIsLoggedIn,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      clearCart,
      removeMultipleFromCart
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};