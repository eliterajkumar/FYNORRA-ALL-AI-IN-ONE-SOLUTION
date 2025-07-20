"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


type LeaveRequest = {
    id: string;
    staffName: string;
    leaveType: 'Sick' | 'Casual' | 'Earned';
    fromDate: Date;
    toDate: Date;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
};

const initialLeaveRequests: LeaveRequest[] = [
    { id: '1', staffName: 'John Doe', leaveType: 'Sick', fromDate: new Date("2024-07-10"), toDate: new Date("2024-07-11"), reason: 'Fever and cold.', status: 'Pending'},
    { id: '2', staffName: 'Peter Jones', leaveType: 'Casual', fromDate: new Date("2024-07-15"), toDate: new Date("2024-07-15"), reason: 'Personal commitment.', status: 'Pending'},
    { id: '3', staffName: 'Jane Smith', leaveType: 'Earned', fromDate: new Date("2024-06-01"), toDate: new Date("2024-06-05"), reason: 'Family vacation.', status: 'Approved'},
    { id: '4', staffName: 'Mary Johnson', leaveType: 'Sick', fromDate: new Date("2024-05-20"), toDate: new Date("2024-05-20"), reason: 'Doctor appointment.', status: 'Rejected'},
];

export default function LeaveRequestsPage() {
    const [requests, setRequests] = useState(initialLeaveRequests);
    
    const getStatusBadgeVariant = (status: LeaveRequest['status']) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
        }
    }

    const handleRequestUpdate = (id: string, status: 'Approved' | 'Rejected') => {
        setRequests(requests.map(req => req.id === id ? { ...req, status } : req));
    };

    const pendingRequests = requests.filter(r => r.status === 'Pending');
    const historyRequests = requests.filter(r => r.status !== 'Pending');

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="mb-6">
                <h1 className="font-headline text-4xl">Leave Requests</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                Manage leave applications from staff.
                </p>
            </div>
            
            <Tabs defaultValue="pending">
                <TabsList>
                    <TabsTrigger value="pending">Pending Requests</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="pending">
                    <Card>
                        <CardContent className="pt-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Staff Name</TableHead>
                                        <TableHead>Leave Type</TableHead>
                                        <TableHead>From</TableHead>
                                        <TableHead>To</TableHead>
                                        <TableHead>Reason</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pendingRequests.map((req) => (
                                        <TableRow key={req.id}>
                                            <TableCell className="font-medium">{req.staffName}</TableCell>
                                            <TableCell>{req.leaveType}</TableCell>
                                            <TableCell>{format(req.fromDate, 'dd/MM/yyyy')}</TableCell>
                                            <TableCell>{format(req.toDate, 'dd/MM/yyyy')}</TableCell>
                                            <TableCell>{req.reason}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700" onClick={() => handleRequestUpdate(req.id, 'Approved')}><Check className="h-4 w-4"/></Button>
                                                <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" onClick={() => handleRequestUpdate(req.id, 'Rejected')}><X className="h-4 w-4"/></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {pendingRequests.length === 0 && <TableRow><TableCell colSpan={6} className="text-center">No pending requests.</TableCell></TableRow>}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="history">
                     <Card>
                        <CardContent className="pt-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Staff Name</TableHead>
                                        <TableHead>Leave Type</TableHead>
                                        <TableHead>From</TableHead>
                                        <TableHead>To</TableHead>
                                        <TableHead>Reason</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {historyRequests.map((req) => (
                                        <TableRow key={req.id}>
                                            <TableCell className="font-medium">{req.staffName}</TableCell>
                                            <TableCell>{req.leaveType}</TableCell>
                                            <TableCell>{format(req.fromDate, 'dd/MM/yyyy')}</TableCell>
                                            <TableCell>{format(req.toDate, 'dd/MM/yyyy')}</TableCell>
                                            <TableCell>{req.reason}</TableCell>
                                            <TableCell>
                                                <Badge className={cn("hover:bg-none", getStatusBadgeVariant(req.status))}>
                                                    {req.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
