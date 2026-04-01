export type Site = 'Marcory' | 'Bingerville';

export interface MenuItem {
  id: string;
  location: string;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  createdAt?: string;
  // Fallback fields for compatibility
  site_id?: string;
  image_url?: string;
  is_available?: boolean;
  disponible?: boolean;
}

export interface Order {
  id: string;
  location: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_price: number;
  status: 'received' | 'preparing' | 'ready' | 'completed';
  pickup_date: string;
  pickup_time: string;
  notes?: string;
  items: any;
  created_at?: string;
  site_id?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  price_at_time: number;
  menu_item?: MenuItem;
}

export interface Reservation {
  id: string;
  location: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  reservation_date: string;
  reservation_time: string;
  guests: number;
  zone: 'Terrasse' | 'Salle Climatisée';
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at?: string;
  site_id?: string;
}

export interface News {
  id: string;
  location: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  created_at?: string;
  site_id?: string;
  image_url?: string;
}
