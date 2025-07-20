"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Minus, Trash2, CreditCard, Landmark, CircleDollarSign, X, Package, Utensils, Car, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { menuItems as allMenuItems } from "@/lib/mock-data";
import type { MenuItem, OrderItem, OrderType } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const categories = ["All", "Appetizers", "Main Courses", "Desserts", "Beverages"];
const TAX_RATE = 0.08;

export default function POSClient() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [tableNumber, setTableNumber] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [orderType, setOrderType] = useState<OrderType>('Dine-in');
  const [tokenNumber, setTokenNumber] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (orderType === 'Takeaway' && orderItems.length > 0 && tokenNumber === null) {
      setTokenNumber(Math.floor(100 + Math.random() * 900));
    } else if (orderType !== 'Takeaway') {
      setTokenNumber(null);
    }
  }, [orderType, orderItems.length]);

  const handleOrderTypeChange = (value: OrderType) => {
    if (value) {
      setOrderType(value);
      setTableNumber("");
      if (value !== 'Takeaway') {
        setTokenNumber(null);
      }
    }
  };

  const addToOrder = (item: MenuItem) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((oi) => oi.menuItemId === item.id);
      if (existingItem) {
        return prevItems.map((oi) =>
          oi.menuItemId === item.id ? { ...oi, quantity: oi.quantity + 1 } : oi
        );
      }
      return [...prevItems, { menuItemId: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromOrder(itemId);
      return;
    }
    setOrderItems((prevItems) =>
      prevItems.map((oi) =>
        oi.menuItemId === itemId ? { ...oi, quantity: newQuantity } : oi
      )
    );
  };

  const removeFromOrder = (itemId: string) => {
    setOrderItems((prevItems) => prevItems.filter((oi) => oi.menuItemId !== itemId));
  };
  
  const clearOrder = () => {
    setOrderItems([]);
    setTableNumber("");
    setTokenNumber(null);
  }

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const filteredMenuItems = activeCategory === "All"
    ? allMenuItems
    : allMenuItems.filter(item => item.category === activeCategory);

  const handlePayment = (method: string) => {
    if (orderItems.length === 0) {
      toast({
        title: "Empty Order",
        description: "Please add items to the order before processing payment.",
        variant: "destructive",
      });
      return;
    }
    if (orderType === 'Dine-in' && !tableNumber) {
        toast({
            title: "No Table Number",
            description: "Please enter a table number for Dine-in orders.",
            variant: "destructive",
        });
        return;
    }
    
    let paymentMessage = `Order of $${total.toFixed(2)} paid with ${method}.`;
    if(orderType === 'Dine-in') paymentMessage = `Table ${tableNumber}'s bill of $${total.toFixed(2)} paid with ${method}.`
    if(orderType === 'Takeaway') paymentMessage = `Takeaway Token ${tokenNumber}'s bill of $${total.toFixed(2)} paid with ${method}.`
    
    toast({
      title: "Payment Processed",
      description: paymentMessage,
    });
    clearOrder();
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh)] p-4 md:p-6 lg:p-8">
      <div className="lg:col-span-2 h-full flex flex-col">
        <Card className="flex-shrink-0">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Menu</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                {categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>
        <ScrollArea className="flex-grow mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-1">
            {filteredMenuItems.map((item) => (
              <Card key={item.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer" onClick={() => addToOrder(item)}>
                 <div className="relative w-full h-32">
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        objectFit="cover"
                        data-ai-hint={item['data-ai-hint']}
                    />
                 </div>
                 <CardHeader className="p-4 flex-grow">
                    <CardTitle className="text-base font-bold">{item.name}</CardTitle>
                 </CardHeader>
                 <CardFooter className="p-4 flex justify-between items-center">
                    <p className="font-semibold text-lg text-primary">${item.price.toFixed(2)}</p>
                    <Button size="sm">Add</Button>
                 </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="h-full flex flex-col">
        <Card className="flex-grow flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Current Order</CardTitle>
            <ToggleGroup type="single" value={orderType} onValueChange={handleOrderTypeChange} className="grid grid-cols-4 gap-1 mt-4">
                <ToggleGroupItem value="Dine-in" aria-label="Dine-in" className="flex-col h-auto p-2">
                    <Utensils className="h-5 w-5 mb-1" />
                    <span className="text-xs">Dine-in</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="Takeaway" aria-label="Takeaway" className="flex-col h-auto p-2">
                    <Package className="h-5 w-5 mb-1" />
                    <span className="text-xs">Takeaway</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="Parcel" aria-label="Parcel" className="flex-col h-auto p-2">
                    <Package className="h-5 w-5 mb-1" />
                    <span className="text-xs">Parcel</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="Delivery" aria-label="Delivery" className="flex-col h-auto p-2">
                    <Car className="h-5 w-5 mb-1" />
                    <span className="text-xs">Delivery</span>
                </ToggleGroupItem>
            </ToggleGroup>
            {orderType === 'Dine-in' && (
                <Input 
                    placeholder="Table Number" 
                    value={tableNumber} 
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="mt-2"
                />
            )}
            {orderType === 'Takeaway' && tokenNumber && (
              <Alert className="mt-2">
                <Info className="h-4 w-4" />
                <AlertTitle>Token Number</AlertTitle>
                <AlertDescription className="font-bold text-lg">{tokenNumber}</AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <ScrollArea className="flex-grow">
            <CardContent className="px-6 py-0">
              {orderItems.length === 0 ? (
                <p className="text-muted-foreground text-center py-10">No items in order.</p>
              ) : (
                <ul className="divide-y">
                  {orderItems.map((item) => (
                    <li key={item.menuItemId} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeFromOrder(item.menuItemId)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </ScrollArea>
          {orderItems.length > 0 && (
            <CardFooter className="flex-col items-stretch p-4 mt-auto border-t">
              <div className="space-y-2 mb-4 text-lg">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span><span>${tax.toFixed(2)}</span></div>
                <Separator />
                <div className="flex justify-between font-bold text-xl text-primary"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
              <Button size="lg" className="w-full font-bold text-lg" onClick={() => handlePayment('Card')}>
                Generate Bill & Pay
              </Button>
               <div className="grid grid-cols-3 gap-2 mt-2">
                    <Button variant="outline" onClick={() => handlePayment('Cash')}><CircleDollarSign className="mr-2 h-4 w-4" /> Cash</Button>
                    <Button variant="outline" onClick={() => handlePayment('Card')}><CreditCard className="mr-2 h-4 w-4" /> Card</Button>
                    <Button variant="outline" onClick={() => handlePayment('UPI')}><Landmark className="mr-2 h-4 w-4" /> UPI</Button>
               </div>
               <Button variant="destructive" className="w-full mt-2" onClick={clearOrder}><X className="mr-2 h-4 w-4"/>Clear Order</Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
