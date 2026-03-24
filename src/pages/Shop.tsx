import * as React from 'react';
import { useApp } from '@/src/context';
import { MOCK_MENU } from '@/src/mockData';
import { Card, Button, Input } from '@/src/components/UI';
import { ShoppingBag, Trash2, Plus, Minus, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export const Shop = () => {
  const { cart, addToCart, removeFromCart, clearCart, site } = useApp();
  const [step, setStep] = React.useState<'cart' | 'checkout' | 'success'>('cart');
  const today = new Date().toISOString().split('T')[0];
  const [orderInfo, setOrderInfo] = React.useState({
    name: '',
    phone: '',
    date: today,
    time: ''
  });
  
  const [orderItems, setOrderItems] = React.useState<any[]>([]);
  const [orderTotal, setOrderTotal] = React.useState(0);

  const cartItems = cart.map(item => {
    const product = MOCK_MENU.find(m => m.id === item.id);
    return { ...product, quantity: item.quantity };
  }).filter(item => item.id);

  const total = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderItems([...cartItems]);
    setOrderTotal(total);
    setStep('success');
    clearCart();
    toast.success('Commande validée !');
  };

  if (step === 'success') {
    return (
      <div className="pt-40 pb-24 max-w-xl mx-auto px-4 text-center">
        <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={48} />
        </div>
        <h1 className="text-4xl mb-4">Merci pour votre commande !</h1>
        <p className="text-ink/60 mb-4">Votre commande a été reçue par Lune {site}. Vous recevrez une notification dès qu'elle sera prête.</p>
        <div className="bg-cream p-6 rounded-3xl mb-8 text-left">
          <h3 className="font-bold mb-4 border-b border-black/5 pb-2">Détails de la commande</h3>
          <div className="space-y-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-ink/40">Date de retrait :</span>
                <span className="font-medium">{new Date(orderInfo.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/40">Créneau :</span>
                <span className="font-medium">{orderInfo.time}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-black/5">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-3 px-1">
                <span className="w-1/2 text-left">Libellé</span>
                <span className="w-1/4 text-center">Qté</span>
                <span className="w-1/4 text-right">Total</span>
              </div>
              <div className="space-y-2">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center px-1">
                    <span className="w-1/2 text-left font-medium">{item.name}</span>
                    <span className="w-1/4 text-center text-ink/60">{item.quantity}</span>
                    <span className="w-1/4 text-right font-medium">{(item.price! * item.quantity).toLocaleString()} FCFA</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-black/5 flex justify-between font-bold text-base">
              <span>Total payé</span>
              <span>{(orderTotal + 500).toLocaleString()} FCFA</span>
            </div>
          </div>
        </div>
        <Button onClick={() => setStep('cart')} className="w-full">Retour à la boutique</Button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-12">
        <ShoppingBag className="text-primary" size={32} />
        <h1 className="text-5xl">Click & Collect</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[40px] border border-black/5">
              <p className="text-ink/40 text-lg mb-6">Votre panier est vide</p>
              <Button variant="outline" onClick={() => window.location.href = '/menu'}>Voir le menu</Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <Card key={item.id} className="p-6 flex items-center gap-6">
                <img src={item.image_url} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                <div className="flex-1">
                  <h3 className="text-xl mb-1">{item.name}</h3>
                  <p className="text-primary font-bold">{item.price?.toLocaleString()} FCFA</p>
                </div>
                <div className="flex items-center gap-4 bg-cream rounded-xl p-1">
                  <button onClick={() => removeFromCart(item.id!)} className="p-2 hover:bg-white rounded-lg transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button onClick={() => addToCart(item.id!)} className="p-2 hover:bg-white rounded-lg transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
                <button onClick={() => clearCart()} className="p-2 text-ink/20 hover:text-red-500 transition-colors">
                  <Trash2 size={20} />
                </button>
              </Card>
            ))
          )}
        </div>

        {/* Summary / Checkout */}
        <div className="space-y-8">
          <Card className="p-8">
            <h2 className="text-2xl mb-6">Résumé</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-ink/60">
                <span>Sous-total</span>
                <span>{total.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-ink/60">
                <span>Frais de service</span>
                <span>500 FCFA</span>
              </div>
              <div className="h-px bg-black/5" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>{(total + 500).toLocaleString()} FCFA</span>
              </div>
            </div>

            {step === 'cart' ? (
              <Button 
                disabled={cartItems.length === 0}
                onClick={() => setStep('checkout')} 
                className="w-full"
              >
                Passer à la caisse
              </Button>
            ) : (
              <form onSubmit={handleCheckout} className="space-y-4">
                <Input 
                  placeholder="Nom complet" 
                  required 
                  value={orderInfo.name}
                  onChange={(e) => setOrderInfo({ ...orderInfo, name: e.target.value })}
                />
                <Input 
                  placeholder="Téléphone" 
                  type="tel" 
                  required 
                  value={orderInfo.phone}
                  onChange={(e) => setOrderInfo({ ...orderInfo, phone: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
                    <Input 
                      className="pl-12" 
                      type="date" 
                      required 
                      min={today}
                      value={orderInfo.date}
                      onChange={(e) => setOrderInfo({ ...orderInfo, date: e.target.value })}
                    />
                    <p className="text-[10px] text-ink/40 mt-1 ml-1">Retrait aujourd'hui ou plus tard</p>
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
                    <Input 
                      className="pl-12" 
                      type="time" 
                      required 
                      value={orderInfo.time}
                      onChange={(e) => setOrderInfo({ ...orderInfo, time: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">Confirmer la commande</Button>
                <Button variant="ghost" onClick={() => setStep('cart')} className="w-full">Retour au panier</Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
