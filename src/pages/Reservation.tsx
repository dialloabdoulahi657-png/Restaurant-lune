import * as React from 'react';
import { useApp } from '@/src/context';
import { Card, Button, Input } from '@/src/components/UI';
import { Calendar as CalendarIcon, Clock, Users, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export const Reservation = () => {
  const { site } = useApp();
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Demande de réservation envoyée !');
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-24 max-w-xl mx-auto px-4 text-center">
        <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
          <CalendarIcon size={48} />
        </div>
        <h1 className="text-4xl mb-4">Réservation en attente</h1>
        <p className="text-ink/60 mb-8">Votre demande pour Lune {site} a bien été reçue. Nous vous enverrons une confirmation par email ou SMS très prochainement.</p>
        <Button onClick={() => setSubmitted(false)} className="w-full">Nouvelle réservation</Button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-6xl mb-8">Réserver <br /> <span className="italic">votre table</span></h1>
          <p className="text-lg text-ink/60 mb-12 leading-relaxed">
            Que ce soit pour un déjeuner d'affaires, un brunch entre amis ou un dîner romantique, nous vous accueillons avec plaisir à {site}.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-black/5 shrink-0">
                <MapPin className="text-primary" size={24} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Localisation</h4>
                <p className="text-ink/60">{site === 'Marcory' ? 'Zone 4, Rue du Canal' : 'Quartier Résidentiel, Bingerville'}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-black/5 shrink-0">
                <Clock className="text-primary" size={24} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Horaires</h4>
                <p className="text-ink/60">Lun - Dim: 07h00 - 23h00</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-ink/40">Nom complet</label>
                <Input placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-ink/40">Téléphone</label>
                <Input placeholder="+225 ..." type="tel" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-ink/40">Date</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
                  <Input className="pl-12" type="date" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-ink/40">Heure</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
                  <Input className="pl-12" type="time" required />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-ink/40">Nombre d'invités</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
                  <Input className="pl-12" type="number" min="1" max="20" placeholder="2" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-ink/40">Zone préférée</label>
                <select className="w-full px-4 py-3 rounded-2xl border border-black/10 bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none">
                  <option>Salle Climatisée</option>
                  <option>Terrasse</option>
                </select>
              </div>
            </div>

            <Button type="submit" className="w-full py-4 text-lg">Confirmer la demande</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
