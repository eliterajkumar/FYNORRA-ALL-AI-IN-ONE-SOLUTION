
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const staffShifts = [
  { id: '1', name: 'John Doe', role: 'Cashier', shift: 'Morning' },
  { id: '2', name: 'Jane Smith', role: 'Chef', shift: 'Evening' },
  { id: '3', name: 'Peter Jones', role: 'Staff', shift: 'Morning' },
  { id: '4', name: 'Mary Johnson', role: 'Staff', shift: 'Night' },
  { id: '5', name: 'Chris Lee', role: 'Chef', shift: 'Unassigned' },
];

export default function StaffShiftsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-headline text-4xl">Staff Shift Overview</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Monitor and assign staff shifts for the day.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Shift Assignments</CardTitle>
            <CardDescription>Assign shifts to your staff members.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Shift</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {staffShifts.map((staff) => (
                        <TableRow key={staff.id}>
                            <TableCell className="font-medium">{staff.name}</TableCell>
                            <TableCell><Badge variant="secondary">{staff.role}</Badge></TableCell>
                            <TableCell className="text-right w-[180px]">
                                <Select defaultValue={staff.shift}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Assign shift" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Morning">Morning (9 AM - 5 PM)</SelectItem>
                                    <SelectItem value="Evening">Evening (5 PM - 1 AM)</SelectItem>
                                    <SelectItem value="Night">Night (1 AM - 9 AM)</SelectItem>
                                    <SelectItem value="Unassigned">Unassigned</SelectItem>
                                  </SelectContent>
                                </Select>
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
