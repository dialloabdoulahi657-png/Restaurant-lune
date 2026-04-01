import * as React from 'react';
import { Card, Button, Input, Badge } from '@/src/components/UI';
import { useApp } from '@/src/context';
import { LayoutDashboard, ShoppingBag, Calendar, Utensils, LogOut, ChevronRight, Filter, Plus, Trash2, Settings, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Logo } from '../components/Logo';
import { supabase } from '@/src/lib/supabase';
import { MOCK_MENU, MOCK_NEWS } from '@/src/mockData';

export const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [adminSite, setAdminSite] = React.useState<'Marcory' | 'Bingerville' | null>(null);
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'orders' | 'reservations' | 'menu' | 'news' | 'settings'>('dashboard');
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null);
  const [news, setNews] = React.useState<any[]>([]);
  const [orders, setOrders] = React.useState<any[]>([]);
  const [reservations, setReservations] = React.useState<any[]>([]);
  const [menu, setMenu] = React.useState<any[]>([]);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [menuStatusFilter, setMenuStatusFilter] = React.useState<string>('all');
  const [resStatusFilter, setResStatusFilter] = React.useState<string>('all');

  const [editingNews, setEditingNews] = React.useState<any>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = React.useState(false);
  const [editingMenuItem, setEditingMenuItem] = React.useState<any>(null);
  const [isMenuModalOpen, setIsMenuModalOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] = React.useState<any>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = React.useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null);
  const [deleteConfirmType, setDeleteConfirmType] = React.useState<'menu' | 'news' | 'order' | 'reservation' | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    console.log('--- DÉBUT FETCH DATA ---');
    try {
      const [newsRes, ordersRes, reservationsRes, menuRes] = await Promise.all([
        supabase.from('news').select('*'),
        supabase.from('orders').select('*'),
        supabase.from('reservations').select('*'),
        supabase.from('menu').select('*')
      ]);

      console.log('Réponse News:', { count: newsRes.data?.length, error: newsRes.error });
      console.log('Réponse Orders:', { count: ordersRes.data?.length, error: ordersRes.error });
      console.log('Réponse Reservations:', { count: reservationsRes.data?.length, error: reservationsRes.error });
      console.log('Réponse Menu:', { count: menuRes.data?.length, error: menuRes.error });

      if (newsRes.error) toast.error(`Erreur News: ${newsRes.error.message}`);
      if (ordersRes.error) toast.error(`Erreur Commandes: ${ordersRes.error.message}`);
      if (reservationsRes.error) toast.error(`Erreur Réservations: ${reservationsRes.error.message}`);
      if (menuRes.error) toast.error(`Erreur Menu: ${menuRes.error.message}`);

      // Sort in JS to avoid errors if created_at is missing
      const sortData = (data: any[]) => {
        if (!data) return [];
        return [...data].sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });
      };

      if (newsRes.data) {
        console.log('News raw data sample:', newsRes.data[0]);
        setNews(sortData(newsRes.data));
      }
      if (ordersRes.data) {
        console.log('Orders raw data sample:', ordersRes.data[0]);
        setOrders(sortData(ordersRes.data));
      }
      if (reservationsRes.data) {
        console.log('Reservations raw data sample:', reservationsRes.data[0]);
        setReservations(sortData(reservationsRes.data));
      }
      if (menuRes.data) {
        console.log('Menu raw data sample:', menuRes.data[0]);
        const sortedMenu = sortData(menuRes.data);
        setMenu(sortedMenu);
        // Extract unique categories from menu items
        const uniqueCategories = Array.from(new Set(sortedMenu.map((item: any) => item.category))).map(name => {
          const item = sortedMenu.find((item: any) => item.category === name);
          return {
            name,
            site_id: item?.site_id,
            location: item?.location
          };
        });
        setCategories(uniqueCategories);
      }
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast.error(`Erreur lors du chargement: ${error.message || 'Erreur inconnue'}`);
    } finally {
      setIsLoading(false);
      console.log('--- FIN FETCH DATA ---');
    }
  };

  React.useEffect(() => {
    const checkConfig = () => {
      const url = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
      if (!url || !key) {
        toast.error("Configuration Supabase manquante ! Vérifiez les variables d'environnement.");
        console.error("Supabase config missing:", { url: !!url, key: !!key });
      }
    };
    checkConfig();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const passwordInput = formData.get('password') as string;
    
    const marcoryPass = localStorage.getItem('admin_password_Marcory') || 'admin123';
    const bingervillePass = localStorage.getItem('admin_password_Bingerville') || 'admin123';

    if (email.includes('marcory')) {
      if (passwordInput === marcoryPass) {
        setAdminSite('Marcory');
        setIsLoggedIn(true);
        toast.success('Connecté en tant que Gérant Marcory');
      } else {
        toast.error('Mot de passe incorrect pour Marcory');
      }
    } else if (email.includes('bingerville')) {
      if (passwordInput === bingervillePass) {
        setAdminSite('Bingerville');
        setIsLoggedIn(true);
        toast.success('Connecté en tant que Gérant Bingerville');
      } else {
        toast.error('Mot de passe incorrect pour Bingerville');
      }
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

  // Robust filtering that works with both numeric IDs and string names
  const matchesSite = (item: any) => {
    if (!item) return false;
    
    // Check both site_id and location fields
    const sId = String(item.site_id || item.location || '');
    if (!sId) return false;

    const normalizedSId = sId.toLowerCase();
    const normalizedAdminSite = String(adminSite).toLowerCase();

    return sId === siteId || 
           normalizedSId === normalizedAdminSite || 
           sId === 'All' || 
           normalizedSId === 'all' ||
           normalizedSId === 'tous';
  };

  const siteMenuItems = menu.filter((i: any) => matchesSite(i));
  const siteCategories = categories.filter((c: any) => matchesSite(c));
  const siteNews = news.filter((n: any) => matchesSite(n));
  const siteOrders = orders.filter((o: any) => matchesSite(o));
  const siteReservations = reservations.filter((r: any) => matchesSite(r));

  const filteredOrders = siteOrders.filter((o: any) => {
    const matchesStatus = statusFilter === 'all' ? true : o.status === statusFilter;
    return matchesStatus;
  });

  const filteredReservations = siteReservations.filter((r: any) => {
    const matchesStatus = resStatusFilter === 'all' ? true : r.status === resStatusFilter;
    return matchesStatus;
  });

  const filteredMenu = siteMenuItems.filter((i: any) => {
    // Support both 'available' and legacy fields
    const isAvailable = i.available !== undefined ? i.available : (i.is_available !== undefined ? i.is_available : i.disponible);
    const matchesStatus = menuStatusFilter === 'all' ? true : 
                         (menuStatusFilter === 'available' ? isAvailable === true : isAvailable === false);
    return matchesStatus;
  });

  const filteredNews = siteNews;

  const isSupabaseConfigured = !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-10 bg-white text-center">
          <Logo className="h-16 mx-auto mb-4" />
          <h1 className="text-3xl mb-2 text-red-500">Configuration Manquante</h1>
          <p className="text-ink/60 mb-8">Les variables d'environnement Supabase (URL et Clé Anon) ne sont pas configurées dans les paramètres de l'application.</p>
          <div className="bg-cream p-4 rounded-2xl text-left text-xs font-mono mb-8">
            <p>VITE_SUPABASE_URL=...</p>
            <p>VITE_SUPABASE_ANON_KEY=...</p>
          </div>
          <Button onClick={() => window.location.reload()} className="w-full">Réessayer</Button>
        </Card>
      </div>
    );
  }

  // Dashboard Stats
  const today = new Date().toISOString().split('T')[0];
  const todayOrders = siteOrders.filter((o: any) => (o.created_at || '').startsWith(today));
  const todayReservations = siteReservations.filter((r: any) => r.reservation_date === today);
  const todayRevenue = todayOrders.reduce((acc: number, o: any) => acc + Number(o.total_price || 0), 0);

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newsData = {
      location: adminSite,
      title: formData.get('title') as string,
      summary: formData.get('summary') as string,
      content: formData.get('content') as string,
      image: formData.get('image_url') as string || 'https://picsum.photos/seed/news/800/400',
    };

    try {
      if (editingNews) {
        const { error } = await supabase.from('news').update(newsData).eq('id', editingNews.id);
        if (error) throw error;
        toast.success('Actualité mise à jour');
      } else {
        const { error } = await supabase.from('news').insert([newsData]);
        if (error) throw error;
        toast.success('Actualité créée');
      }
      fetchData();
      setIsNewsModalOpen(false);
      setEditingNews(null);
    } catch (error) {
      console.error('Error saving news:', error);
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleDeleteNews = async (id: string) => {
    setDeleteConfirmId(id);
    setDeleteConfirmType('news');
  };

  const confirmDeleteNews = async () => {
    if (!deleteConfirmId) return;
    try {
      const { error } = await supabase.from('news').delete().eq('id', deleteConfirmId);
      if (error) throw error;
      toast.success('Actualité supprimée');
      fetchData();
    } catch (error) {
      console.error('Error deleting news:', error);
      toast.error('Erreur lors de la suppression');
    } finally {
      setDeleteConfirmId(null);
      setDeleteConfirmType(null);
    }
  };

  const handleSaveMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const priceStr = formData.get('price') as string;
    const price = Number(priceStr);
    const isAvailable = formData.get('available') === 'on';
    const imageUrl = formData.get('image_url') as string;

    if (!name || !category || isNaN(price)) {
      toast.error('Veuillez remplir tous les champs obligatoires correctement');
      return;
    }

    const itemData = {
      location: adminSite,
      category,
      name,
      description,
      price,
      image: imageUrl || 'https://picsum.photos/seed/food/400/400',
      available: isAvailable
    };

    console.log('Tentative d\'enregistrement du produit:', itemData);

    try {
      if (editingMenuItem) {
        const { error } = await supabase.from('menu').update(itemData).eq('id', editingMenuItem.id);
        if (error) throw error;
        toast.success('Produit mis à jour');
      } else {
        const { error } = await supabase.from('menu').insert([itemData]);
        if (error) throw error;
        toast.success('Produit ajouté');
      }
      fetchData();
      setIsMenuModalOpen(false);
      setEditingMenuItem(null);
    } catch (error: any) {
      console.error('Error saving menu item:', error);
      const errorMsg = error.message || 'Erreur inconnue';
      toast.error(`Erreur lors de l'enregistrement : ${errorMsg}`);
      
      if (errorMsg.includes('permission denied') || errorMsg.includes('RLS')) {
        toast.info('Conseil : Vérifiez que les politiques RLS sont désactivées sur Supabase pour la table "menu".');
      }
    }
  };

  const handleDeleteMenuItem = async (id: string) => {
    setDeleteConfirmId(id);
    setDeleteConfirmType('menu');
  };

  const confirmDeleteMenuItem = async () => {
    if (!deleteConfirmId) return;
    try {
      const { error } = await supabase.from('menu').delete().eq('id', deleteConfirmId);
      if (error) throw error;
      toast.success('Produit supprimé');
      fetchData();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      toast.error('Erreur lors de la suppression');
    } finally {
      setDeleteConfirmId(null);
      setDeleteConfirmType(null);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
      if (error) throw error;
      toast.success(`Statut de la commande mis à jour : ${status}`);
      fetchData();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleUpdateReservationStatus = async (resId: string, status: string) => {
    try {
      const { error } = await supabase.from('reservations').update({ status }).eq('id', resId);
      if (error) throw error;
      toast.success(`Statut de la réservation mis à jour : ${status}`);
      fetchData();
    } catch (error) {
      console.error('Error updating reservation status:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDeleteOrder = async (id: string) => {
    setDeleteConfirmId(id);
    setDeleteConfirmType('order');
  };

  const confirmDeleteOrder = async () => {
    if (!deleteConfirmId) return;
    try {
      const { error } = await supabase.from('orders').delete().eq('id', deleteConfirmId);
      if (error) throw error;
      toast.success('Commande supprimée');
      fetchData();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Erreur lors de la suppression');
    } finally {
      setDeleteConfirmId(null);
      setDeleteConfirmType(null);
    }
  };

  const handleDeleteReservation = async (id: string) => {
    setDeleteConfirmId(id);
    setDeleteConfirmType('reservation');
  };

  const confirmDeleteReservation = async () => {
    if (!deleteConfirmId) return;
    try {
      const { error } = await supabase.from('reservations').delete().eq('id', deleteConfirmId);
      if (error) throw error;
      toast.success('Réservation supprimée');
      fetchData();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      toast.error('Erreur lors de la suppression');
    } finally {
      setDeleteConfirmId(null);
      setDeleteConfirmType(null);
    }
  };

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
            { id: 'news', label: 'Actualités', icon: LayoutDashboard },
            { id: 'settings', label: 'Paramètres', icon: Settings },
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
      <main className="flex-1 ml-72 p-12 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-ink/60 font-medium">Chargement des données...</p>
            </div>
          </div>
        )}

        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl mb-2">Bonjour, Gérant {adminSite}</h1>
            <p className="text-ink/40">Voici l'activité de votre établissement aujourd'hui.</p>
          </div>
          <div className="flex gap-4">
            {activeTab === 'orders' && (
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-black/5 rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-primary/10 outline-none"
              >
                <option value="all">Tous les statuts</option>
                <option value="received">Reçues</option>
                <option value="preparing">En préparation</option>
                <option value="ready">Prêtes</option>
                <option value="completed">Terminées</option>
              </select>
            )}

            {activeTab === 'reservations' && (
              <select 
                value={resStatusFilter}
                onChange={(e) => setResStatusFilter(e.target.value)}
                className="bg-white border border-black/5 rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-primary/10 outline-none"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmées</option>
                <option value="cancelled">Annulées</option>
              </select>
            )}

            {activeTab === 'menu' && (
              <select 
                value={menuStatusFilter}
                onChange={(e) => setMenuStatusFilter(e.target.value)}
                className="bg-white border border-black/5 rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-primary/10 outline-none"
              >
                <option value="all">Tous les statuts</option>
                <option value="available">EN STOCK</option>
                <option value="unavailable">RUPTURE</option>
              </select>
            )}
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-12">
            <div className="grid grid-cols-4 gap-8">
              {[
                { label: 'Commandes', value: todayOrders.length.toString(), trend: '', icon: ShoppingBag },
                { label: 'Réservations', value: siteReservations.length.toString(), trend: '', icon: Calendar },
                { label: 'Chiffre d\'affaires', value: `${(todayRevenue / 1000).toFixed(1)}k`, trend: '', icon: Utensils },
                { label: 'Clients actifs', value: todayOrders.length.toString(), trend: '', icon: LayoutDashboard },
              ].map((stat, i) => (
                <Card key={i} className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                      <stat.icon size={24} />
                    </div>
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
                  {siteOrders.slice(0, 3).map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-cream rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-bold">#</div>
                        <div>
                          <p className="font-bold">{order.customer_name}</p>
                          <p className="text-xs text-ink/40">Retrait : {order.pickup_time}</p>
                        </div>
                      </div>
                      <Badge variant={order.status === 'received' ? 'secondary' : 'primary'}>
                        {order.status === 'received' ? 'Reçue' : order.status === 'preparing' ? 'En préparation' : order.status === 'ready' ? 'Prête' : 'Terminée'}
                      </Badge>
                    </div>
                  ))}
                  {siteOrders.length === 0 && <p className="text-ink/40 text-center py-8">Aucune commande</p>}
                </div>
              </Card>
              <Card className="p-8">
                <h3 className="text-2xl mb-6">Réservations à venir</h3>
                <div className="space-y-4">
                  {siteReservations.slice(0, 3).map((res: any) => (
                    <div key={res.id} className="flex items-center justify-between p-4 bg-cream rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center"><Calendar size={20} /></div>
                        <div>
                          <p className="font-bold">{res.customer_name} ({res.guests} pers.)</p>
                          <p className="text-xs text-ink/40">{res.reservation_date}, {res.reservation_time}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-ink/20" />
                    </div>
                  ))}
                  {siteReservations.length === 0 && <p className="text-ink/40 text-center py-8">Aucune réservation</p>}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto">
            <header className="mb-12">
              <h1 className="text-4xl mb-2">Paramètres du compte</h1>
              <p className="text-ink/40">Gérez vos informations de sécurité et vos préférences.</p>
            </header>

            <Card className="p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                  <Lock size={24} />
                </div>
                <div>
                  <h3 className="text-2xl">Changer le mot de passe</h3>
                  <p className="text-sm text-ink/40">Renforcez la sécurité de votre accès au back-office.</p>
                </div>
              </div>

              <form 
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const oldPass = formData.get('old_password') as string;
                  const newPass = formData.get('new_password') as string;
                  const confirmPass = formData.get('confirm_password') as string;

                  const currentPass = localStorage.getItem(`admin_password_${adminSite}`) || 'admin123';

                  if (oldPass !== currentPass) {
                    toast.error('L\'ancien mot de passe est incorrect');
                    return;
                  }

                  if (newPass !== confirmPass) {
                    toast.error('Les nouveaux mots de passe ne correspondent pas');
                    return;
                  }

                  if (newPass.length < 6) {
                    toast.error('Le nouveau mot de passe doit faire au moins 6 caractères');
                    return;
                  }

                  localStorage.setItem(`admin_password_${adminSite}`, newPass);
                  toast.success('Mot de passe mis à jour avec succès !');
                  (e.target as HTMLFormElement).reset();
                }}
              >
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-ink/40 ml-1">Ancien mot de passe</label>
                  <Input name="old_password" type="password" required className="h-14 bg-cream/20" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-ink/40 ml-1">Nouveau mot de passe</label>
                    <Input name="new_password" type="password" required className="h-14 bg-cream/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-ink/40 ml-1">Confirmer le nouveau</label>
                    <Input name="confirm_password" type="password" required className="h-14 bg-cream/20" />
                  </div>
                </div>

                <Button type="submit" className="w-full py-4 mt-4">
                  Mettre à jour le mot de passe
                </Button>
              </form>
            </Card>
          </div>
        )}

        {activeTab === 'orders' && (
          <Card className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl">Gestion des Commandes - {adminSite}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-black/5">
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Client</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Téléphone</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Email</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Retrait</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Total</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Statut</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                    {filteredOrders.map((order: any) => {
                      return (
                        <tr key={order.id}>
                          <td className="py-4 font-bold">{order.customer_name}</td>
                          <td className="py-4 text-sm">{order.customer_phone || 'N/A'}</td>
                          <td className="py-4 text-sm">{order.customer_email || 'N/A'}</td>
                          <td className="py-4 text-sm">
                            <div className="flex flex-col">
                              <span className="font-bold">{order.pickup_date || order.pickupDate || 'N/A'}</span>
                              <span className="text-xs text-ink/40">{order.pickup_time || order.pickupTime || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="py-4 font-medium">{Number(order.total_price || 0).toLocaleString()} FCFA</td>
                          <td className="py-4">
                            <select 
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className="bg-cream border-none rounded-lg text-xs font-bold p-2"
                            >
                              <option value="received">Reçue</option>
                              <option value="preparing">En préparation</option>
                              <option value="ready">Prête</option>
                              <option value="completed">Terminée</option>
                            </select>
                          </td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>Détails</Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500 hover:bg-red-50 flex items-center gap-2" 
                                onClick={() => handleDeleteOrder(order.id)}
                                title="Supprimer la commande"
                              >
                                <Trash2 size={14} />
                                <span className="text-xs font-bold">Supprimer</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredOrders.length === 0 && <tr><td colSpan={7} className="py-12 text-center text-ink/40">Aucune commande trouvée</td></tr>}
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
                    <p className="font-bold">{new Date(selectedOrder.pickup_date || selectedOrder.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-1">Créneau</p>
                    <p className="font-bold">{selectedOrder.pickup_time}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-4 px-1">
                    <span className="w-1/2">Libellé</span>
                    <span className="w-1/4 text-center">Qté</span>
                    <span className="w-1/4 text-right">Total</span>
                  </div>
                  <div className="space-y-3">
                    {(Array.isArray(selectedOrder.items) ? selectedOrder.items : JSON.parse(selectedOrder.items || '[]')).map((item: any, idx: number) => (
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
                  <span className="text-primary">{Number(selectedOrder.total_price || 0).toLocaleString()} FCFA</span>
                </div>

                {selectedOrder.notes && (
                  <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-1">Informations (Allergies / Notes)</p>
                    <p className="text-sm font-bold text-red-800">{selectedOrder.notes}</p>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button className="flex-1" onClick={() => {
                    handleUpdateOrderStatus(selectedOrder.id, 'ready');
                    setSelectedOrder(null);
                  }}>Prête pour retrait</Button>
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
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-black/5">
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Client</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Téléphone</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Personnes</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Date & Heure</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Zone</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Statut</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredReservations.map((res: any) => {
                    const resDate = res.reservation_date || res.reservationDate || res.date;
                    const resTime = res.reservation_time || res.reservationTime || res.time;
                    
                    return (
                      <tr key={res.id}>
                        <td className="py-4 font-bold">{res.customer_name}</td>
                        <td className="py-4 text-sm">{res.customer_phone || 'N/A'}</td>
                        <td className="py-4">{res.guests} pers.</td>
                        <td className="py-4">{resDate}, {resTime}</td>
                        <td className="py-4">{res.zone}</td>
                        <td className="py-4">
                          <select 
                            value={res.status}
                            onChange={(e) => handleUpdateReservationStatus(res.id, e.target.value)}
                            className="bg-cream border-none rounded-lg text-xs font-bold p-2"
                          >
                            <option value="pending">En attente</option>
                            <option value="confirmed">Confirmée</option>
                            <option value="cancelled">Annulée</option>
                          </select>
                        </td>
                        <td className="py-4">
                          <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteReservation(res.id)}>Supprimer</Button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredReservations.length === 0 && <tr><td colSpan={7} className="py-12 text-center text-ink/40">Aucune réservation trouvée</td></tr>}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'menu' && (
          <div className="space-y-8">
            <Card className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl">Gestion du Menu - {adminSite}</h3>
                <Button 
                  size="sm" 
                  className="gap-2"
                  onClick={() => {
                    setEditingMenuItem(null);
                    setIsMenuModalOpen(true);
                  }}
                >
                  <Plus size={16} /> Ajouter un produit
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-black/5">
                      <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Produit</th>
                      <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Catégorie</th>
                      <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Prix</th>
                      <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Statut</th>
                      <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {filteredMenu.map((item: any) => {
                      const isAvailable = item.available !== undefined ? item.available : (item.is_available !== undefined ? item.is_available : item.disponible);
                      const imageUrl = item.image_url || item.image;
                      
                      return (
                        <tr key={item.id}>
                          <td className="py-4">
                            <div className="flex items-center gap-4">
                              <img src={imageUrl} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                              <span className="font-bold">{item.name}</span>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-ink/60">
                            {item.category || 'Sans catégorie'}
                          </td>
                          <td className="py-4 font-medium">{item.price.toLocaleString()} FCFA</td>
                          <td className="py-4">
                            <Badge variant={isAvailable ? 'primary' : 'secondary'}>
                              {isAvailable ? 'En stock' : 'Rupture'}
                            </Badge>
                          </td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setEditingMenuItem(item);
                                  setIsMenuModalOpen(true);
                                }}
                              >
                                Modifier
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500"
                                onClick={() => handleDeleteMenuItem(item.id)}
                              >
                                Supprimer
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredMenu.length === 0 && <tr><td colSpan={5} className="py-12 text-center text-ink/40">Aucun produit trouvé</td></tr>}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Menu Modal */}
        <AnimatePresence>
          {isMenuModalOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[40px] p-10 max-w-2xl w-full shadow-2xl"
              >
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-3xl">{editingMenuItem ? 'Modifier le produit' : 'Nouveau produit'}</h3>
                  <Button variant="ghost" onClick={() => setIsMenuModalOpen(false)} className="rounded-full w-12 h-12 p-0">✕</Button>
                </div>

                <form onSubmit={handleSaveMenuItem} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-ink/40">Nom</label>
                      <Input name="name" defaultValue={editingMenuItem?.name} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-ink/40">Prix (FCFA)</label>
                      <Input name="price" type="number" defaultValue={editingMenuItem?.price} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-ink/40">Catégorie</label>
                    <Input 
                      name="category" 
                      defaultValue={editingMenuItem?.category} 
                      placeholder="ex: Petit-déjeuner, Plats, Desserts" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-ink/40">URL de l'image</label>
                    <Input 
                      name="image_url" 
                      defaultValue={editingMenuItem?.image_url || editingMenuItem?.image} 
                      placeholder="https://images.unsplash.com/photo-..." 
                      required 
                    />
                    <p className="text-[10px] text-ink/40 italic">Copiez-collez l'adresse d'une image (Unsplash, etc.)</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-ink/40">Description</label>
                    <textarea 
                      name="description" 
                      defaultValue={editingMenuItem?.description}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-black/10 bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-24 resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      name="available" 
                      id="available"
                      defaultChecked={editingMenuItem ? editingMenuItem.available : true}
                      className="w-5 h-5 rounded border-black/10 text-primary focus:ring-primary"
                    />
                    <label htmlFor="available" className="text-sm font-bold">Disponible en stock</label>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1">{editingMenuItem ? 'Enregistrer' : 'Ajouter'}</Button>
                    <Button type="button" variant="outline" onClick={() => setIsMenuModalOpen(false)} className="flex-1">Annuler</Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {activeTab === 'news' && (
          <Card className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl">Gestion des Actualités - {adminSite}</h3>
              <Button 
                size="sm" 
                className="gap-2"
                onClick={() => {
                  setEditingNews(null);
                  setIsNewsModalOpen(true);
                }}
              >
                <Plus size={16} /> Nouvelle actualité
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-black/5">
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Image</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Titre</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Date</th>
                    <th className="pb-4 text-xs font-bold uppercase tracking-widest text-ink/40">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredNews.map((item: any) => (
                    <tr key={item.id}>
                      <td className="py-4">
                        <img src={item.image_url} className="w-16 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      </td>
                      <td className="py-4 font-bold">{item.title}</td>
                      <td className="py-4 text-sm text-ink/40">
                        {item.created_at ? new Date(item.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setEditingNews(item);
                              setIsNewsModalOpen(true);
                            }}
                          >
                            Modifier
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:bg-red-50"
                            onClick={() => handleDeleteNews(item.id)}
                          >
                            Supprimer
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredNews.length === 0 && <tr><td colSpan={4} className="py-12 text-center text-ink/40">Aucune actualité trouvée</td></tr>}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* News Modal */}
        <AnimatePresence>
          {isNewsModalOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[40px] p-10 max-w-2xl w-full shadow-2xl"
              >
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-3xl">{editingNews ? 'Modifier l\'actualité' : 'Nouvelle actualité'}</h3>
                  <Button variant="ghost" onClick={() => setIsNewsModalOpen(false)} className="rounded-full w-12 h-12 p-0">✕</Button>
                </div>

                <form onSubmit={handleSaveNews} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-ink/40">Titre</label>
                    <Input name="title" defaultValue={editingNews?.title} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-ink/40">URL de l'image</label>
                    <Input 
                      name="image_url" 
                      defaultValue={editingNews?.image_url || editingNews?.image} 
                      placeholder="https://images.unsplash.com/photo-..." 
                      required 
                    />
                    <p className="text-[10px] text-ink/40 italic">Utilisez une URL d'image pour l'actualité</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-ink/40">Résumé (Lire la suite)</label>
                    <textarea 
                      name="summary" 
                      defaultValue={editingNews?.summary}
                      required
                      placeholder="Un court texte qui apparaîtra sur la carte..."
                      className="w-full px-4 py-3 rounded-2xl border border-black/10 bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-24 resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-ink/40">Contenu Complet</label>
                    <textarea 
                      name="content" 
                      defaultValue={editingNews?.content}
                      required
                      placeholder="Le texte complet qui apparaîtra dans le modal..."
                      className="w-full px-4 py-3 rounded-2xl border border-black/10 bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-40 resize-none"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1">{editingNews ? 'Enregistrer' : 'Publier'}</Button>
                    <Button type="button" variant="outline" onClick={() => setIsNewsModalOpen(false)} className="flex-1">Annuler</Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {deleteConfirmId && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl text-center"
              >
                <h3 className="text-2xl mb-4">Confirmer la suppression</h3>
                <p className="text-ink/60 mb-8">
                  Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
                </p>
                <div className="flex gap-4">
                  <Button 
                    className="flex-1 bg-red-500 hover:bg-red-600" 
                    onClick={() => {
                      if (deleteConfirmType === 'menu') confirmDeleteMenuItem();
                      else if (deleteConfirmType === 'news') confirmDeleteNews();
                      else if (deleteConfirmType === 'order') confirmDeleteOrder();
                      else if (deleteConfirmType === 'reservation') confirmDeleteReservation();
                    }}
                  >
                    Supprimer
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={() => {
                      setDeleteConfirmId(null);
                      setDeleteConfirmType(null);
                    }}
                  >
                    Annuler
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
