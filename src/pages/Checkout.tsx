import * as React from 'react';
import { useApp } from '../context';
import { MOCK_MENU } from '../mockData';
import { Card, Button, Input } from '../components/UI';
import { ShoppingBag, CreditCard, Smartphone, Wallet, CheckCircle2, ChevronLeft, Lock, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

type PaymentMethod = 'card' | 'momo' | 'wave' | 'pickup';

export const Checkout = () => {
  const { cart, clearCart, site, pickupDate } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = React.useState<'details' | 'payment' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>('card');
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [orderSummary, setOrderSummary] = React.useState<{
    items: any[];
    total: number;
    subtotal: number;
    serviceFee: number;
  } | null>(null);

  const cartItems = cart.map(item => {
    const product = MOCK_MENU.find(m => m.id === item.id);
    return { ...product, quantity: item.quantity };
  }).filter(item => item.id);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  const serviceFee = 500;
  const total = subtotal + serviceFee;

  React.useEffect(() => {
    if (cart.length === 0 && step !== 'success') {
      navigate('/shop');
    }
  }, [cart, navigate, step]);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePayment = () => {
    const loadingToast = toast.loading('Finalisation de la commande...');
    
    // Capture summary before clearing cart
    setOrderSummary({
      items: [...cartItems],
      total,
      subtotal,
      serviceFee
    });

    // Simulate order processing
    setTimeout(() => {
      toast.dismiss(loadingToast);
      setStep('success');
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (step === 'success' && orderSummary) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-24 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto text-center space-y-8"
        >
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-serif">Commande confirmée !</h1>
            <p className="text-ink/60 leading-relaxed">
              Merci <span className="font-bold text-ink">{formData.name}</span> pour votre confiance. Votre commande est en cours de préparation. 
              Un récapitulatif a été envoyé à <span className="font-bold text-primary">{formData.email}</span>.
            </p>
          </div>
          
          <Card className="p-8 bg-cream/30 border-none text-left space-y-6">
            <div className="flex justify-between items-center border-b border-black/5 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-ink/40">Récapitulatif de commande</span>
              <span className="font-mono font-bold text-primary">#LN-{Math.floor(Math.random() * 90000) + 10000}</span>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-ink/40 uppercase text-[10px] font-bold tracking-widest mb-1">Client</p>
                  <p className="font-bold">{formData.name}</p>
                </div>
                <div>
                  <p className="text-ink/40 uppercase text-[10px] font-bold tracking-widest mb-1">Retrait</p>
                  <p className="font-bold">{new Date(pickupDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} — Lune {site}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-black/5">
                <p className="text-ink/40 uppercase text-[10px] font-bold tracking-widest mb-3">Produits commandés</p>
                <div className="space-y-2">
                  {orderSummary.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-ink/60">{item.quantity}x {item.name}</span>
                      <span className="font-bold">{(item.price! * item.quantity).toLocaleString()} FCFA</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-black/5 flex justify-between items-center">
                <span className="text-ink/40 uppercase text-[10px] font-bold tracking-widest">Total à payer au retrait</span>
                <span className="text-xl font-bold text-primary">{orderSummary.total.toLocaleString()} FCFA</span>
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-4">
            <Link to="/shop">
              <Button className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest">Retour à la boutique</Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest">Retour à l'accueil</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/shop" className="p-2 hover:bg-cream rounded-full transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-4xl font-serif">Finaliser ma commande</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Steps Indicator */}
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${step === 'details' ? 'text-primary' : 'text-ink/20'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step === 'details' ? 'border-primary bg-primary text-white' : 'border-ink/10'}`}>1</span>
                <span className="text-xs font-bold uppercase tracking-widest">Détails</span>
              </div>
              <div className="h-px w-12 bg-ink/10" />
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary' : 'text-ink/20'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step === 'payment' ? 'border-primary bg-primary text-white' : 'border-ink/10'}`}>2</span>
                <span className="text-xs font-bold uppercase tracking-widest">Confirmation</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 'details' ? (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="p-10 rounded-[40px] border-none shadow-xl">
                    <form onSubmit={handleNextStep} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 ml-1">Nom complet</label>
                          <Input 
                            required 
                            placeholder="Jean Dupont"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="h-14 rounded-2xl bg-cream/30 border border-black/5"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 ml-1">Téléphone</label>
                          <Input 
                            required 
                            type="tel"
                            placeholder="+225 07 00 00 00 00"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="h-14 rounded-2xl bg-cream/30 border border-black/5"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 ml-1">Email</label>
                        <Input 
                          required 
                          type="email"
                          placeholder="jean.dupont@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="h-14 rounded-2xl bg-cream/30 border border-black/5"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40 ml-1">Notes pour la commande (Optionnel)</label>
                        <textarea 
                          placeholder="Allergies, message cadeau..."
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          className="w-full p-4 h-32 rounded-2xl bg-cream/30 border border-black/5 focus:ring-primary/10 text-sm resize-none"
                        />
                      </div>
                      <Button type="submit" className="w-full h-16 rounded-2xl font-bold uppercase tracking-widest shadow-lg">
                        Continuer
                      </Button>
                    </form>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <Card className="p-10 rounded-[40px] border-none shadow-xl space-y-8">
                    <div className="flex items-center gap-6 p-6 bg-primary/5 rounded-3xl border-2 border-primary">
                      <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center">
                        <ShoppingBag size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Paiement au retrait</p>
                        <p className="text-sm text-ink/60">Le règlement s'effectue directement en boutique lors de la récupération de votre commande.</p>
                      </div>
                    </div>

                    <div className="bg-cream/30 p-6 rounded-3xl space-y-4">
                      <div className="flex items-start gap-4 text-ink/60">
                        <Info size={20} className="text-primary shrink-0 mt-1" />
                        <p className="text-sm leading-relaxed">
                          Veuillez vous présenter au restaurant <span className="font-bold text-ink">Lune {site}</span> le <span className="font-bold text-ink">{new Date(pickupDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span> muni de votre numéro de commande.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="ghost" onClick={() => setStep('details')} className="flex-1 h-16 rounded-2xl font-bold uppercase tracking-widest">
                        Retour
                      </Button>
                      <Button onClick={handlePayment} className="flex-[2] h-16 rounded-2xl font-bold uppercase tracking-widest shadow-xl">
                        Confirmer la commande
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar: Order Summary */}
          <aside className="space-y-8">
            <Card className="p-8 rounded-[40px] border-none shadow-xl sticky top-40">
              <h2 className="text-2xl font-serif mb-8">Ma commande</h2>
              
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{item.name}</p>
                      <p className="text-xs text-ink/40">Qté: {item.quantity}</p>
                      <p className="text-xs font-bold text-primary">{(item.price! * item.quantity).toLocaleString()} FCFA</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-black/5 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-ink/40">Sous-total</span>
                  <span className="font-bold">{subtotal.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink/40">Frais de service</span>
                  <span className="font-bold">{serviceFee.toLocaleString()} FCFA</span>
                </div>
                <div className="h-px bg-black/5" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">{total.toLocaleString()} FCFA</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-cream rounded-3xl space-y-4">
                <div className="flex items-start gap-3">
                  <Info size={16} className="text-primary mt-1" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Retrait prévu</p>
                    <p className="text-xs text-ink/60">{new Date(pickupDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                    <p className="text-xs text-ink/60">Lune {site}</p>
                  </div>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};
