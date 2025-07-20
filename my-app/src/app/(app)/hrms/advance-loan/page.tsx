"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { HandCoins } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const staffList = [
  { id: '1', name: 'John Doe'},
  { id: '2', name: 'Jane Smith'},
  { id: '3', name: 'Peter Jones'},
  { id: '4', name: 'Mary Johnson'},
];

const advanceData = [
  { date: 'June 15, 2024', amount: '₹5,000', balance: '₹2,500' },
  { date: 'May 20, 2024', amount: '₹3,000', balance: '₹0' },
];

export default function AdvanceLoanPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
            <h1 className="font-headline text-4xl">Advance / Loan</h1>
            <p className="text-muted-foreground mt-2 text-lg">
            Track salary advances and loans for staff.
            </p>
        </div>
        <Button>
            <HandCoins className="mr-2 h-4 w-4" />
            Issue New Advance
        </Button>
      </div>

       <div className="flex items-center space-x-4 mb-6">
        <Select>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Staff Member" />
            </SelectTrigger>
            <SelectContent>
                {staffList.map(staff => (
                    <SelectItem key={staff.id} value={staff.name}>{staff.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Advance History for [Selected Staff]</CardTitle>
            <CardDescription>Record of advances given to the selected staff member.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date Issued</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Balance Left</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {advanceData.map((advance) => (
                        <TableRow key={advance.date}>
                            <TableCell className="font-medium">{advance.date}</TableCell>
                            <TableCell>{advance.amount}</TableCell>
                            <TableCell className="font-bold">{advance.balance}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
