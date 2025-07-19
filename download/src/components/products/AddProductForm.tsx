"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { DialogFooter } from "@/components/ui/dialog"

const productSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  sku: z.string().min(2, {
    message: "SKU must be at least 2 characters.",
  }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  stock: z.coerce.number().int().min(0, { message: "Stock cannot be negative." }),
  category: z.string().min(2, { message: "Category is required." }),
  status: z.enum(["In Stock", "Out of Stock", "Low Stock"]),
})

export function AddProductForm() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      price: 0,
      stock: 0,
      category: "",
      status: "In Stock",
    },
  })

  function onSubmit(values: z.infer<typeof productSchema>) {
    console.log(values)
    toast({
      title: "Product Created",
      description: "The new product has been added successfully.",
    })
    // Here you would typically call an API to save the data
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Basic Web Hosting" className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="WEB-HOST-BASIC" className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2500" className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Stock</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="100" className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Hosting" className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Status</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="In Stock">In Stock</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        <SelectItem value="Low Stock">Low Stock</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="col-span-4 col-start-2" />
                </FormItem>
              )}
            />
        </div>
        <DialogFooter>
            <Button type="submit">Save Product</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
