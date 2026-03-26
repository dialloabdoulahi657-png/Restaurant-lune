import * as React from 'react';
import { Card, Button, Input } from '../components/UI';
import { Calendar as CalendarIcon, Clock, Users, Phone, Mail, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useApp } from '../context';
import { toast } from 'sonner';

type ReservationStep = 'guests' | 'date' | 'time' | 'details' | 'success';

export const Reservation = () => {
  const { site } = useApp();
  const [step, setStep] = React.useState<ReservationStep>('guests');
  const [formData, setFormData] = React.useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    occasion: '',
    requests: ''
  });

  const steps: ReservationStep[] = ['guests', 'date', 'time', 'details'];
  const currentStepIndex = steps.indexOf(step);

  const handleNext = () => {
    if (step === 'guests') setStep('date');
    else if (step === 'date') setStep('time');
    else if (step === 'time') setStep('details');
  };

  const handleBack = () => {
    if (step === 'date') setStep('guests');
    else if (step === 'time') setStep('date');
    else if (step === 'details') setStep('time');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    toast.success('Demande de réservation envoyée');
  };

  const today = new Date().toISOString().split('T')[0];

  const timeSlots = {
    lunch: ['12:00', '12:30', '13:00', '13:30'],
    dinner: ['19:00', '19:30', '20:00', '20:30', '21:00']
  };

  return (
    <div className="min-h-screen bg-[#FDFDFB] pt-32 pb-20">
      <main className="max-w-3xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-serif text-ink tracking-tight">Réserver une table</h1>
          <p className="text-ink/40 font-light tracking-wide italic">Lune {site} — L'excellence à votre table</p>
        </div>

        {/* Progress Indicator */}
        {step !== 'success' && (
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {steps.map((s, i) => (
                <React.Fragment key={s}>
                  <div 
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      i <= currentStepIndex ? 'bg-primary scale-125' : 'bg-primary/10'
                    }`} 
                  />
                  {i < steps.length - 1 && (
                    <div className={`w-12 h-[1px] transition-all duration-500 ${
                      i < currentStepIndex ? 'bg-primary' : 'bg-primary/10'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <div className="relative">
          <AnimatePresence mode="wait">
            {step === 'guests' && (
              <motion.div
                key="guests"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-serif">Pour combien de personnes ?</h2>
                  <p className="text-sm text-ink/40">Sélectionnez le nombre de convives</p>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {['1', '2', '3', '4', '5', '6+'].map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        setFormData({...formData, guests: n});
                        handleNext();
                      }}
                      className={`aspect-square rounded-full flex items-center justify-center text-lg font-light transition-all border ${
                        formData.guests === n 
                          ? 'bg-ink text-white border-ink shadow-xl scale-105' 
                          : 'bg-white border-black/5 hover:border-primary/40 text-ink/60'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'date' && (
              <motion.div
                key="date"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between">
                  <button onClick={handleBack} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                  <div className="text-center space-y-1">
                    <h2 className="text-2xl font-serif">Quelle date ?</h2>
                    <p className="text-sm text-ink/40">Choisissez votre jour de visite</p>
                  </div>
                  <div className="w-10" />
                </div>
                
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-black/5">
                  <Input 
                    type="date" 
                    min={today}
                    value={formData.date}
                    onChange={(e) => {
                      setFormData({...formData, date: e.target.value});
                      handleNext();
                    }}
                    className="h-16 text-center text-xl font-light border-none bg-cream/20 rounded-2xl focus:ring-0"
                  />
                </div>
              </motion.div>
            )}

            {step === 'time' && (
              <motion.div
                key="time"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between">
                  <button onClick={handleBack} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                  <div className="text-center space-y-1">
                    <h2 className="text-2xl font-serif">À quelle heure ?</h2>
                    <p className="text-sm text-ink/40">Sélectionnez un créneau disponible</p>
                  </div>
                  <div className="w-10" />
                </div>

                <div className="space-y-12">
                  <div className="space-y-6">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-ink/40 text-center font-bold">Déjeuner</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {timeSlots.lunch.map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setFormData({...formData, time: t});
                            handleNext();
                          }}
                          className={`h-14 rounded-2xl flex items-center justify-center text-sm font-light transition-all border ${
                            formData.time === t 
                              ? 'bg-ink text-white border-ink shadow-lg' 
                              : 'bg-white border-black/5 hover:border-primary/40 text-ink/60'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-ink/40 text-center font-bold">Dîner</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {timeSlots.dinner.map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setFormData({...formData, time: t});
                            handleNext();
                          }}
                          className={`h-14 rounded-2xl flex items-center justify-center text-sm font-light transition-all border ${
                            formData.time === t 
                              ? 'bg-ink text-white border-ink shadow-lg' 
                              : 'bg-white border-black/5 hover:border-primary/40 text-ink/60'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between">
                  <button onClick={handleBack} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                  <div className="text-center space-y-1">
                    <h2 className="text-2xl font-serif">Vos coordonnées</h2>
                    <p className="text-sm text-ink/40">Dernière étape pour votre table</p>
                  </div>
                  <div className="w-10" />
                </div>

                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-black/5">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-ink/40 ml-1">Nom complet</label>
                        <Input 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="h-14 border border-black/10 bg-cream/20 rounded-2xl focus:border-primary transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-ink/40 ml-1">Téléphone</label>
                        <Input 
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="h-14 border border-black/10 bg-cream/20 rounded-2xl focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-ink/40 ml-1">Email</label>
                      <Input 
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="h-14 border border-black/10 bg-cream/20 rounded-2xl focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-ink/40 ml-1">Note ou occasion (Optionnel)</label>
                      <textarea 
                        value={formData.requests}
                        onChange={(e) => setFormData({...formData, requests: e.target.value})}
                        className="w-full p-4 h-32 border border-black/10 bg-cream/20 rounded-2xl text-sm resize-none focus:ring-0 focus:border-primary transition-colors"
                        placeholder="Ex: Anniversaire, allergies..."
                      />
                    </div>

                    <div className="pt-4">
                      <div className="bg-cream/30 p-6 rounded-2xl mb-8 space-y-3">
                        <h4 className="text-[10px] uppercase tracking-widest font-bold">Récapitulatif</h4>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/60">
                          <span className="flex items-center gap-2"><Users size={14} /> {formData.guests} convives</span>
                          <span className="flex items-center gap-2"><CalendarIcon size={14} /> {new Date(formData.date).toLocaleDateString('fr-FR')}</span>
                          <span className="flex items-center gap-2"><Clock size={14} /> {formData.time}</span>
                        </div>
                      </div>
                      <Button type="submit" className="w-full h-16 rounded-2xl text-sm font-bold uppercase tracking-[0.2em] shadow-xl">
                        Confirmer la réservation
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-10 py-12"
              >
                <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                  <Check size={40} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-serif">Merci pour votre confiance</h2>
                  <p className="text-ink/60 max-w-md mx-auto leading-relaxed font-light">
                    Votre demande de réservation a bien été reçue. Notre équipe reviendra vers vous par email très prochainement.
                  </p>
                </div>

                <Card className="max-w-md mx-auto p-8 bg-cream/30 border-none text-left space-y-6">
                  <div className="flex justify-between items-center border-b border-black/5 pb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-ink/40">Détails de la réservation</span>
                    <span className="font-mono font-bold text-primary">#RES-{Math.floor(Math.random() * 9000) + 1000}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-ink/40 uppercase text-[10px] font-bold tracking-widest mb-1">Client</p>
                        <p className="font-bold">{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-ink/40 uppercase text-[10px] font-bold tracking-widest mb-1">Date & Heure</p>
                        <p className="font-bold">{new Date(formData.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} à {formData.time}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-ink/40 uppercase text-[10px] font-bold tracking-widest mb-1">Convives</p>
                        <p className="font-bold">{formData.guests} personnes</p>
                      </div>
                      <div>
                        <p className="text-ink/40 uppercase text-[10px] font-bold tracking-widest mb-1">Lieu</p>
                        <p className="font-bold">Lune {site}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="pt-8 flex flex-col gap-4 max-w-xs mx-auto">
                  <Button onClick={() => setStep('guests')} className="h-14 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg">
                    Nouvelle réservation
                  </Button>
                  <Link to="/">
                    <Button variant="ghost" className="h-14 rounded-2xl text-xs font-bold uppercase tracking-widest">
                      Retour à l'accueil
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Info */}
        {step !== 'success' && (
          <div className="mt-20 pt-10 border-t border-black/5 grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink/40">Adresse</h4>
              <p className="text-sm text-ink/60">Rue des Jardins, Abidjan</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink/40">Contact</h4>
              <p className="text-sm text-ink/60">+225 07 00 00 00 00</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink/40">Horaires</h4>
              <p className="text-sm text-ink/60">Mardi — Dimanche</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
