"use client";

import { useState } from "react";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { invoices } from "@/lib/data";
import type { Invoice } from "@/lib/data";
import { PlusCircle, Sparkles, Loader2 } from "lucide-react";
import { generateBillingSummary } from "@/ai/flows/billingSummaryFlow";

export default function InvoicesPage() {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await generateBillingSummary({ invoices });
      setSummary(result.summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummary("Failed to generate billing summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold font-headline">Invoices</h1>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={handleGenerateSummary} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate Billing Summary
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Invoice
          </Button>
        </div>
      </div>

      {isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Generating Summary...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </CardContent>
        </Card>
      )}

      {summary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="text-primary" />
              AI Billing Summary
            </CardTitle>
            <CardDescription>
              Here is the AI-generated summary of your current invoices.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
              {summary}
            </div>
          </CardContent>
        </Card>
      )}

      <InvoiceTable data={invoices} />
    </div>
  );
}
