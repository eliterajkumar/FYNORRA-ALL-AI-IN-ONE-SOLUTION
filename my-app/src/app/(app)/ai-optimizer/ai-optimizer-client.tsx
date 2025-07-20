"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AIMenuOptimizationOutput, optimizeMenuLayout } from "@/ai/flows/ai-menu-optimization";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  salesData: z.string().min(10, { message: "Please provide more detailed sales data." }),
  customerPreferences: z.string().min(10, { message: "Please provide more detailed customer preferences." }),
  currentMenuLayout: z.string().min(10, { message: "Please describe the current menu layout in more detail." }),
});

export default function AIOptimizerClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIMenuOptimizationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salesData: "Top sellers: Spaghetti Carbonara, Margherita Pizza. Low sellers: Grilled Salmon. Peak hours: 7-9 PM.",
      customerPreferences: "Popular add-ons: extra cheese on pizza. Many requests for gluten-free options. Families prefer sharing platters.",
      currentMenuLayout: "Two-column layout. Appetizers and Main Courses on the left, Desserts and Beverages on the right. No images.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await optimizeMenuLayout(values);
      setResult(output);
      toast({ title: "Optimization Complete!", description: "AI suggestions have been generated." });
    } catch (error) {
      console.error("AI Optimization Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="text-center mb-8">
            <h1 className="font-headline text-4xl">AI-Powered Menu Optimizer</h1>
            <p className="text-muted-foreground mt-2 text-lg">
                Leverage AI to analyze your data and receive actionable insights to boost your sales.
            </p>
        </div>
      
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle>Provide Your Restaurant's Data</CardTitle>
          <CardDescription>
            Enter your current sales data, customer preferences, and menu layout to get started. The more detail, the better the suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="salesData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sales Data</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Top sellers, low sellers, peak hours..." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Preferences</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Popular add-ons, dietary requests, common pairings..." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentMenuLayout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Menu Layout</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Two-column, categories, item placement..." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Optimize My Menu
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary"/>
            <p className="mt-2 text-muted-foreground">AI is thinking...</p>
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-in fade-in-50">
          <h2 className="font-headline text-3xl text-center">Optimization Results</h2>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Suggested Menu Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap leading-relaxed">{result.suggestedMenuLayout}</p>
            </CardContent>
          </Card>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                <CardTitle>Trending Items to Highlight</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="whitespace-pre-wrap leading-relaxed">{result.trendingItems}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>Expected Impact</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="whitespace-pre-wrap leading-relaxed">{result.expectedImpact}</p>
                </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Customer Preference Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap leading-relaxed">{result.customerPreferenceInsights}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
