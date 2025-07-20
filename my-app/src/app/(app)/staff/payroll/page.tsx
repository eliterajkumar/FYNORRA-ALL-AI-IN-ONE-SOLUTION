
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const payrollData = [
  { month: 'June 2024', gross: '₹25,000', deductions: '₹2,000', net: '₹23,000', status: 'Paid' },
  { month: 'May 2024', gross: '₹25,000', deductions: '₹2,000', net: '₹23,000', status: 'Paid' },
  { month: 'April 2024', gross: '₹24,500', deductions: '₹1,800', net: '₹22,700', status: 'Paid' },
  { month: 'March 2024', gross: '₹25,000', deductions: '₹2,000', net: '₹23,000', status: 'Paid' },
];

export default function StaffPayrollPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-headline text-4xl">Payroll Information</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          View and download your monthly payslips.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Payslip History</CardTitle>
            <CardDescription>Here is a record of your past salary payments.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Gross Salary</TableHead>
                        <TableHead>Deductions</TableHead>
                        <TableHead>Net Salary</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {payrollData.map((payroll) => (
                        <TableRow key={payroll.month}>
                            <TableCell className="font-medium">{payroll.month}</TableCell>
                            <TableCell>{payroll.gross}</TableCell>
                            <TableCell className="text-destructive">{payroll.deductions}</TableCell>
                            <TableCell className="font-bold text-primary">{payroll.net}</TableCell>
                            <TableCell>
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{payroll.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" /> Download
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
