import * as React from 'react';
import { motion } from 'motion/react';
import { useApp } from '@/src/context';
import { Button, Card } from '@/src/components/UI';
import { ArrowRight, MapPin, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';

export const Home = () => {
  const { site } = useApp();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920&h=1080" 
            alt="Lune Hero" 
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-ink pt-32 pb-40 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Lune {site}
            </span>
            <h1 className="text-6xl md:text-8xl mb-6 leading-tight">
              L'art de vivre <br /> <span className="italic text-primary">à l'ivoirienne</span>
            </h1>
            <p className="text-xl text-ink/60 mb-10 font-light leading-relaxed">
              Une expérience culinaire unique mêlant tradition et modernité dans un cadre d'exception à {site}.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu">
                <Button size="lg" className="gap-2">
                  Explorer le Menu <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/reservation">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Réserver une Table
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40">Découvrir</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
          />
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { title: 'Qualité Premium', desc: 'Des ingrédients sélectionnés avec soin auprès des meilleurs producteurs locaux.', icon: <Star size={32} /> },
              { title: 'Service Rapide', desc: 'Un service attentionné et efficace pour vos déjeuners d\'affaires ou moments de détente.', icon: <Clock size={32} /> },
              { title: 'Cadre Unique', desc: 'Un design architectural inspiré et apaisant pour une évasion totale.', icon: <MapPin size={32} /> },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8 transform group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl mb-4 font-serif">{feature.title}</h3>
                <p className="text-ink/60 leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Arch Section */}
      <section className="py-32 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            <div className="relative">
              <div className="arch-container h-[650px] w-full overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800&h=1000" 
                  alt="Interior" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary rounded-full flex flex-col items-center justify-center text-white text-center p-8 shadow-xl"
              >
                <Logo className="h-8 mb-2" color="white" />
                <span className="font-serif italic text-xl">Depuis 2022</span>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="text-5xl md:text-6xl mb-10 leading-tight">Le Concept <br /><span className="text-primary italic">LUNE</span></h2>
            <p className="text-xl text-ink/70 mb-10 leading-relaxed font-light">
              Plus qu'un restaurant, LUNE est un lieu de rencontre où la gastronomie rencontre l'art. Notre établissement à {site} a été conçu pour offrir une atmosphère sereine, idéale pour vos brunchs tardifs ou vos dîners élégants.
            </p>
            <div className="space-y-6 mb-12">
              {[
                "Pâtisseries artisanales fraîches chaque matin",
                "Café de spécialité torréfié localement",
                "Cuisine fusion ivoiro-moderne"
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + (i * 0.1) }}
                  className="flex items-center gap-5"
                >
                  <div className="w-3 h-3 bg-primary rounded-full shadow-sm" />
                  <span className="text-lg font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
            <Link to="/about">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white px-10">
                En savoir plus sur nous
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Ce que disent nos clients</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Awa K.", text: "Le meilleur brunch de Marcory. L'ambiance est incroyable et le service est impeccable.", role: "Cliente fidèle" },
              { name: "Jean-Marc D.", text: "Un cadre magnifique pour mes rendez-vous d'affaires. Le café est exceptionnel.", role: "Entrepreneur" },
              { name: "Sarah L.", text: "J'adore la terrasse de Bingerville. C'est mon endroit préféré pour me détendre le weekend.", role: "Artiste" }
            ].map((t, i) => (
              <Card key={i} className="p-8 bg-cream/30 border-none">
                <div className="flex gap-1 text-primary mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                </div>
                <p className="text-ink/70 italic mb-6">"{t.text}"</p>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-ink/40 uppercase tracking-widest">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
