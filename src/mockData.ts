import { MenuItem, MenuCategory, News, Site } from './types';

export const MOCK_SITES = [
  { id: '1', name: 'Marcory', address: 'Zone 4, Rue du Canal, Marcory, Abidjan', phone: '+225 07 00 00 00 01' },
  { id: '2', name: 'Bingerville', address: 'Quartier Résidentiel, Bingerville', phone: '+225 07 00 00 00 02' },
];

export const MOCK_CATEGORIES: MenuCategory[] = [
  { id: 'c1', site_id: '1', name: 'Petit-déjeuner', display_order: 1 },
  { id: 'c2', site_id: '1', name: 'Brunch', display_order: 2 },
  { id: 'c3', site_id: '1', name: 'Plats Signature', display_order: 3 },
  { id: 'c4', site_id: '1', name: 'Cafétéria', display_order: 4 },
  { id: 'c5', site_id: '2', name: 'Petit-déjeuner', display_order: 1 },
  { id: 'c6', site_id: '2', name: 'Brunch', display_order: 2 },
  { id: 'c7', site_id: '2', name: 'Plats Signature', display_order: 3 },
  { id: 'c8', site_id: '2', name: 'Cafétéria', display_order: 4 },
];

export const MOCK_MENU: MenuItem[] = [
  // Marcory
  { 
    id: 'm1', 
    site_id: '1', 
    category_id: 'c1', 
    name: 'Petit Déjeuner Ivoirien', 
    description: 'Alloco, œufs, saucisses et pain frais.', 
    price: 4500, 
    image_url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=400&h=400', 
    is_available: true,
    portions: '1 personne',
    allergens: ['Gluten', 'Œufs']
  },
  { 
    id: 'm2', 
    site_id: '1', 
    category_id: 'c1', 
    name: 'Avocado Toast Prestige', 
    description: 'Pain au levain, avocat frais, œuf poché et graines de grenade.', 
    price: 6500, 
    image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400&h=400', 
    is_available: true,
    portions: '1 personne',
    allergens: ['Gluten', 'Œufs', 'Graines']
  },
  { 
    id: 'm3', 
    site_id: '1', 
    category_id: 'c2', 
    name: 'Oeufs Bénédicte Saumon', 
    description: 'Saumon fumé, sauce hollandaise maison sur muffin anglais.', 
    price: 8500, 
    image_url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=400&h=400', 
    is_available: true,
    portions: '1 personne',
    allergens: ['Gluten', 'Œufs', 'Poisson', 'Lait']
  },
  { 
    id: 'm4', 
    site_id: '1', 
    category_id: 'c3', 
    name: 'Burger LUNE Signature', 
    description: 'Bœuf wagyu, cheddar affiné, oignons caramélisés et frites maison.', 
    price: 12000, 
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400&h=400', 
    is_available: true,
    portions: '1 personne',
    allergens: ['Gluten', 'Lait', 'Sésame']
  },
  { 
    id: 'm5', 
    site_id: '1', 
    category_id: 'c4', 
    name: 'Cappuccino Artisanal', 
    description: 'Café de Côte d\'Ivoire fraîchement torréfié.', 
    price: 2500, 
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400&h=400', 
    is_available: true,
    portions: '250ml',
    allergens: ['Lait']
  },
  
  // Bingerville
  { 
    id: 'm6', 
    site_id: '2', 
    category_id: 'c5', 
    name: 'Pancakes Myrtilles', 
    description: 'Sirop d\'érable, crème fouettée et fruits frais.', 
    price: 4500, 
    image_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?auto=format&fit=crop&q=80&w=400&h=400', 
    is_available: true,
    portions: '2-3 personnes',
    allergens: ['Gluten', 'Œufs', 'Lait']
  },
  { 
    id: 'm7', 
    site_id: '2', 
    category_id: 'c7', 
    name: 'Salade César Poulet', 
    description: 'Poulet grillé, parmesan, croûtons et sauce César maison.', 
    price: 7500, 
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400&h=400', 
    is_available: true,
    portions: '1 personne',
    allergens: ['Gluten', 'Œufs', 'Lait', 'Moutarde']
  },
  { 
    id: 'm8', 
    site_id: '2', 
    category_id: 'c7', 
    name: 'Poisson Braisé Bingerville', 
    description: 'Poisson frais du jour, attiéké et sauce pimentée.', 
    price: 9500, 
    image_url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400&h=400', 
    is_available: true,
    portions: '1 personne',
    allergens: ['Poisson']
  },
  { 
    id: 'm9', 
    site_id: '2', 
    category_id: 'c8', 
    name: 'Jus de Bissap Maison', 
    description: 'Infusion d\'hibiscus, menthe et gingembre.', 
    price: 2000, 
    image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400&h=400', 
    is_available: true,
    portions: '330ml',
    allergens: []
  },
];

export const MOCK_NEWS: News[] = [
  { id: 'n1', site_id: '1', title: 'Nouveau Menu Brunch', content: 'Découvrez nos nouvelles créations pour le weekend à Marcory.', image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800&h=400', created_at: new Date().toISOString() },
  { id: 'n2', site_id: '2', title: 'Soirée Jazz à Bingerville', content: 'Rejoignez-nous ce vendredi pour une soirée musicale exceptionnelle.', image_url: 'https://images.unsplash.com/photo-1514525253344-f814d074358a?auto=format&fit=crop&q=80&w=800&h=400', created_at: new Date().toISOString() },
];
