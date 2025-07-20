
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { addDays, format, isSameDay } from "date-fns";

const attendanceData = [
  { date: new Date(), status: 'Present' },
  { date: addDays(new Date(), -1), status: 'Present' },
  { date: addDays(new Date(), -2), status: 'Absent' },
  { date: addDays(new Date(), -3), status: 'Present' },
  { date: addDays(new Date(), -4), status: 'Leave' },
  { date: addDays(new Date(), -5), status: 'Present' },
  { date: addDays(new Date(), -8), status: 'Present' },
];

export default function StaffAttendancePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const presentDays = attendanceData.filter(d => d.status === 'Present').length;
  const totalWorkingDays = 22; // dummy data
  const attendancePercentage = (presentDays / totalWorkingDays) * 100;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-headline text-4xl">My Attendance</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          View your monthly attendance and stats.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card>
                <CardContent className="p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="p-0"
                    classNames={{
                        months: "p-4",
                        caption: "px-4 pt-1.5",
                        table: "w-full border-separate border-spacing-1",
                        cell: "w-full text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-12 w-12 p-0 font-normal aria-selected:opacity-100"
                    }}
                    components={{
                        DayContent: ({ date, ...props }) => {
                          const attendance = attendanceData.find(d => isSameDay(d.date, date));
                          let statusClass = "";
                          if (attendance?.status === 'Present') statusClass = "bg-green-100 text-green-800";
                          if (attendance?.status === 'Absent') statusClass = "bg-red-100 text-red-800";
                          if (attendance?.status === 'Leave') statusClass = "bg-yellow-100 text-yellow-800";
                          return (
                            <div className={`h-full w-full flex items-center justify-center rounded-md ${statusClass}`}>
                              {format(date, "d")}
                            </div>
                          );
                        }
                    }}
                    />
                </CardContent>
                 <CardFooter className="flex justify-end space-x-4 p-4 border-t">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Present</Badge>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Absent</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Leave</Badge>
                 </CardFooter>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Attendance Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Working Days</span>
                        <span className="font-bold">{totalWorkingDays}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Present Days</span>
                        <span className="font-bold text-green-600">{presentDays}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Attendance %</span>
                        <span className="font-bold">{attendancePercentage.toFixed(2)}%</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
