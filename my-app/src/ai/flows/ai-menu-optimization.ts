'use server';

/**
 * @fileOverview This file implements the AI-powered menu optimization flow.
 *
 * It analyzes sales data and customer preferences to suggest optimal menu layouts.
 * The flow uses trending items and customer profiles to enhance upsell opportunities and increase average order value.
 *
 * @interface AIMenuOptimizationInput - Defines the input schema for the menu optimization flow.
 * @interface AIMenuOptimizationOutput - Defines the output schema for the menu optimization flow.
 * @function optimizeMenuLayout - The main function to trigger the menu optimization flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIMenuOptimizationInputSchema = z.object({
  salesData: z.string().describe('Sales data for the restaurant, including item sales, order times, and customer demographics.'),
  customerPreferences: z.string().describe('Data on customer preferences, such as popular items, dietary restrictions, and common order patterns.'),
  currentMenuLayout: z.string().describe('A description of the current menu layout, including categories, item placement, and design elements.'),
});

export type AIMenuOptimizationInput = z.infer<typeof AIMenuOptimizationInputSchema>;

const AIMenuOptimizationOutputSchema = z.object({
  suggestedMenuLayout: z.string().describe('Suggested menu layout with optimized item placements and category arrangements to maximize upsell opportunities.'),
  trendingItems: z.string().describe('List of trending items that should be highlighted in the menu.'),
  customerPreferenceInsights: z.string().describe('Insights into customer preferences and ordering patterns.'),
  expectedImpact: z.string().describe('Expected impact of the suggested menu layout on sales and average order value.'),
});

export type AIMenuOptimizationOutput = z.infer<typeof AIMenuOptimizationOutputSchema>;

export async function optimizeMenuLayout(input: AIMenuOptimizationInput): Promise<AIMenuOptimizationOutput> {
  return optimizeMenuLayoutFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiMenuOptimizationPrompt',
  input: {schema: AIMenuOptimizationInputSchema},
  output: {schema: AIMenuOptimizationOutputSchema},
  prompt: `You are an AI-powered menu optimization expert for restaurants. Analyze the provided sales data, customer preferences, and current menu layout to suggest an optimized menu layout that increases upsell opportunities and average order value.

Sales Data: {{{salesData}}}
Customer Preferences: {{{customerPreferences}}}
Current Menu Layout: {{{currentMenuLayout}}}

Consider the following:
- Highlight trending items based on sales data.
- Optimize item placements within categories based on customer preferences.
- Suggest category arrangements that encourage higher-value orders.
- Provide insights into customer preferences and ordering patterns.
- Estimate the expected impact of the suggested menu layout on sales and average order value.

Output a JSON object containing the suggested menu layout, trending items, customer preference insights, and expected impact.
`,
});

const optimizeMenuLayoutFlow = ai.defineFlow({
    name: 'optimizeMenuLayoutFlow',
    inputSchema: AIMenuOptimizationInputSchema,
    outputSchema: AIMenuOptimizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
