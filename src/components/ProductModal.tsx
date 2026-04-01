import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, Info, AlertCircle } from 'lucide-react';
import { useApp } from '../context';
import { MenuItem } from '../types';
import { Button } from './UI';
import { toast } from 'sonner';

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ProductModal = ({ item, onClose }: ProductModalProps) => {
  const { addToCart, updateQuantity, cart } = useApp();
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    if (item) {
      const existing = cart.find(c => c.id === item.id);
      setQuantity(existing ? existing.quantity : 1);
    }
  }, [item, cart]);

  const handleAddToCart = () => {
    if (item) {
      updateQuantity(item.id, quantity);
      toast.success(`${item.name} mis à jour dans le panier`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-[40px] shadow-2xl z-[70] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute right-6 top-6 z-10 p-3 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full transition-all shadow-lg"
            >
              <X size={24} />
            </button>

            {/* Image Gallery */}
            <div className="md:w-1/2 h-80 md:h-auto relative bg-cream/30">
              <img 
                src={item.image_url} 
                alt={item.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 right-6 flex gap-2 overflow-x-auto no-scrollbar">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-lg shrink-0 cursor-pointer hover:scale-105 transition-transform">
                    <img src={item.image_url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="md:w-1/2 p-10 overflow-y-auto flex flex-col">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-cream text-ink/40 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                    <Info size={10} /> 24h mini.
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">{item.name}</h2>
                <p className="text-2xl font-bold text-primary mb-8">{item.price.toLocaleString()} FCFA</p>
                
                <div className="space-y-6 mb-10">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-3">Description</h4>
                    <p className="text-ink/60 leading-relaxed font-light">{item.description}</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-black/5 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-widest text-ink/40">Quantité</span>
                  <div className="flex items-center gap-6 bg-cream rounded-2xl p-2 border border-black/5">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all text-ink/40 hover:text-primary"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="w-8 text-center font-bold text-xl">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all text-ink/40 hover:text-primary"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                <Button 
                  onClick={handleAddToCart}
                  disabled={!item.is_available}
                  className="w-full h-16 text-lg rounded-2xl shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={20} />
                  {cart.find(c => c.id === item.id) ? 'Mettre à jour le panier' : 'Ajouter au panier'}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
