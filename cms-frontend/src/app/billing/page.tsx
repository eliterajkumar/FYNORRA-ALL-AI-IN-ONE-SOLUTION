import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Standard",
        price: "₹8,250",
        features: ["5 Projects", "Up to 50 Users", "Basic Analytics", "48-hour Support"],
        cta: "Upgrade",
        current: false,
    },
    {
        name: "Pro",
        price: "₹20,625",
        features: ["Unlimited Projects", "Unlimited Users", "Advanced Analytics", "24/7 Support", "Custom Integrations"],
        cta: "Current Plan",
        current: true,
    },
    {
        name: "Enterprise",
        price: "Contact Us",
        features: ["Everything in Pro", "Dedicated Account Manager", "Custom Features", "SLA"],
        cta: "Contact Sales",
        current: false,
    }
];

const billingHistory = [
    { date: "2024-07-01", amount: "₹20,625", description: "Pro Plan - Monthly" },
    { date: "2024-06-01", amount: "₹20,625", description: "Pro Plan - Monthly" },
    { date: "2024-05-01", amount: "₹20,625", description: "Pro Plan - Monthly" },
]

export default function BillingPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Billing</h1>
                <p className="text-muted-foreground">Manage your subscription and billing details.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Subscription Plans</CardTitle>
                    <CardDescription>Choose the plan that's right for your business.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <Card key={plan.name} className={`flex flex-col ${plan.current ? 'border-primary' : ''}`}>
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription className="text-4xl font-bold font-headline">{plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span></CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center">
                                            <Check className="h-4 w-4 mr-2 text-green-500" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" disabled={plan.current}>{plan.cta}</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Visa **** 4242</p>
                                <p className="text-sm text-muted-foreground">Expires 12/2028</p>
                            </div>
                            <Button variant="outline">Update</Button>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Billing History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                           {billingHistory.map((item, index) =>(
                                <li key={index} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{item.description}</p>
                                        <p className="text-sm text-muted-foreground">{item.date}</p>
                                    </div>
                                    <p className="font-semibold">{item.amount}</p>
                                </li>
                           ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
