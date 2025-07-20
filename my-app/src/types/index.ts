export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: 'Appetizers' | 'Main Courses' | 'Desserts' | 'Beverages';
  image: string;
  description: string;
  'data-ai-hint'?: string;
};

export type OrderItem = {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
};

export type OrderType = 'Dine-in' | 'Takeaway' | 'Parcel' | 'Delivery';

export type Order = {
  id: string;
  items: OrderItem[];
  tableNumber: string;
  status: 'New' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';
  createdAt: Date;
  subtotal: number;
  tax: number;
  total: number;
  customerName?: string;
  orderType: OrderType;
  tokenNumber?: number;
};

export type TableStatus = 'Vacant' | 'Occupied' | 'Reserved';

export type RestaurantTable = {
    id: string;
    name: string;
    capacity: number;
    status: TableStatus;
    shape: 'square' | 'rectangle' | 'circle';
    position: { x: number; y: number };
    size: { width: number, height: number };
};
