import * as React from 'react';
import { Site } from './types';

interface AppContextType {
  site: Site | null;
  setSite: (site: Site | null) => void;
  cart: { id: string; quantity: number }[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [site, setSite] = React.useState<Site | null>(() => {
    const saved = localStorage.getItem('lune_site');
    return (saved as Site) || null;
  });

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

  const addToCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id, quantity: 1 }];
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

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ site, setSite: updateSite, cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
