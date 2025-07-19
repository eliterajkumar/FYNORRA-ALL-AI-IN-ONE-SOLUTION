import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/daterangepicker";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AccountTable } from "@/components/accounts/AccountTable";
import { accounts } from "@/lib/data";
import { Users, CreditCard, DollarSign, Banknote, BookUser, FileUp, ListFilter, PlusCircle } from "lucide-react";

const accountMetrics = [
    { title: "Total Account Credit", value: "₹2,865,121.06", icon: CreditCard, color: "bg-yellow-400" },
    { title: "Total Online Credit", value: "₹716,607.41", icon: DollarSign, color: "bg-orange-400" },
    { title: "Total Credit Amount", value: "₹3,581,728.47", icon: CreditCard, color: "bg-green-500" },
    { title: "Total Debit Amount", value: "₹3,677,299.24", icon: Banknote, color: "bg-red-500" },
    { title: "Ledger Amount", value: "₹892,860.69", icon: BookUser, color: "bg-gray-400" },
];

export default function AccountManagePage() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h1 className="text-3xl font-bold font-headline">Account Management</h1>
                <div className="flex gap-2 flex-wrap">
                    <Button variant="outline">
                        <ListFilter className="mr-2 h-4 w-4" />
                        Pending Approval
                    </Button>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Payment
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {accountMetrics.map((metric) => (
                    <Card key={metric.title} className="rounded-lg shadow-md">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-center mb-4">
                                <div className={`p-3 rounded-full ${metric.color} text-white`}>
                                    <metric.icon className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">{metric.title}</p>
                                <p className="text-2xl font-bold font-headline">{metric.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Customer</label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose Customer" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Customers</SelectItem>
                                <SelectItem value="john-doe">John Doe</SelectItem>
                                <SelectItem value="jane-smith">Jane Smith</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Address</label>
                        <Input placeholder="Search by address" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Payment Status</label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="overdue">Overdue</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Payment Date Range</label>
                       <DatePickerWithRange />
                    </div>
                    <div className="flex gap-2 lg:col-span-4 lg:justify-end">
                         <Button>Search</Button>
                         <Button variant="outline">
                            <FileUp className="mr-2 h-4 w-4" />
                            Export Data
                         </Button>
                    </div>
                </div>
            </Card>

            <AccountTable data={accounts} />
        </div>
    );
}
