import * as React from 'react';
import { useApp } from '@/src/context';
import { MOCK_NEWS } from '@/src/mockData';
import { Card, Badge, Button } from '@/src/components/UI';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';

export const NewsPage = () => {
  const { site } = useApp();
  const siteId = site === 'Marcory' ? '1' : '2';
  const news = MOCK_NEWS.filter(n => n.site_id === siteId);

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
            <Card className="group cursor-pointer">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={item.image_url} 
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
                  <span>{new Date(item.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <h3 className="text-3xl mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-ink/60 mb-8 leading-relaxed">{item.content}</p>
                <Button variant="ghost" className="p-0 hover:bg-transparent text-primary gap-2">
                  Lire la suite <ArrowRight size={18} />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
