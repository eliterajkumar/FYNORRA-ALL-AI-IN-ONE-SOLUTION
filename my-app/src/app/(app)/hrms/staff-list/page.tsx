import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, UserPlus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const staffList = [
  { id: '1', name: 'John Doe', phone: '123-456-7890', role: 'Cashier', lastLogin: '2 hours ago', status: 'Active' },
  { id: '2', name: 'Jane Smith', phone: '234-567-8901', role: 'Chef', lastLogin: '30 mins ago', status: 'Active' },
  { id: '3', name: 'Peter Jones', phone: '345-678-9012', role: 'Staff', lastLogin: 'Yesterday', status: 'Active' },
  { id: '4', name: 'Mary Johnson', phone: '456-789-0123', role: 'Staff', lastLogin: '5 days ago', status: 'Inactive' },
];

export default function StaffListPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
            <h1 className="font-headline text-4xl">Staff List</h1>
            <p className="text-muted-foreground mt-2 text-lg">
            View and manage all employees.
            </p>
        </div>
        <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Staff
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {staffList.map((staff) => (
                        <TableRow key={staff.id}>
                            <TableCell className="font-medium">{staff.name}</TableCell>
                            <TableCell>{staff.phone}</TableCell>
                            <TableCell><Badge variant="secondary">{staff.role}</Badge></TableCell>
                            <TableCell>{staff.lastLogin}</TableCell>
                            <TableCell>
                                <Badge variant={staff.status === 'Active' ? 'default' : 'destructive'} className={staff.status === 'Active' ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'}>{staff.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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
