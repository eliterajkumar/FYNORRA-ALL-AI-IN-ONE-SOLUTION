"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const staffList = [
  { id: '1', name: 'John Doe'},
  { id: '2', name: 'Jane Smith'},
  { id: '3', name: 'Peter Jones'},
  { id: '4', name: 'Mary Johnson'},
];

const payrollData = [
  { month: 'June 2024', gross: '₹25,000', deductions: '₹2,000', net: '₹23,000', status: 'Paid' },
  { month: 'May 2024', gross: '₹25,000', deductions: '₹2,000', net: '₹23,000', status: 'Paid' },
  { month: 'April 2024', gross: '₹24,500', deductions: '₹1,800', net: '₹22,700', status: 'Paid' },
  { month: 'March 2024', gross: '₹25,000', deductions: '₹2,000', net: '₹23,000', status: 'Paid' },
];

export default function PayslipsPage() {
    const { toast } = useToast();

    const handleDownload = () => {
        toast({
            title: "Download Started",
            description: "Your payslip download will begin shortly."
        })
    }
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-headline text-4xl">Payslips</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Generate and view payslips for your staff.
        </p>
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
        <Button>Generate Payslip</Button>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Payslip History for [Selected Staff]</CardTitle>
            <CardDescription>Here is a record of past salary payments.</CardDescription>
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
                                <Button variant="outline" size="sm" onClick={handleDownload}>
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
