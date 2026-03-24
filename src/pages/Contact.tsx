import * as React from 'react';
import { useApp } from '@/src/context';
import { Button } from '@/src/components/UI';
import { Mail, Phone, MapPin, Instagram, Facebook, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const Contact = () => {
  const { site } = useApp();

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl mb-8 font-serif">Contactez <br /> <span className="italic text-primary">LUNE {site}</span></h1>
          <p className="text-xl text-ink/60 mb-16 leading-relaxed max-w-xl">
            Nous sommes à votre entière disposition pour toute demande d'information ou réservation particulière.
          </p>

          <div className="grid sm:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div className="flex gap-4">
                <Phone className="text-primary shrink-0" size={24} />
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px] text-ink/40 mb-2">Téléphone</h4>
                  <p className="text-lg font-medium">{site === 'Marcory' ? '+225 07 00 00 00 01' : '+225 07 00 00 00 02'}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="text-primary shrink-0" size={24} />
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px] text-ink/40 mb-2">Email</h4>
                  <p className="text-lg font-medium">contact@lune-ci.com</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin className="text-primary shrink-0" size={24} />
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px] text-ink/40 mb-2">Adresse</h4>
                  <p className="text-lg font-medium leading-snug">
                    {site === 'Marcory' 
                      ? 'Zone 4, Rue du Canal, Marcory, Abidjan' 
                      : 'Quartier Résidentiel, Bingerville'}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="text-primary shrink-0" size={24} />
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px] text-ink/40 mb-2">Horaires</h4>
                  <p className="text-lg font-medium">7j/7 • 07h00 - 23h00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-black/5 flex items-center gap-8">
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                <Facebook size={20} />
              </a>
            </div>
            <p className="text-xs text-ink/40 font-medium uppercase tracking-widest">Suivez notre quotidien</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="arch-container h-[700px] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800&h=1200" 
              alt="Lune Ambience" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-primary text-white p-10 rounded-3xl shadow-xl hidden lg:block max-w-[280px]">
            <p className="text-2xl font-serif italic leading-tight">
              "L'art de recevoir, tout simplement."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
