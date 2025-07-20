
'use client';
import { useAuth } from '@/context/auth-context';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function DashboardRedirect() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      switch (user.role) {
        case 'Cashier':
          redirect('/pos');
          break;
        case 'Chef':
          redirect('/kds');
          break;
        case 'HR':
          redirect('/hrms');
          break;
        case 'Manager':
          redirect('/manager');
          break;
        case 'Staff':
          redirect('/staff/attendance');
          break;
        default:
          redirect('/login');
          break;
      }
    } else if (!loading && !user) {
        redirect('/login');
    }
  }, [user, loading]);

  return (
      <div className="flex h-screen items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
  )
}
