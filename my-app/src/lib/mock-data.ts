import type { MenuItem, Order, RestaurantTable } from '@/types';

export const menuItems: MenuItem[] = [
  { id: '1', name: 'Bruschetta', price: 8.99, category: 'Appetizers', image: 'https://placehold.co/300x200', 'data-ai-hint': 'italian food', description: 'Grilled bread with tomatoes, garlic, basil, and olive oil.' },
  { id: '2', name: 'Caprese Salad', price: 10.50, category: 'Appetizers', image: 'https://placehold.co/300x200', 'data-ai-hint': 'caprese salad', description: 'Fresh mozzarella, tomatoes, and basil with a balsamic glaze.' },
  { id: '3', name: 'Spaghetti Carbonara', price: 15.99, category: 'Main Courses', image: 'https://placehold.co/300x200', 'data-ai-hint': 'pasta carbonara', description: 'Pasta with eggs, cheese, pancetta, and black pepper.' },
  { id: '4', name: 'Margherita Pizza', price: 14.50, category: 'Main Courses', image: 'https://placehold.co/300x200', 'data-ai-hint': 'margherita pizza', description: 'Classic pizza with tomatoes, mozzarella, and basil.' },
  { id: '5', name: 'Grilled Salmon', price: 22.00, category: 'Main Courses', image: 'https://placehold.co/300x200', 'data-ai-hint': 'grilled salmon', description: 'Salmon fillet served with asparagus and lemon.' },
  { id: '6', name: 'Chicken Parmesan', price: 18.75, category: 'Main Courses', image: 'https://placehold.co/300x200', 'data-ai-hint': 'chicken parmesan', description: 'Breaded chicken breast with marinara and mozzarella.' },
  { id: '7', name: 'Tiramisu', price: 7.50, category: 'Desserts', image: 'https://placehold.co/300x200', 'data-ai-hint': 'tiramisu dessert', description: 'Coffee-flavoured Italian dessert.' },
  { id: '8', name: 'Cheesecake', price: 8.00, category: 'Desserts', image: 'https://placehold.co/300x200', 'data-ai-hint': 'cheesecake slice', description: 'Creamy cheesecake with a graham cracker crust.' },
  { id: '9', name: 'Espresso', price: 3.00, category: 'Beverages', image: 'https://placehold.co/300x200', 'data-ai-hint': 'espresso coffee', description: 'Strong black coffee.' },
  { id: '10', name: 'Latte', price: 4.50, category: 'Beverages', image: 'https://placehold.co/300x200', 'data-ai-hint': 'latte art', description: 'Espresso with steamed milk.' },
  { id: '11', name: 'Red Wine', price: 9.00, category: 'Beverages', image: 'https://placehold.co/300x200', 'data-ai-hint': 'red wine', description: 'A glass of house red wine.' },
  { id: '12', name: 'Caesar Salad', price: 12.00, category: 'Appetizers', image: 'https://placehold.co/300x200', 'data-ai-hint': 'caesar salad', description: 'Romaine lettuce and croutons dressed with Parmesan cheese, lemon juice, olive oil, egg, Worcestershire sauce, garlic, and black pepper.' },
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    tableNumber: '5',
    status: 'New',
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    items: [
      { menuItemId: '3', name: 'Spaghetti Carbonara', quantity: 1, price: 15.99 },
      { menuItemId: '4', name: 'Margherita Pizza', quantity: 1, price: 14.50 },
      { menuItemId: '11', name: 'Red Wine', quantity: 2, price: 9.00 },
    ],
    subtotal: 48.49,
    tax: 3.88,
    total: 52.37,
    customerName: 'Alice Johnson',
    orderType: 'Dine-in'
  },
  {
    id: 'ORD-002',
    tableNumber: '12A',
    status: 'Preparing',
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
    items: [
      { menuItemId: '5', name: 'Grilled Salmon', quantity: 2, price: 22.00 },
    ],
    subtotal: 44.00,
    tax: 3.52,
    total: 47.52,
    customerName: 'Bob Williams',
    orderType: 'Dine-in'
  },
  {
    id: 'ORD-003',
    tableNumber: '3',
    status: 'Ready',
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    items: [
      { menuItemId: '7', name: 'Tiramisu', quantity: 1, price: 7.50 },
      { menuItemId: '10', name: 'Latte', quantity: 1, price: 4.50 },
    ],
    subtotal: 12.00,
    tax: 0.96,
    total: 12.96,
    orderType: 'Takeaway',
    tokenNumber: 101,
  },
];

export const tables: RestaurantTable[] = [
    { id: 'T1', name: '1', capacity: 4, status: 'Occupied', shape: 'square', position: { x: 50, y: 50 }, size: { width: 100, height: 100 } },
    { id: 'T2', name: '2', capacity: 2, status: 'Vacant', shape: 'circle', position: { x: 200, y: 80 }, size: { width: 80, height: 80 } },
    { id: 'T3', name: '3', capacity: 6, status: 'Vacant', shape: 'rectangle', position: { x: 350, y: 50 }, size: { width: 150, height: 100 } },
    { id: 'T4', name: '4', capacity: 4, status: 'Reserved', shape: 'square', position: { x: 550, y: 80 }, size: { width: 100, height: 100 } },
    { id: 'T5', name: '5', capacity: 8, status: 'Occupied', shape: 'rectangle', position: { x: 50, y: 250 }, size: { width: 200, height: 100 } },
    { id: 'T6', name: '6', capacity: 2, status: 'Vacant', shape: 'circle', position: { x: 320, y: 280 }, size: { width: 80, height: 80 } },
    { id: 'T7', name: '7', capacity: 4, status: 'Vacant', shape: 'square', position: { x: 450, y: 250 }, size: { width: 100, height: 100 } },
];
