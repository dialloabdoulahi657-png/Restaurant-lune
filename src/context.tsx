import * as React from 'react';
import { Site } from './types';

interface AppContextType {
  site: Site | null;
  setSite: (site: Site | null) => void;
  cart: { id: string; quantity: number }[];
  addToCart: (id: string, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  pickupDate: string;
  setPickupDate: (date: string) => void;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [site, setSite] = React.useState<Site | null>(() => {
    const saved = localStorage.getItem('lune_site');
    return (saved as Site) || null;
  });

  const [pickupDate, setPickupDate] = React.useState<string>(() => {
    const saved = localStorage.getItem('lune_pickup_date');
    return saved || '';
  });

  React.useEffect(() => {
    if (pickupDate) {
      localStorage.setItem('lune_pickup_date', pickupDate);
    } else {
      localStorage.removeItem('lune_pickup_date');
    }
  }, [pickupDate]);

  const updateSite = (newSite: Site | null) => {
    setSite(newSite);
    if (newSite) {
      localStorage.setItem('lune_site', newSite);
    } else {
      localStorage.removeItem('lune_site');
    }
  };

  const [cart, setCart] = React.useState<{ id: string; quantity: number }[]>(() => {
    const saved = localStorage.getItem('lune_cart');
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('lune_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id: string, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { id, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev => {
      if (quantity <= 0) {
        return prev.filter(item => item.id !== id);
      }
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, quantity } : item);
      }
      return [...prev, { id, quantity }];
    });
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ 
      site, 
      setSite: updateSite, 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      pickupDate,
      setPickupDate
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
