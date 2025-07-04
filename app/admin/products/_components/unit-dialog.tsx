"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const unitFormSchema = z.object({
  status: z.string(),
  lowStockThreshold: z.coerce
    .number()
    .int()
    .min(1, "Threshold must be at least 1"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  costPerItem: z.coerce.number().min(0, "Cost must be a positive number"),
  stockQuantity: z.coerce
    .number()
    .int()
    .min(0, "Stock quantity must be a non-negative number"),
  averageWeightPerFruit: z.string().optional(),
  unitType: z.string(),
});

type FormValues = z.infer<typeof unitFormSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: any;
  onUpdate: (data: FormValues) => void;
}

export function UnitDialog({ open, onOpenChange, product, onUpdate }: Props) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(unitFormSchema),
    defaultValues: {
      status: "",
      lowStockThreshold: 0,
      price: 0,
      costPerItem: 0,
      stockQuantity: 0,
      averageWeightPerFruit: "",
      unitType: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsPending(true);
    try {
      onUpdate(data);
    } catch (error: any) {
      console.error("Error updating unit information:", error);

      if (error.response.data.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (product) {
      form.reset({
        status: product?.status || "",
        lowStockThreshold: product?.lowStockThreshold || 0,
        price: product?.unit?.price || 0,
        costPerItem: product?.unit?.costPerItem || 0,
        stockQuantity: product?.unit?.stockQuantity || 0,
        averageWeightPerFruit: product?.unit?.averageWeightPerFruit || "",
        unitType: product?.unit?.unitType || "",
      });
    }
  }, [product]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Update Unit Information
          </DialogTitle>
          <DialogDescription>
            Update inventory, pricing, and unit information for {product?.name}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4 items-start">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="inStock">In Stock</SelectItem>
                        <SelectItem value="lowStock">Low Stock</SelectItem>
                        <SelectItem value="outOfStock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lowStockThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Low Stock Threshold</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      Alert when stock falls below this number
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="costPerItem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost Per Item</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="stockQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unitType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select unit type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="piece">Piece</SelectItem>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="averageWeightPerFruit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Weight Per Fruit</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., 60g to 80g" />
                  </FormControl>
                  <FormDescription>
                    Leave empty if not applicable
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Unit Information"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
