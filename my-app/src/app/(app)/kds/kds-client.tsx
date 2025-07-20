"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { orders as initialOrders } from "@/lib/mock-data";
import type { Order } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from 'date-fns';

const getStatusClasses = (status: Order['status']) => {
    switch (status) {
        case 'New': return 'bg-secondary text-secondary-foreground border-secondary-foreground/20';
        case 'Preparing': return 'bg-accent text-accent-foreground border-accent-foreground/20';
        case 'Ready': return 'bg-primary text-primary-foreground border-primary-foreground/20';
        case 'Completed': return 'bg-muted text-muted-foreground border-muted-foreground/20';
        case 'Cancelled': return 'bg-destructive text-destructive-foreground border-destructive-foreground/20';
        default: return 'bg-muted text-muted-foreground border-muted-foreground/20';
    }
}

export default function KDSClient() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [time, setTime] = useState(Date.now());


  useEffect(() => {
    const ordersInterval = setInterval(() => {
        setOrders(currentOrders => [...currentOrders].sort(() => Math.random() - 0.5));
    }, 10000);
    const timerInterval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
        clearInterval(ordersInterval);
        clearInterval(timerInterval);
    };
  }, []);

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(currentOrders => 
      currentOrders.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const activeOrders = orders.filter(o => o.status === 'New' || o.status === 'Preparing' || o.status === 'Ready');

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col p-4 md:p-6 lg:p-8">
        <h1 className="font-headline text-4xl mb-6">Kitchen Display System</h1>
        <ScrollArea className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {activeOrders.map(order => (
                <Card key={order.id} className="flex flex-col shadow-lg">
                <CardHeader className="flex flex-row items-start justify-between p-4 bg-card-foreground/5">
                    <div>
                        <CardTitle className="text-xl">Table {order.tableNumber}</CardTitle>
                        <p className="text-xs text-muted-foreground">{formatDistanceToNow(order.createdAt)} ago</p>
                    </div>
                    <Badge variant="outline" className={`font-semibold ${getStatusClasses(order.status)}`}>{order.status}</Badge>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                    <ul className="space-y-2">
                    {order.items.map(item => (
                        <li key={item.menuItemId} className="flex justify-between items-center py-1">
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-muted-foreground">x{item.quantity}</span>
                        </li>
                    ))}
                    </ul>
                </CardContent>
                <CardFooter className="p-4 border-t">
                    <div className="grid grid-cols-2 gap-2 w-full">
                        {order.status === 'New' && <Button className="w-full col-span-full" onClick={() => updateOrderStatus(order.id, 'Preparing')}>Start Cooking</Button>}
                        {order.status === 'Preparing' && <Button className="w-full col-span-full" onClick={() => updateOrderStatus(order.id, 'Ready')}>Mark as Ready</Button>}
                        {order.status === 'Ready' && <Button className="w-full col-span-full" onClick={() => updateOrderStatus(order.id, 'Completed')}>Serve</Button>}
                        {(order.status === 'New' || order.status === 'Preparing') &&
                            <Button variant="destructive" className="w-full col-span-full" onClick={() => updateOrderStatus(order.id, 'Cancelled')}>Cancel Order</Button>
                        }
                    </div>
                </CardFooter>
                </Card>
            ))}
            {activeOrders.length === 0 && (
                <div className="col-span-full text-center py-20">
                    <p className="text-2xl text-muted-foreground">No active orders.</p>
                </div>
            )}
            </div>
        </ScrollArea>
    </div>
  );
}
