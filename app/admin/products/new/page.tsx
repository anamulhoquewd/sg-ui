"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Upload, X, ArrowLeft, Save, CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import { handleAxiosError } from "@/utils/error";
import api from "@/axios/interceptor";

// Sample categories data
const dameCategories = [
  { _id: "6836aa9148cc37b282d69ac2", name: "Mangoes" },
  { _id: "683b512551d36051b14f1f49", name: "Pomegranate" },
  { _id: "683b513d51d36051b14f1f4c", name: "Pineapple" },
];

interface ProductDiscunt {
  discountType: "percentage" | "flat";
  discountValue: number;
  discountExp: Date;
}

interface ProductUnit {
  unitType: "kg" | "piece";
  price: number;
  originalPrice?: number;
  costPerItem: number;
  stockQuantity: number;
  averageWeightPerFruit?: string;
}

export interface ProductDocument extends Document {
  slug: string;
  name: string;
  title: string;
  origin?: string;
  shortDescription?: string;
  longDescription?: string;
  season?: string;
  media: { alt: string; url: string }[];
  status: "inStock" | "lowStock" | "outOfStock";
  visibility: boolean;
  isPopular: boolean;
  lowStockThreshold: number;
  unit: ProductUnit;
  discount?: ProductDiscunt;
  category: string;
}

// Form schema
const productFormSchema = z.object({
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only (no spaces or special characters)."
    ),
  name: z
    .string()
    .min(5, { message: "Product name must be at least 5 characters." }),
  title: z
    .string()
    .min(10, { message: "Product title must be at least 10 characters." })
    .optional(),
  shortDescription: z
    .string()
    .min(20, { message: "Short description must be at least 20 characters." })
    .optional(),
  longDescription: z
    .string()
    .min(50, { message: "Long description must be at least 50 characters." })
    .optional(),
  origin: z.string().optional(),

  category: z
    .string()
    .length(24, { message: "Invalid category ID" })
    .regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid ObjectId format" }),
  status: z.enum(["inStock", "lowStock", "outOfStock"]),
  isPopular: z.boolean().default(false),
  visibility: z.boolean().default(true),
  season: z.string().optional(),

  unit: z.object({
    unitType: z.enum(["kg", "piece"]),
    averageWeightPerFruit: z.string(),
    originalPrice: z.coerce
      .number()
      .positive({ message: "Original Price must be a positive number." }),
    costPerItem: z.coerce
      .number()
      .nonnegative({ message: "Cost must be a non-negative number." })
      .optional(),
    stockQuantity: z.coerce.number().nonnegative({
      message: "Stock quantity must be a non-negative number.",
    }),
  }),

  lowStockThreshold: z.coerce.number().nonnegative(),
  averageWeightPerFruit: z.string().optional(),

  discount: z
    .object({
      discountType: z.enum(["flat", "percentage"]).optional(),
      discountValue: z.coerce.number().optional(),
      discountExp: z.coerce.date().optional(), // be sure it's passed as Date or a parsable string
    })
    .optional(),
});

export default function NewProductPage() {
  const [images, setImages] = useState<{ url: string; file?: File }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Categories
  const [categories, setCategories] = useState(dameCategories);

  useEffect(() => {
    // Fetch categories
    const getCategorires = async () => {
      try {
        const response = await api.get("/categories", {
          params: { limit: 1000 },
        });

        if (!response.data.success) {
          throw new Error(
            response.data.error.message || "Something with wrong!"
          );
        }

        setCategories(response.data.data);
      } catch (error) {
        handleAxiosError(error);
      }
    };

    getCategorires();
  }, []);

  // Initialize form with default values
  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      slug: "",
      name: "",
      category: "",
      isPopular: false,
      visibility: true,
      lowStockThreshold: 20,
      status: "inStock",
      unit: {
        originalPrice: 0,
        costPerItem: 0,
        stockQuantity: 0,
        averageWeightPerFruit: "",
      },
      discount: {
        discountType: undefined,
        discountValue: 0,
        discountExp: undefined,
      },
    },
  });

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Form submission
  const onSubmit = async (data: z.infer<typeof productFormSchema>) => {
    setIsSubmitting(true);

    console.log("Data: ", data);
    try {
      const formData = new FormData();

      // Append images
      images.forEach((image) => {
        if (image.file) {
          formData.append("media", image.file);
        }
      });

      const response = await axios.post(
        "http://localhost:3000/api/v1/products/register",
        { ...data }
      );

      if (!response.data.success) {
        throw new Error(
          response.data?.error?.message || "Something with wrong"
        );
      }

      // Submit
      const mediaResponse = await axios.post(
        `http://localhost:3000/api/v1/products/media?slug=${data.slug}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await api.patch(`/products/${response.data.data._id}/media`, data);

      toast(response.data?.message || "Product has been created.");
      toast(mediaResponse.data?.message || "Files has been uploaded in S3.");

      form.reset();

      // router.push("/admin/products");
    } catch (error: any) {
      console.error("Error creating product: ", error);

      toast(
        error.response.data?.error?.message || error.response.data?.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
          <p className="text-muted-foreground">
            Create a new product for your store.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Link>
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 cursor-pointer"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Main product information */}
            <div className="md:col-span-2 space-y-6">
              {/* Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Enter the basic details about your product.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 items-start justify-stretch">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex-1/2">
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter product name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem className="flex-1/2">
                          <FormLabel>Product Slug (Uniqe)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter product slug"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>{" "}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="flex-1/2">
                        <FormLabel>Product Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter product short description"
                            className="min-h-16"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="longDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Long Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter product long description"
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              {/* Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                  <CardDescription>
                    Upload product images. You can upload multiple images.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-md overflow-hidden border"
                      >
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove image</span>
                        </Button>
                      </div>
                    ))}
                    <div className="aspect-square rounded-md border border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                      <Label
                        htmlFor="image-upload"
                        className="cursor-pointer w-full h-full flex flex-col items-center justify-center"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">
                          Upload Image
                        </span>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Units */}
              <Card>
                <CardHeader>
                  <CardTitle>Units</CardTitle>
                  <CardDescription>
                    Set the units information for your product.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <FormField
                      control={form.control}
                      name="unit.originalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Original Price</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="unit.costPerItem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cost Per Item</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="unit.stockQuantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="unit.unitType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={"kg"}>KG</SelectItem>
                              <SelectItem value={"piece"}>Piece</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="season"
                      render={({ field }) => (
                        <FormItem className="flex-1/2">
                          <FormLabel>Product Season</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter product season time"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="averageWeightPerFruit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Average Weight Per Fruit</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter product average weight per fruit"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              {/* Discount */}
              <Card>
                <CardHeader>
                  <CardTitle>Discount</CardTitle>
                  <CardDescription>Manage discoutns.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 itesm-start">
                    <FormField
                      control={form.control}
                      name="discount.discountType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount Type</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value as string}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value={"percentage"}>
                                  Percentage
                                </SelectItem>
                                <SelectItem value={"flat"}>Flat</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discount.discountValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount Value</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="1"
                              placeholder="Enter discount value"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discount.discountExp"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Discount Exp</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Visibility</FormLabel>
                          <FormDescription>
                            Make this product visible on your store
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="isPopular"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Popular Product</FormLabel>
                          <FormDescription>
                            Mark as a popular product
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
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
                              <SelectValue placeholder="Select a unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={"inStock"}>In stock</SelectItem>
                            <SelectItem value={"lowStock"}>
                              Low stock
                            </SelectItem>
                            <SelectItem value={"outOfStock"}>
                              Out of stock
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Organization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category._id}
                                value={category._id}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="origin"
                    render={({ field }) => (
                      <FormItem className="flex-1/2">
                        <FormLabel>Product Origin</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter product origin"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="lowStockThreshold"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <FormControl>
                          <div className="space-y-4 py-4 w-full">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label htmlFor="threshold">
                                  Low Stock Threshold
                                </Label>
                                <span className="text-sm">
                                  {field.value} units
                                </span>
                              </div>
                              <Slider
                                id="threshold"
                                min={0}
                                max={100}
                                step={1}
                                value={[field.value]}
                                onValueChange={(value) =>
                                  field.onChange(value[0])
                                }
                                className="cursor-pointer"
                              />
                              <p className="text-xs text-muted-foreground">
                                You will be alerted when stock falls below this
                                threshold.
                              </p>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
