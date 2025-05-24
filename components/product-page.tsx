"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, Grid, List, SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Paginations, { Pagination } from "./pagination";
import { defaultPagination } from "@/utils/details";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: "mango" | "pomegranate" | "pineapple";
  inStock: boolean;
  image: string;
  slug: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Himsagar Mango",
    description:
      "বাংলাদেশের নির্দেশক বা জিআই পণ্য হিসেবে স্বীকৃতি পেয়েছে চাঁপাইনবাবগঞ্জের হিমসাগর আম। স্বাদে-গন্ধে অতুলনীয় হিমসাগর আম। চাঁপাইনবাবগঞ্জের এই আমের সুনাম রয়েছে দেশ বিদেশে। জিআই সনদ পাওয়ার পর এখন থেকে চাঁপাইনবাবগঞ্জের পণ্য হিসেবেই বাজারজাত হচ্ছে হিমসাগর আম।",
    price: 199.99,
    originalPrice: 249.99,
    category: "mango",
    inStock: true,
    image:
      "https://ghorerbazar.com/cdn/shop/files/250tk_discount.jpg?v=1747222020&width=360",
    slug: "/himsagor-mango",
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    description:
      "বাংলাদেশের নির্দেশক বা জিআই পণ্য হিসেবে স্বীকৃতি পেয়েছে চাঁপাইনবাবগঞ্জের হিমসাগর আম। স্বাদে-গন্ধে অতুলনীয় হিমসাগর আম। চাঁপাইনবাবগঞ্জের এই আমের সুনাম রয়েছে দেশ বিদেশে। জিআই সনদ পাওয়ার পর এখন থেকে চাঁপাইনবাবগঞ্জের পণ্য হিসেবেই বাজারজাত হচ্ছে হিমসাগর আম।",
    price: 29.99,
    category: "mango",
    inStock: true,
    image:
      "https://ghorerbazar.com/cdn/shop/products/WhatsApp-Image-2023-05-25-at-12.25.35.jpg?v=1707771681&width=713",
    slug: "/mango-form-chapai",
  },
  {
    id: 3,
    name: "pineapple",
    description:
      "বাংলাদেশের নির্দেশক বা জিআই পণ্য হিসেবে স্বীকৃতি পেয়েছে চাঁপাইনবাবগঞ্জের হিমসাগর আম। স্বাদে-গন্ধে অতুলনীয় হিমসাগর আম। চাঁপাইনবাবগঞ্জের এই আমের সুনাম রয়েছে দেশ বিদেশে। জিআই সনদ পাওয়ার পর এখন থেকে চাঁপাইনবাবগঞ্জের পণ্য হিসেবেই বাজারজাত হচ্ছে হিমসাগর আম।",

    price: 299.99,
    category: "pineapple",
    inStock: false,
    image:
      "https://images.unsplash.com/photo-1550828520-4cb496926fc9?q=80&w=500&auto=format&fit=crop",
    slug: "/pineapple",
  },
  {
    id: 4,
    name: "Rajshahi Mango",
    description:
      "বাংলাদেশের নির্দেশক বা জিআই পণ্য হিসেবে স্বীকৃতি পেয়েছে চাঁপাইনবাবগঞ্জের হিমসাগর আম। স্বাদে-গন্ধে অতুলনীয় হিমসাগর আম। চাঁপাইনবাবগঞ্জের এই আমের সুনাম রয়েছে দেশ বিদেশে। জিআই সনদ পাওয়ার পর এখন থেকে চাঁপাইনবাবগঞ্জের পণ্য হিসেবেই বাজারজাত হচ্ছে হিমসাগর আম।",

    price: 89.99,
    originalPrice: 119.99,
    category: "mango",
    inStock: true,
    image:
      "https://ghorerbazar.com/cdn/shop/products/WhatsApp-Image-2023-05-21-at111-13.40.44.jpg?v=1707771681&width=600",

    slug: "/mango-from-rajshahi",
  },
  {
    id: 5,
    name: "Pomegranate",
    description:
      "বাংলাদেশের নির্দেশক বা জিআই পণ্য হিসেবে স্বীকৃতি পেয়েছে চাঁপাইনবাবগঞ্জের হিমসাগর আম। স্বাদে-গন্ধে অতুলনীয় হিমসাগর আম। চাঁপাইনবাবগঞ্জের এই আমের সুনাম রয়েছে দেশ বিদেশে। জিআই সনদ পাওয়ার পর এখন থেকে চাঁপাইনবাবগঞ্জের পণ্য হিসেবেই বাজারজাত হচ্ছে হিমসাগর আম।",

    price: 39.99,
    category: "pomegranate",
    inStock: false,
    slug: "/pomegranate-form-sirajganj",
    image:
      "https://images.unsplash.com/photo-1608869857121-c0bcdf4fff2c?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Pineapple",
    description:
      "বাংলাদেশের নির্দেশক বা জিআই পণ্য হিসেবে স্বীকৃতি পেয়েছে চাঁপাইনবাবগঞ্জের হিমসাগর আম। স্বাদে-গন্ধে অতুলনীয় হিমসাগর আম। চাঁপাইনবাবগঞ্জের এই আমের সুনাম রয়েছে দেশ বিদেশে। জিআই সনদ পাওয়ার পর এখন থেকে চাঁপাইনবাবগঞ্জের পণ্য হিসেবেই বাজারজাত হচ্ছে হিমসাগর আম।",

    price: 129.99,
    category: "pineapple",
    inStock: true,
    image:
      "https://ghorerbazar.com/cdn/shop/files/250tk_discount.jpg?v=1747222020&width=360",
    slug: "/pineapple-from-sirajganj",
  },
  {
    id: 7,
    name: "Pomegranate",
    description:
      "বাংলাদেশের নির্দেশক বা জিআই পণ্য হিসেবে স্বীকৃতি পেয়েছে চাঁপাইনবাবগঞ্জের হিমসাগর আম। স্বাদে-গন্ধে অতুলনীয় হিমসাগর আম। চাঁপাইনবাবগঞ্জের এই আমের সুনাম রয়েছে দেশ বিদেশে। জিআই সনদ পাওয়ার পর এখন থেকে চাঁপাইনবাবগঞ্জের পণ্য হিসেবেই বাজারজাত হচ্ছে হিমসাগর আম।",

    price: 59.99,
    category: "pomegranate",
    inStock: true,
    slug: "/pomegranate-from-rajshahi",
    image:
      "https://images.unsplash.com/photo-1608869857121-c0bcdf4fff2c?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Pineapple",
    description:
      "বাংলাদেশের নির্দেশক বা জিআই পণ্য হিসেবে স্বীকৃতি পেয়েছে চাঁপাইনবাবগঞ্জের হিমসাগর আম। স্বাদে-গন্ধে অতুলনীয় হিমসাগর আম। চাঁপাইনবাবগঞ্জের এই আমের সুনাম রয়েছে দেশ বিদেশে। জিআই সনদ পাওয়ার পর এখন থেকে চাঁপাইনবাবগঞ্জের পণ্য হিসেবেই বাজারজাত হচ্ছে হিমসাগর আম।",
    slug: "/pineapple-from-kustiya",
    price: 49.99,
    category: "pineapple",
    inStock: false,
    image:
      "https://ghorerbazar.com/cdn/shop/files/250tk_discount.jpg?v=1747222020&width=360",
  },
  {
    id: 9,
    name: "Pomegranate",
    description:
      "বাংলাদেশের নির্দেশক বা জিআই পণ্য হিসেবে স্বীকৃতি পেয়েছে চাঁপাইনবাবগঞ্জের হিমসাগর আম। স্বাদে-গন্ধে অতুলনীয় হিমসাগর আম। চাঁপাইনবাবগঞ্জের এই আমের সুনাম রয়েছে দেশ বিদেশে। জিআই সনদ পাওয়ার পর এখন থেকে চাঁপাইনবাবগঞ্জের পণ্য হিসেবেই বাজারজাত হচ্ছে হিমসাগর আম।",

    price: 39.99,
    category: "pomegranate",
    inStock: false,
    slug: "/pomegranate-form-joshor",
    image:
      "https://images.unsplash.com/photo-1608869857121-c0bcdf4fff2c?q=80&w=500&auto=format&fit=crop",
  },
];

const categories = ["mango", "pomegranate", "pineapple"];

export default function ProductPage() {
  const [pagination, setPagination] = useState<Pagination>(defaultPagination);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [stockFilter, setStockFilter] = useState<
    "all" | "in-stock" | "out-of-stock"
  >("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleStockFilterChange = (
    filter: "all" | "in-stock" | "out-of-stock"
  ) => {
    setStockFilter(filter);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setStockFilter("all");
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const stockMatch =
        stockFilter === "all" ||
        (stockFilter === "in-stock" && product.inStock) ||
        (stockFilter === "out-of-stock" && !product.inStock);

      return categoryMatch && stockMatch;
    });
  }, [selectedCategories, stockFilter]);

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger className="cursor-pointer text-base font-medium">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={category}
                    className="text-sm font-normal cursor-pointer capitalize"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="stock">
          <AccordionTrigger className="cursor-pointer text-base font-medium">
            Availability
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="all-stock"
                  checked={stockFilter === "all"}
                  onCheckedChange={() => handleStockFilterChange("all")}
                />
                <Label
                  htmlFor="all-stock"
                  className="text-sm font-normal cursor-pointer"
                >
                  All Products
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={stockFilter === "in-stock"}
                  onCheckedChange={() => handleStockFilterChange("in-stock")}
                />
                <Label
                  htmlFor="in-stock"
                  className="text-sm font-normal cursor-pointer"
                >
                  In Stock
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="out-of-stock"
                  checked={stockFilter === "out-of-stock"}
                  onCheckedChange={() =>
                    handleStockFilterChange("out-of-stock")
                  }
                />
                <Label
                  htmlFor="out-of-stock"
                  className="text-sm font-normal cursor-pointer"
                >
                  Out of Stock
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent
        className={`${viewMode !== "grid" && "grid grid-cols-3 gap-8"}`}
      >
        <div className={`${viewMode !== "grid" ? "" : "mb-4"}"relative"`}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
          />
          {!product.inStock && (
            <Badge variant="secondary" className="absolute top-2 right-2">
              Out of Stock
            </Badge>
          )}
          {product.originalPrice && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              Sale
            </Badge>
          )}
        </div>
        <div
          className={`space-y-2 mt-2 ${viewMode !== "grid" && "col-span-2"}`}
        >
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {product.description}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <Button
            className="w-full mt-2 cursor-pointer"
            disabled={!product.inStock}
            variant={product.inStock ? "default" : "secondary"}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-8">
            <FilterContent />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Products</h1>
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Filter products by category and availability
                    </SheetDescription>
                  </SheetHeader>
                  <div className="p-4">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* View Mode Toggle */}
              <div className="md:flex border rounded-md hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategories.length > 0 || stockFilter !== "all") && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="px-3 py-1">
                  {category}
                  <button
                    onClick={() => handleCategoryChange(category, false)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="w-4 h-4 cursor-pointer" />
                  </button>
                </Badge>
              ))}
              {stockFilter !== "all" && (
                <Badge variant="secondary" className="px-3 py-1">
                  {stockFilter === "in-stock" ? "In Stock" : "Out of Stock"}
                  <button
                    onClick={() => handleStockFilterChange("all")}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="w-4 h-4 cursor-pointer" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Filter className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to see more results
              </p>
              <Button onClick={clearFilters} className="cursor-pointer">
                Clear Filters
              </Button>
            </div>
          )}

          <br />

          <Paginations pagination={pagination} setPagination={setPagination} />
        </div>
      </div>
    </div>
  );
}
