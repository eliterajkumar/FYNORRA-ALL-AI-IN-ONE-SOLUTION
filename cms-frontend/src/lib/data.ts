export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  address: string;
  status: "Active" | "Inactive";
};

export const clients: Client[] = [
  {
    id: "CLI001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    companyName: "Doe Enterprises",
    address: "123 Main St, Anytown, USA",
    status: "Active",
  },
  {
    id: "CLI002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "234-567-8901",
    companyName: "Smith & Co.",
    address: "456 Oak Ave, Anytown, USA",
    status: "Active",
  },
  {
    id: "CLI003",
    name: "Sam Wilson",
    email: "sam.wilson@example.com",
    phone: "345-678-9012",
    companyName: "Wilson Corp",
    address: "789 Pine Ln, Anytown, USA",
    status: "Inactive",
  },
  {
    id: "CLI004",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    phone: "456-789-0123",
    companyName: "Johnson Goods",
    address: "101 Maple Dr, Anytown, USA",
    status: "Active",
  },
  {
    id: "CLI005",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    phone: "567-890-1234",
    companyName: "Brown Industries",
    address: "212 Birch Rd, Anytown, USA",
    status: "Active",
  },
    {
    id: "CLI006",
    name: "Charlie Davis",
    email: "charlie.d@example.com",
    phone: "678-901-2345",
    companyName: "Davis Solutions",
    address: "333 Cedar Ct, Anytown, USA",
    status: "Inactive",
  },
  {
    id: "CLI007",
    name: "Diana Miller",
    email: "diana.m@example.com",
    phone: "789-012-3456",
    companyName: "Miller Group",
    address: "444 Elm St, Anytown, USA",
    status: "Active",
  },
  {
    id: "CLI008",
    name: "Ethan Garcia",
    email: "ethan.g@example.com",
    phone: "890-123-4567",
    companyName: "Garcia Ltd.",
    address: "555 Spruce Ave, Anytown, USA",
    status: "Active",
  },
  {
    id: "CLI009",
    name: "Fiona Martinez",
    email: "fiona.m@example.com",
    phone: "901-234-5678",
    companyName: "Martinez & Sons",
    address: "666 Willow Way, Anytown, USA",
    status: "Inactive",
  },
  {
    id: "CLI010",
    name: "George Rodriguez",
    email: "george.r@example.com",
    phone: "012-345-6789",
    companyName: "Rodriguez Corp",
    address: "777 Aspen Blvd, Anytown, USA",
    status: "Active",
  },
];

export type Account = {
    id: string;
    customerName: string;
    date: string;
    amount: number;
    paymentMethod: "Credit Card" | "Bank Transfer" | "UPI";
    status: "Paid" | "Pending" | "Overdue";
  };
  
  export const accounts: Account[] = [
    { id: "ACC001", customerName: "Doe Enterprises", date: "2024-07-15", amount: 50000, paymentMethod: "Credit Card", status: "Paid" },
    { id: "ACC002", customerName: "Smith & Co.", date: "2024-07-14", amount: 75000, paymentMethod: "Bank Transfer", status: "Paid" },
    { id: "ACC003", customerName: "Wilson Corp", date: "2024-07-13", amount: 22000, paymentMethod: "UPI", status: "Pending" },
    { id: "ACC004", customerName: "Johnson Goods", date: "2024-07-12", amount: 15000, paymentMethod: "Credit Card", status: "Overdue" },
    { id: "ACC005", customerName: "Brown Industries", date: "2024-07-11", amount: 98000, paymentMethod: "Bank Transfer", status: "Paid" },
    { id: "ACC006", customerName: "Davis Solutions", date: "2024-07-10", amount: 32000, paymentMethod: "UPI", status: "Paid" },
    { id: "ACC007", customerName: "Miller Group", date: "2024-07-09", amount: 45000, paymentMethod: "Credit Card", status: "Pending" },
    { id: "ACC008", customerName: "Garcia Ltd.", date: "2024-07-08", amount: 67000, paymentMethod: "Bank Transfer", status: "Overdue" },
    { id: "ACC009", customerName: "Martinez & Sons", date: "2024-07-07", amount: 120000, paymentMethod: "Credit Card", status: "Paid" },
    { id: "ACC010", customerName: "Rodriguez Corp", date: "2024-07-06", amount: 5500, paymentMethod: "UPI", status: "Paid" },
  ];

  export type Invoice = {
    invoiceId: string;
    clientName: string;
    amount: number;
    dueDate: string;
    status: "Paid" | "Pending" | "Overdue";
  };

  export const invoices: Invoice[] = [
    { invoiceId: "INV001", clientName: "Doe Enterprises", amount: 50000, dueDate: "2024-08-15", status: "Pending" },
    { invoiceId: "INV002", clientName: "Smith & Co.", amount: 75000, dueDate: "2024-08-14", status: "Paid" },
    { invoiceId: "INV003", clientName: "Wilson Corp", amount: 22000, dueDate: "2024-08-13", status: "Pending" },
    { invoiceId: "INV004", clientName: "Johnson Goods", amount: 15000, dueDate: "2024-07-12", status: "Overdue" },
    { invoiceId: "INV005", clientName: "Brown Industries", amount: 98000, dueDate: "2024-08-11", status: "Paid" },
    { invoiceId: "INV006", clientName: "Davis Solutions", amount: 32000, dueDate: "2024-08-10", status: "Paid" },
    { invoiceId: "INV007", clientName: "Miller Group", amount: 45000, dueDate: "2024-08-09", status: "Pending" },
    { invoiceId: "INV008", clientName: "Garcia Ltd.", amount: 67000, dueDate: "2024-07-08", status: "Overdue" },
    { invoiceId: "INV009", clientName: "Martinez & Sons", amount: 120000, dueDate: "2024-08-07", status: "Paid" },
    { invoiceId: "INV010", clientName: "Rodriguez Corp", amount: 5500, dueDate: "2024-08-06", status: "Paid" },
  ];

  export type Product = {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    category: string;
    status: "In Stock" | "Out of Stock" | "Low Stock";
  };

  export const products: Product[] = [
    { id: "PROD001", name: "Basic Web Hosting", sku: "WEB-HOST-BASIC", price: 2500, stock: 1000, category: "Hosting", status: "In Stock" },
    { id: "PROD002", name: "Premium Web Hosting", sku: "WEB-HOST-PREM", price: 5000, stock: 50, category: "Hosting", status: "In Stock" },
    { id: "PROD003", name: "Domain Registration (.com)", sku: "DOM-COM", price: 1200, stock: 1000, category: "Domains", status: "In Stock" },
    { id: "PROD004", name: "SSL Certificate", sku: "SEC-SSL-STD", price: 3000, stock: 200, category: "Security", status: "In Stock" },
    { id: "PROD005", name: "Monthly SEO Service", sku: "SEO-MON-BASIC", price: 15000, stock: 100, category: "Marketing", status: "In Stock" },
    { id: "PROD006", name: "E-commerce Plugin", sku: "PLG-ECOMM", price: 8000, stock: 15, category: "Software", status: "Low Stock" },
    { id: "PROD007", name: "Custom Development (hourly)", sku: "DEV-HR", price: 4000, stock: 500, category: "Services", status: "In Stock" },
    { id: "PROD008", name: "Logo Design Package", sku: "DSN-LOGO", price: 20000, stock: 0, category: "Design", status: "Out of Stock" },
    { id: "PROD009", name: "Social Media Management", sku: "SMM-BASIC", price: 18000, stock: 4, category: "Marketing", status: "Low Stock" },
    { id: "PROD010", name: "Website Maintenance Plan", sku: "MAINT-WEB-STD", price: 6000, stock: 100, category: "Services", status: "In Stock" },
  ];
