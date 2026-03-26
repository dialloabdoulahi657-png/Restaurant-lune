import * as React from 'react';
import { useApp } from '../context';
import { MOCK_MENU, MOCK_CATEGORIES } from '../mockData';
import { Card, Button, Input } from '../components/UI';
import { ShoppingBag, Trash2, Plus, Minus, Clock, Calendar as CalendarIcon, Info, ChevronRight, Grid, List, Search } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { ProductModal } from '../components/ProductModal';
import { CartSidebar } from '../components/CartSidebar';
import { Link } from 'react-router-dom';

export const Shop = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, site, pickupDate, setPickupDate } = useApp();
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Reset category when site changes
  React.useEffect(() => {
    setActiveCategory(null);
  }, [site]);
  
  const today = new Date().toISOString().split('T')[0];
  const siteId = site === 'Marcory' ? '1' : '2';
  const categories = MOCK_CATEGORIES.filter(c => c.site_id === siteId);
  const items = MOCK_MENU.filter(i => i.site_id === siteId);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => {
    const product = MOCK_MENU.find(m => m.id === item.id);
    return acc + (product?.price || 0) * item.quantity;
  }, 0);

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory ? item.category_id === activeCategory : true;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Click & Collect Header */}
      <header className="bg-white border-b border-black/5 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h2 className="text-xl font-serif text-primary">Lune {site}</h2>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 bg-cream px-6 py-3 rounded-full hover:bg-primary/5 transition-all group"
          >
            <div className="relative">
              <ShoppingBag size={20} className="text-primary" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-ink/40 leading-none mb-1">Mon Panier</p>
              <p className="text-xs font-bold text-primary leading-none">{cartTotal.toLocaleString()} FCFA</p>
            </div>
          </button>
        </div>
      </header>

      {/* Info Message */}
      <div className="bg-primary/5 py-3 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center justify-center gap-2">
          <Info size={12} /> Toute commande passée avant 15h sera disponible sous 24h. Passé ce délai, sous 48h.
        </p>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-16">
          {/* Sidebar Filters */}
          <aside className="space-y-12">
            {/* Pickup Date Selector */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-ink/40 border-b border-black/5 pb-4">Retrait</h3>
              <div className="space-y-4">
                <label className="text-sm font-medium text-ink/60 block">Je viens chercher ma commande le :</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  <Input 
                    type="date" 
                    min={today}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="pl-12 h-14 rounded-2xl bg-cream/30 border-none focus:ring-primary/10"
                  />
                </div>
                <div className="p-6 bg-cream rounded-3xl space-y-4 border border-black/5">
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-primary mt-1" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1">Horaires</p>
                      <p className="text-xs text-ink/60 leading-relaxed">Mardi au Dimanche<br />12h00 — 20h00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShoppingBag size={16} className="text-primary mt-1" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1">Adresse</p>
                      <p className="text-xs text-ink/60 leading-relaxed">{site === 'Marcory' ? 'Zone 4, Rue du Canal, Marcory' : 'Quartier Résidentiel, Bingerville'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-ink/40 border-b border-black/5 pb-4">Catégories</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveCategory(null)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center justify-between group ${!activeCategory ? 'bg-primary text-white font-bold' : 'hover:bg-cream text-ink/60'}`}
                >
                  Tous les produits
                  <ChevronRight size={14} className={!activeCategory ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'} />
                </button>
                {categories.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center justify-between group ${activeCategory === cat.id ? 'bg-primary text-white font-bold' : 'hover:bg-cream text-ink/60'}`}
                  >
                    {cat.name}
                    <ChevronRight size={14} className={activeCategory === cat.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'} />
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3 space-y-10">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between bg-cream/30 p-4 rounded-3xl border border-black/5">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/20" size={18} />
                <input 
                  type="text" 
                  placeholder="Rechercher une création..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border-none focus:ring-2 focus:ring-primary/10 text-sm"
                />
              </div>
              <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-black/5">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-lg' : 'text-ink/20 hover:text-primary'}`}
                >
                  <Grid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-lg' : 'text-ink/20 hover:text-primary'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-8' : 'space-y-6'}>
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <Card className={`group overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 ${viewMode === 'list' ? 'flex flex-row h-48' : 'flex flex-col'}`}>
                      {/* Image */}
                      <div 
                        className={`relative overflow-hidden cursor-pointer ${viewMode === 'list' ? 'w-48 shrink-0' : 'h-64'}`}
                        onClick={() => setSelectedProduct(item)}
                      >
                        <img 
                          src={item.image_url} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          referrerPolicy="no-referrer"
                        />
                        {!item.is_available && (
                          <div className="absolute inset-0 bg-ink/60 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="bg-white text-ink text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-xl">
                              Rupture de stock
                            </span>
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-ink text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                            {item.portions || '1 portion'}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-serif group-hover:text-primary transition-colors">{item.name}</h3>
                          <span className="text-primary font-bold">À partir de {item.price.toLocaleString()} FCFA</span>
                        </div>
                        <p className="text-xs text-ink/40 mb-6 font-light italic">Disponible jusqu'au {new Date(Date.now() + 604800000).toLocaleDateString('fr-FR')}</p>
                        
                        <div className="mt-auto flex items-center gap-4">
                          <div className="flex items-center gap-3 bg-cream rounded-xl p-1 border border-black/5">
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-ink/40 hover:text-primary"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center font-bold text-sm">
                              {cart.find(c => c.id === item.id)?.quantity || 0}
                            </span>
                            <button 
                              onClick={() => addToCart(item.id)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-ink/40 hover:text-primary"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <Button 
                            onClick={() => {
                              addToCart(item.id);
                              toast.success(`${item.name} ajouté au panier`);
                            }}
                            disabled={!item.is_available}
                            className="flex-1 h-10 rounded-xl text-xs font-bold uppercase tracking-widest"
                          >
                            Ajouter
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-32 bg-cream/30 rounded-[40px] border-2 border-dashed border-black/5">
                <p className="text-ink/40 italic">Aucune création ne correspond à votre recherche...</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <ProductModal 
        item={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  );
};
