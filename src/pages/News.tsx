import * as React from 'react';
import { useApp } from '@/src/context';
import { Card, Badge, Button } from '@/src/components/UI';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Logo } from '../components/Logo';
import { supabase } from '@/src/lib/supabase';

export const NewsPage = () => {
  const { site } = useApp();
  const [news, setNews] = React.useState<any[]>([]);
  const [selectedNews, setSelectedNews] = React.useState<any | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const siteId = site === 'Marcory' ? '1' : '2';

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*');
      
      if (error) throw error;
      if (data) {
        // Robust filtering for both numeric ID and site name
        const filtered = data.filter((item: any) => {
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
        setNews(filtered);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [siteId]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16">
        <h1 className="text-6xl mb-4">Actualités</h1>
        <p className="text-ink/60">Suivez les événements et nouveautés de Lune {site}.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {news.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group cursor-pointer" onClick={() => setSelectedNews(item)}>
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={item.image_url || item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <Badge>Événement</Badge>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-ink/40 text-sm mb-4">
                  <Calendar size={14} />
                  <span>{new Date(item.created_at || item.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <h3 className="text-3xl mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-ink/60 mb-8 leading-relaxed line-clamp-2">{item.summary || item.content}</p>
                <Button variant="ghost" className="p-0 hover:bg-transparent text-primary gap-2">
                  Lire la suite <ArrowRight size={18} />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* News Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNews(null)}
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl"
            >
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-ink hover:bg-primary hover:text-white transition-all shadow-lg"
              >
                ✕
              </button>

              <div className="relative h-[40vh] sm:h-[50vh]">
                <img 
                  src={selectedNews.image_url || selectedNews.image} 
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>

              <div className="p-8 sm:p-12 -mt-20 relative bg-white rounded-t-[40px]">
                <div className="flex items-center gap-3 text-ink/40 text-sm mb-6">
                  <Badge>Actualité</Badge>
                  <span className="w-1 h-1 bg-ink/20 rounded-full" />
                  <Calendar size={14} />
                  <span>{new Date(selectedNews.created_at || selectedNews.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>

                <h2 className="text-4xl sm:text-5xl mb-8 leading-tight">{selectedNews.title}</h2>
                
                <div className="prose prose-lg max-w-none text-ink/70 space-y-6">
                  <div className="text-xl leading-relaxed whitespace-pre-wrap">
                    {selectedNews.content}
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-black/5 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Logo className="h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">L'équipe LUNE</p>
                      <p className="text-xs text-ink/40">Publié à {site}</p>
                    </div>
                  </div>
                  <Button onClick={() => setSelectedNews(null)}>Fermer</Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
