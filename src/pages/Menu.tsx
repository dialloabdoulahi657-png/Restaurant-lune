import * as React from 'react';
import { useApp } from '@/src/context';
import { Card, Button } from '@/src/components/UI';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/src/lib/supabase';

export const Menu = () => {
  const { site, addToCart } = useApp();
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [items, setItems] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const siteId = site === 'Marcory' ? '1' : '2';

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch all items and filter in JS to handle 'All' location
      const { data: menuData } = await supabase
        .from('menu')
        .select('*');

      if (menuData) {
        // Filter by site_id (numeric ID or 'All')
        const filteredBySite = menuData.filter((item: any) => {
          const sId = String(item.site_id || item.location || '');
          if (!sId) return false;
          
          const normalizedSId = sId.toLowerCase();
          const normalizedSite = String(site).toLowerCase();

          return sId === siteId || 
                 normalizedSId === normalizedSite || 
                 sId === 'All' ||
                 normalizedSId === 'all' ||
                 normalizedSId === 'tous';
        });
        
        setItems(filteredBySite);
        
        // Extract unique categories from menu items
        const uniqueCategories = Array.from(new Set(filteredBySite.map((item: any) => item.category)))
          .filter(Boolean)
          .map(name => ({
            id: name,
            name
          }));
        
        setCategories(uniqueCategories);
        if (uniqueCategories.length > 0 && !activeCategory) {
          setActiveCategory(uniqueCategories[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
      toast.error('Erreur lors du chargement du menu');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [siteId]);

  React.useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories]);

  const filteredItems = activeCategory 
    ? items.filter(i => i.category === activeCategory)
    : items;

  const handleAddToCart = (item: any) => {
    addToCart(item.id);
    toast.success(`${item.name} ajouté au panier`);
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl mb-4">La Carte</h1>
        <p className="text-ink/60 max-w-2xl mx-auto">Explorez nos saveurs uniques à {site}. Chaque plat est préparé avec passion par nos chefs.</p>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-4 mb-12 pb-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-8 py-3 rounded-full whitespace-nowrap transition-all font-medium ${
              activeCategory === cat.id 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-white text-ink/60 hover:bg-primary/5'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => {
            const isAvailable = item.available !== undefined ? item.available : (item.is_available !== undefined ? item.is_available : item.disponible);
            
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="h-full flex flex-col group">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image_url || item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-ink/60 flex items-center justify-center">
                        <span className="text-white font-bold uppercase tracking-widest">Rupture de stock</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <span className="text-primary font-bold">{item.price.toLocaleString()} FCFA</span>
                    </div>
                    <p className="text-ink/60 text-sm mb-6 flex-1">{item.description}</p>
                    <Button 
                      onClick={() => handleAddToCart(item)}
                      disabled={!isAvailable}
                      className="w-full gap-2"
                    >
                      <Plus size={18} /> Ajouter au panier
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
