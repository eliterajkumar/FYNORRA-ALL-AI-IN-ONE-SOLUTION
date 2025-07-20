"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play, StopCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ClockInOutPage() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [punchedIn, setPunchedIn] = useState(false);
    const [punchInTime, setPunchInTime] = useState<Date | null>(null);
    const [shiftDuration, setShiftDuration] = useState("00:00:00");
    const { toast } = useToast();

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (punchedIn && punchInTime) {
            interval = setInterval(() => {
                const now = new Date();
                const diff = now.getTime() - punchInTime.getTime();
                const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
                const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
                const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
                setShiftDuration(`${hours}:${minutes}:${seconds}`);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [punchedIn, punchInTime]);

    const handlePunch = () => {
        if (punchedIn) {
            setPunchedIn(false);
            setPunchInTime(null);
            toast({ title: "Punched Out", description: `You have successfully punched out at ${currentTime.toLocaleTimeString()}`});
        } else {
            setPunchedIn(true);
            setPunchInTime(new Date());
            toast({ title: "Punched In", description: `You have successfully punched in at ${currentTime.toLocaleTimeString()}`});
        }
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 flex items-center justify-center" style={{height: 'calc(100vh - 8rem)'}}>
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Clock In / Clock Out</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <div className="text-6xl font-bold font-mono text-primary">
                        {currentTime.toLocaleTimeString()}
                    </div>
                    <p className="text-muted-foreground">
                        {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    {punchedIn && (
                        <div className="mt-4">
                            <p className="text-muted-foreground">Shift Duration</p>
                            <p className="text-3xl font-semibold font-mono">{shiftDuration}</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button size="lg" className="w-full" onClick={handlePunch}>
                        {punchedIn ? <StopCircle className="mr-2 h-5 w-5"/> : <Play className="mr-2 h-5 w-5"/>}
                        {punchedIn ? "Punch Out" : "Punch In"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
