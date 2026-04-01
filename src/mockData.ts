import { MenuItem, News, Site } from './types';

export const MOCK_SITES = [
  { id: '1', name: 'Marcory', address: 'Zone 4, Rue du Canal, Marcory, Abidjan', phone: '+225 07 00 00 00 01' },
  { id: '2', name: 'Bingerville', address: 'Quartier Résidentiel, Bingerville', phone: '+225 07 00 00 00 02' },
];

export const MOCK_MENU: MenuItem[] = [
  { 
    id: '9dbf6107-450e-46c1-9ea0-12a66ed5af71', 
    location: 'All',
    site_id: 'All', 
    category: 'Boissons', 
    name: 'Cappuccino Artisanal', 
    description: 'Café sélectionné, mousse de lait onctueuse', 
    price: 3500, 
    image: 'https://images.unsplash.com/photo-1534706936160-d5ee67737249?auto=format&fit=crop&q=80', 
    image_url: 'https://images.unsplash.com/photo-1534706936160-d5ee67737249?auto=format&fit=crop&q=80', 
    available: true,
    is_available: true
  },
  { 
    id: 'c7b5b947-a0b2-4243-9c71-1aea6d29c9de', 
    location: 'All',
    site_id: 'All', 
    category: 'Déjeuner', 
    name: 'Burger Signature', 
    description: 'Bœuf wagyu, fromage affiné, frites maison', 
    price: 12000, 
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80', 
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80', 
    available: true,
    is_available: true
  },
  { 
    id: 'd6f380e4-5495-4e29-95c6-61a2115f63c9', 
    location: 'All',
    site_id: 'All', 
    category: 'Petit-Déjeuner', 
    name: 'Petit Déjeuner Lune', 
    description: 'Œufs, bacon, pancakes et café', 
    price: 8500, 
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80', 
    image_url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80', 
    available: true,
    is_available: true
  }
];

export const MOCK_NEWS: News[] = [
  { 
    id: 'n1', 
    location: 'Marcory',
    site_id: '1', 
    title: 'Nouveau Menu Brunch', 
    summary: 'Découvrez nos nouvelles créations pour le weekend à Marcory.',
    content: 'Nous sommes ravis de vous présenter notre nouveau menu brunch ! Au programme : pancakes moelleux, œufs bénédictine revisités et notre célèbre café artisanal. Disponible tous les samedis et dimanches de 10h à 15h.', 
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800&h=400', 
    image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800&h=400', 
    created_at: new Date().toISOString() 
  },
  { 
    id: 'n2', 
    location: 'Bingerville',
    site_id: '2', 
    title: 'Soirée Jazz à Bingerville', 
    summary: 'Rejoignez-nous ce vendredi pour une soirée musicale exceptionnelle.',
    content: 'Lune Bingerville se transforme en club de jazz le temps d\'une soirée. Venez vibrer au son du saxophone tout en dégustant nos cocktails signature. Réservation fortement conseillée.', 
    image: 'https://images.unsplash.com/photo-1514525253344-f814d074358a?auto=format&fit=crop&q=80&w=800&h=400', 
    image_url: 'https://images.unsplash.com/photo-1514525253344-f814d074358a?auto=format&fit=crop&q=80&w=800&h=400', 
    created_at: new Date().toISOString() 
  },
];
