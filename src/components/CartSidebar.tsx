import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useApp } from '../context';
import { MOCK_MENU } from '../mockData';
import { Button } from './UI';
import { Link } from 'react-router-dom';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { cart, addToCart, removeFromCart, clearCart } = useApp();

  const cartItems = cart.map(item => {
    const product = MOCK_MENU.find(m => m.id === item.id);
    return { ...product, quantity: item.quantity };
  }).filter(item => item.id);

  const total = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-primary" size={24} />
                <h2 className="text-xl font-serif">Mon Panier</h2>
                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-cream rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center text-ink/20">
                    <ShoppingBag size={40} />
                  </div>
                  <p className="text-ink/40 italic">Votre panier est vide</p>
                  <Button variant="outline" onClick={onClose}>Continuer mes achats</Button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-black/5">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm truncate">{item.name}</h3>
                      <p className="text-primary font-bold text-sm mb-2">{item.price?.toLocaleString()} FCFA</p>
                      <div className="flex items-center gap-3 bg-cream w-fit rounded-lg p-1">
                        <button 
                          onClick={() => removeFromCart(item.id!)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-white rounded transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => addToCart(item.id!)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-white rounded transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id!)} // Simplified for now, could be a full remove
                      className="p-2 text-ink/10 hover:text-red-500 transition-colors self-start"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-black/5 bg-cream/30 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{total.toLocaleString()} FCFA</span>
                </div>
                <p className="text-[10px] text-ink/40 uppercase tracking-widest text-center">
                  Taxes et frais de service inclus
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={clearCart} className="border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200">
                    Vider
                  </Button>
                  <Link to="/checkout" onClick={onClose} className="block">
                    <Button className="w-full">Commander</Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
