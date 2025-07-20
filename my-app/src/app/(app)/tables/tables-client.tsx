"use client";

import { useState } from "react";
import { tables as initialTables } from "@/lib/mock-data";
import type { RestaurantTable, TableStatus } from "@/types";
import { cn } from "@/lib/utils";
import { Users, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const statusConfig = {
    Vacant: {
        color: "border-green-500 bg-green-500/10 hover:bg-green-500/20",
        icon: CheckCircle,
        text: "text-green-600",
    },
    Occupied: {
        color: "border-red-500 bg-red-500/10 hover:bg-red-500/20",
        icon: Users,
        text: "text-red-600",
    },
    Reserved: {
        color: "border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20",
        icon: Clock,
        text: "text-yellow-600",
    },
};

const TableComponent = ({ table }: { table: RestaurantTable }) => {
    const config = statusConfig[table.status];
    const Icon = config.icon;

    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 shadow-sm",
                config.color,
                table.shape === 'circle' ? 'rounded-full' : 'rounded-lg',
            )}
            style={{ 
                position: 'absolute',
                left: `${table.position.x}px`, 
                top: `${table.position.y}px`,
                width: `${table.size.width}px`,
                height: `${table.size.height}px`,
            }}
        >
            <div className="text-center">
                <p className={cn("font-bold text-2xl", config.text)}>{table.name}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                    <Users className={cn("h-4 w-4", config.text)} />
                    <span className={cn("text-sm", config.text)}>{table.capacity}</span>
                </div>
            </div>
            <Badge variant="outline" className={cn("absolute -top-3 px-2 py-0.5 border text-xs", config.color, config.text)}>
                {table.status}
            </Badge>
        </div>
    );
};

export default function TableLayoutClient() {
    const [tables, setTables] = useState<RestaurantTable[]>(initialTables);

    return (
        <div className="p-4 md:p-6 lg:p-8 h-full">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="font-headline text-4xl">Table Layout</h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Visual overview of your restaurant's floor plan and table status.
                    </p>
                </div>
                 <div className="flex space-x-4">
                    {Object.entries(statusConfig).map(([status, { color, text }]) => (
                        <div key={status} className="flex items-center gap-2">
                            <div className={cn("w-4 h-4 rounded-full border", color.split(' ')[0])} />
                            <span className={cn("text-sm font-medium", text.split('-')[0] + '-' + text.split('-')[1])}>{status}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative w-full h-[calc(100vh-12rem)] bg-card rounded-lg border shadow-inner overflow-auto">
                {tables.map(table => (
                    <TableComponent key={table.id} table={table} />
                ))}
            </div>
        </div>
    );
}
