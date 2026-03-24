import * as React from 'react';
import { Card } from '@/src/components/UI';
import { motion } from 'motion/react';

export const About = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-24">
          <h1 className="text-7xl mb-8">L'histoire de <br /> <span className="italic text-primary">LUNE</span></h1>
          <p className="text-xl text-ink/70 leading-relaxed">
            Fondé en 2022, LUNE est né d'une volonté de créer un espace où la gastronomie ivoirienne s'élève au rang d'art. Notre nom évoque la douceur, la clarté et le cycle des moments partagés.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-24 items-center mb-32">
          <div className="arch-container h-[700px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800&h=1200" 
              alt="Lune Interior" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl mb-6">Notre Philosophie</h2>
              <p className="text-ink/60 leading-relaxed">
                Nous croyons que chaque repas est une célébration. C'est pourquoi nous travaillons exclusivement avec des produits frais, sourcés localement pour soutenir notre communauté tout en garantissant une qualité exceptionnelle.
              </p>
            </div>
            <div>
              <h2 className="text-4xl mb-6">Deux Sites, Une Âme</h2>
              <p className="text-ink/60 leading-relaxed mb-6">
                Que vous soyez à Marcory ou à Bingerville, vous retrouverez la même exigence de qualité et le même accueil chaleureux. Chaque site possède cependant sa propre personnalité architecturale.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 bg-primary/5 border-primary/10">
                  <h4 className="font-bold mb-2">Marcory</h4>
                  <p className="text-xs text-ink/40">Urbain & Sophistiqué</p>
                </Card>
                <Card className="p-6 bg-primary/5 border-primary/10">
                  <h4 className="font-bold mb-2">Bingerville</h4>
                  <p className="text-xs text-ink/40">Serein & Naturel</p>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&q=80&w=600&h=600"
          ].map((url, i) => (
            <div key={i} className="aspect-square rounded-3xl overflow-hidden">
              <img 
                src={url} 
                alt="Gallery" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
