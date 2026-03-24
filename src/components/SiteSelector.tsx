import * as React from 'react';
import { Site } from '@/src/types';
import { MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './UI';
import { Logo } from './Logo';

interface SiteSelectorProps {
  currentSite: Site | null;
  onSelect: (site: Site) => void;
}

export const SiteSelector = ({ currentSite, onSelect }: SiteSelectorProps) => {
  React.useEffect(() => {
    if (!currentSite) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [currentSite]);

  if (currentSite) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full mx-auto grid md:grid-cols-2 gap-8"
      >
        <div className="md:col-span-2 text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-24 flex items-center justify-center mb-12"
          >
            <Logo className="h-full" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-ink/40 text-xl font-light"
          >
            Veuillez choisir votre établissement pour commencer l'expérience
          </motion.p>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02, y: -10 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('Marcory')}
          className="group relative h-[450px] rounded-[50px] overflow-hidden bg-cream border border-black/5 transition-all shadow-lg hover:shadow-2xl"
        >
          <img 
            src="https://picsum.photos/seed/marcory/800/1200" 
            alt="Lune Marcory" 
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 text-left">
            <div className="flex items-center gap-2 text-primary mb-3">
              <MapPin size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Abidjan Sud</span>
            </div>
            <h2 className="text-4xl text-ink mb-6 font-serif">Lune Marcory</h2>
            <div className="flex items-center gap-3 text-ink/40 group-hover:text-primary transition-colors">
              <span className="font-bold uppercase tracking-[0.2em] text-[10px]">Entrer dans l'univers</span>
              <ChevronRight size={18} />
            </div>
          </div>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.02, y: -10 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('Bingerville')}
          className="group relative h-[450px] rounded-[50px] overflow-hidden bg-cream border border-black/5 transition-all shadow-lg hover:shadow-2xl"
        >
          <img 
            src="https://picsum.photos/seed/bingerville/800/1200" 
            alt="Lune Bingerville" 
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 text-left">
            <div className="flex items-center gap-2 text-primary mb-3">
              <MapPin size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Abidjan Est</span>
            </div>
            <h2 className="text-4xl text-ink mb-6 font-serif">Lune Bingerville</h2>
            <div className="flex items-center gap-3 text-ink/40 group-hover:text-primary transition-colors">
              <span className="font-bold uppercase tracking-[0.2em] text-[10px]">Entrer dans l'univers</span>
              <ChevronRight size={18} />
            </div>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
};
