
export type User = {
    username: string;
    role: 'Cashier' | 'Chef' | 'HR' | 'Manager' | 'Staff';
};

export const users: (User & {password: string})[] = [
  { username: 'cashier1', password: '1234', role: 'Cashier' as const },
  { username: 'chef1', password: '1234', role: 'Chef' as const },
  { username: 'hr1', password: '1234', role: 'HR' as const },
  { username: 'manager1', password: '1234', role: 'Manager' as const },
  { username: 'staff1', password: '1234', role: 'Staff' as const },
];
