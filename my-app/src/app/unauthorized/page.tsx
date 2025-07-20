
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-4xl font-bold text-destructive mb-2">Access Denied</h1>
      <p className="text-muted-foreground mb-6">You do not have permission to view this page.</p>
      <Button asChild>
        <Link href="/pos">Go to Dashboard</Link>
      </Button>
    </div>
  );
}
