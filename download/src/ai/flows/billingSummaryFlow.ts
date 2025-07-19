'use server';
/**
 * @fileOverview An AI flow for generating a billing summary from a list of invoices.
 *
 * - generateBillingSummary - A function that handles the billing summary generation.
 * - BillingSummaryInput - The input type for the generateBillingSummary function.
 * - BillingSummaryOutput - The return type for the generateBillingSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { Invoice } from '@/lib/data';

const BillingSummaryInputSchema = z.object({
  invoices: z.array(
    z.object({
      invoiceId: z.string(),
      clientName: z.string(),
      amount: z.number(),
      dueDate: z.string(),
      status: z.enum(['Paid', 'Pending', 'Overdue']),
    })
  ),
});
export type BillingSummaryInput = z.infer<typeof BillingSummaryInputSchema>;

const BillingSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the billing status, including overdue and upcoming payments, and a sample reminder email.'),
});
export type BillingSummaryOutput = z.infer<typeof BillingSummaryOutputSchema>;

export async function generateBillingSummary(input: BillingSummaryInput): Promise<BillingSummaryOutput> {
  return billingSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'billingSummaryPrompt',
  input: { schema: BillingSummaryInputSchema },
  output: { schema: BillingSummaryOutputSchema },
  prompt: `You are an expert billing assistant. Your task is to analyze a list of invoices and provide a clear, concise summary.

The current date is {{currentDate}}.

Please perform the following actions based on the provided invoice data:
1.  **Identify Overdue Invoices**: List all invoices with a status of "Overdue". For each, mention the client name, invoice ID, and amount.
2.  **Identify Upcoming Payments**: List all invoices with a "Pending" status that are due within the next 30 days.
3.  **Calculate Totals**: Provide the total amount for overdue invoices and the total amount for pending invoices.
4.  **Draft Reminder Email**: Write a polite, professional reminder email template for one of the overdue invoices. Use placeholders like [Client Name] and [Invoice ID].

Present the final output as a single, well-formatted text block.

Here is the invoice data:
{{#each invoices}}
- Invoice ID: {{invoiceId}}, Client: {{clientName}}, Amount: ₹{{amount}}, Due: {{dueDate}}, Status: {{status}}
{{/each}}
`,
});

const billingSummaryFlow = ai.defineFlow(
  {
    name: 'billingSummaryFlow',
    inputSchema: BillingSummaryInputSchema,
    outputSchema: BillingSummaryOutputSchema,
  },
  async (input) => {
    const currentDate = new Date().toDateString();
    
    const { output } = await prompt({
        ...input,
        currentDate,
    });
    
    return output!;
  }
);
