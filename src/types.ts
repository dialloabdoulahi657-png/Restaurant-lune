export type Site = 'Marcory' | 'Bingerville';

export interface MenuItem {
  id: string;
  site_id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
  portions?: string;
  allergens?: string[];
}

export interface MenuCategory {
  id: string;
  site_id: string;
  name: string;
  display_order: number;
}

export interface Order {
  id: string;
  site_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_price: number;
  status: 'received' | 'preparing' | 'ready' | 'completed';
  pickup_time: string;
  created_at: string;
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
  site_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  reservation_date: string;
  reservation_time: string;
  guests: number;
  zone: 'Terrasse' | 'Salle Climatisée';
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface News {
  id: string;
  site_id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}
