import { ProductTable } from "@/components/products/ProductTable";
import { AddProductForm } from "@/components/products/AddProductForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { products } from "@/lib/data";
import { PlusCircle } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Products</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new product to your inventory.
              </DialogDescription>
            </DialogHeader>
            <AddProductForm />
          </DialogContent>
        </Dialog>
      </div>
      <ProductTable data={products} />
    </div>
  );
}
