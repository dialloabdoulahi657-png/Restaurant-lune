import * as React from 'react';
import { Card, Button, Input, Badge } from '@/src/components/UI';
import { useApp } from '@/src/context';
import { MOCK_MENU, MOCK_SITES } from '@/src/mockData';
import { LayoutDashboard, ShoppingBag, Calendar, Utensils, LogOut, ChevronRight, Search, Filter, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Logo } from '../components/Logo';

export const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [adminSite, setAdminSite] = React.useState<'Marcory' | 'Bingerville' | null>(null);
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'orders' | 'reservations' | 'menu'>('dashboard');
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    
    if (email.includes('marcory')) {
      setAdminSite('Marcory');
      setIsLoggedIn(true);
      toast.success('Connecté en tant que Gérant Marcory');
    } else if (email.includes('bingerville')) {
      setAdminSite('Bingerville');
      setIsLoggedIn(true);
      toast.success('Connecté en tant que Gérant Bingerville');
    } else {
      toast.error('Identifiants invalides. Utilisez "gerant.marcory@lune.ci" ou "gerant.bingerville@lune.ci"');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-10 bg-white">
          <div className="text-center mb-8">
            <Logo className="h-16 mx-auto mb-4" />
            <h1 className="text-3xl mb-2">Back-Office LUNE</h1>
            <p className="text-ink/40">Interface de gestion centralisée</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-ink/40">Email Professionnel</label>
              <Input name="email" type="email" placeholder="gerant.marcory@lune.ci" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-ink/40">Mot de passe</label>
              <Input name="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full py-4">Se connecter</Button>
          </form>
        </Card>
      </div>
    );
  }

  const siteId = adminSite === 'Marcory' ? '1' : '2';
  const menuItems = MOCK_MENU.filter(i => i.site_id === siteId);

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="w-72 bg-ink text-cream p-8 flex flex-col fixed h-full z-50">
        <div className="flex items-center mb-12">
          <Logo className="h-10" color="white" />
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
            { id: 'orders', label: 'Commandes', icon: ShoppingBag },
            { id: 'reservations', label: 'Réservations', icon: Calendar },
            { id: 'menu', label: 'Gestion Menu', icon: Utensils },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id ? 'bg-primary text-white' : 'text-cream/40 hover:bg-white/5'
              }`}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all mt-auto"
        >
          <LogOut size={20} />
          <span className="font-medium">Déconnexion</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl mb-2">Bonjour, Gérant {adminSite}</h1>
            <p className="text-ink/40">Voici l'activité de votre établissement aujourd'hui.</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
              <Input className="pl-12 w-64 bg-white" placeholder="Rechercher..." />
            </div>
            <Button variant="outline" className="bg-white">
              <Filter size={18} className="mr-2" /> Filtrer
            </Button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-12">
            <div className="grid grid-cols-4 gap-8">
              {[
                { label: 'Commandes', value: '12', trend: '+20%', icon: ShoppingBag },
                { label: 'Réservations', value: '8', trend: '+5%', icon: Calendar },
                { label: 'Chiffre d\'affaires', value: '245k', trend: '+12%', icon: Utensils },
                { label: 'Clients actifs', value: '42', trend: '+15%', icon: LayoutDashboard },
              ].map((stat, i) => (
                <Card key={i} className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                      <stat.icon size={24} />
                    </div>
                    <span className="text-green-500 text-xs font-bold">{stat.trend}</span>
                  </div>
                  <h4 className="text-ink/40 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</h4>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-8">
              <Card className="p-8">
                <h3 className="text-2xl mb-6">Dernières Commandes</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-cream rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-bold">#0{i}</div>
                        <div>
                          <p className="font-bold">Client #{i}24</p>
                          <p className="text-xs text-ink/40">Retrait : 12:{i}0</p>
                        </div>
                      </div>
                      <Badge variant={i === 1 ? 'primary' : 'secondary'}>
                        {i === 1 ? 'En préparation' : 'Prête'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-8">
                <h3 className="text-2xl mb-6">Réservations à venir</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-cream rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center"><Calendar size={20} /></div>
                        <div>
                          <p className="font-bold">M. Diallo (Table {i+2})</p>
                          <p className="text-xs text-ink/40">Aujourd'hui, 19:30</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-ink/20" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <Card className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl">Gestion des Commandes - {adminSite}</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Aujourd'hui</Button>
                <Button variant="outline" size="sm">Hier</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-black/5">
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">ID</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Client</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Date Retrait</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Créneau</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Total</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Statut</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i}>
                        <td className="py-4 font-mono">#ORD-00{i}</td>
                        <td className="py-4 font-bold">Client #{i}24</td>
                        <td className="py-4">24/03/2026</td>
                        <td className="py-4">12:{i}0</td>
                        <td className="py-4 font-medium">{(i * 4500).toLocaleString()} FCFA</td>
                        <td className="py-4">
                        <Badge variant={i % 2 === 0 ? 'primary' : 'secondary'}>
                          {i % 2 === 0 ? 'En préparation' : 'Livré'}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedOrder({
                            id: `#ORD-00${i}`,
                            client: `Client #${i}24`,
                            date: '24/03/2026',
                            time: `12:${i}0`,
                            total: 6000,
                            items: [
                              { name: 'Burger Lune', quantity: 1, price: 4500 },
                              { name: 'Frites Maison', quantity: 1, price: 1500 }
                            ]
                          })}
                        >
                          Détails
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[40px] p-10 max-w-lg w-full shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl mb-1">Détails Commande</h3>
                  <p className="text-ink/40 font-mono">{selectedOrder.id}</p>
                </div>
                <Button variant="ghost" onClick={() => setSelectedOrder(null)} className="rounded-full w-12 h-12 p-0">✕</Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6 bg-cream p-6 rounded-3xl">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-1">Date Retrait</p>
                    <p className="font-bold">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-1">Créneau</p>
                    <p className="font-bold">{selectedOrder.time}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-4 px-1">
                    <span className="w-1/2">Libellé</span>
                    <span className="w-1/4 text-center">Qté</span>
                    <span className="w-1/4 text-right">Total</span>
                  </div>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center border-b border-black/5 pb-3 px-1">
                        <span className="w-1/2 font-bold text-sm">{item.name}</span>
                        <span className="w-1/4 text-center font-medium">{item.quantity}</span>
                        <span className="w-1/4 text-right font-bold text-primary">{(item.price * item.quantity).toLocaleString()} FCFA</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">{selectedOrder.total.toLocaleString()} FCFA</span>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button className="flex-1">Valider la commande</Button>
                  <Button variant="outline" onClick={() => setSelectedOrder(null)} className="flex-1">Fermer</Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <Card className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl">Gestion des Réservations - {adminSite}</h3>
              <Button size="sm" className="gap-2"><Plus size={16} /> Nouvelle réservation</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-black/5">
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Client</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Personnes</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Date & Heure</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Table</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {[1, 2, 3, 4].map((i) => (
                    <tr key={i}>
                      <td className="py-4 font-bold">M. Diallo {i}</td>
                      <td className="py-4">{i + 1} pers.</td>
                      <td className="py-4">Aujourd'hui, 19:{i}0</td>
                      <td className="py-4">Table {i + 5}</td>
                      <td className="py-4">
                        <Badge variant="primary">Confirmé</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'menu' && (
          <Card className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl">Gestion du Menu - {adminSite}</h3>
              <Button size="sm" className="gap-2"><Plus size={16} /> Ajouter un produit</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-black/5">
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Produit</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Prix</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Statut</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {menuItems.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <img src={item.image_url} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                          <span className="font-bold">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4 font-medium">{item.price.toLocaleString()} FCFA</td>
                      <td className="py-4">
                        <Badge variant={item.is_available ? 'primary' : 'secondary'}>
                          {item.is_available ? 'En stock' : 'Rupture'}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Button variant="ghost" size="sm">Modifier</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};
