"use client";

import { useState, useMemo, useEffect } from "react";
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
import api from "@/axios/interceptor";
import { handleAxiosError } from "@/utils/error";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IProduct } from "@/interfaces/products";
import { ICategory } from "@/interfaces/categories";

export default function ProductPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [pagination, setPagination] = useState<Pagination>(defaultPagination);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [stockFilter, setStockFilter] = useState<
    "all" | "inStock" | "outOfStock" | "lowStock"
  >("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");

  useEffect(() => {
    setSelectedCategory(
      categories.find((category) => category.slug === categorySlug) || null
    );
  }, [categorySlug, categories]);

  // Fetch products and categories on component mount
  const fetchProducts = async ({
    page = 1,
    categoryFilter,
    stockFilter = "all",
    limit = 9,
  }: {
    page: number;
    categoryFilter?: string;
    stockFilter?: "all" | "lowStock" | "inStock" | "outOfStock";
    limit?: number;
  }) => {
    try {
      const response = await api.get("/products", {
        params: {
          page,
          ...(categoryFilter !== "all" && {
            category: categoryFilter,
          }),
          ...(stockFilter !== "all" && { status: stockFilter }),
          ...(limit && { limit }),
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      setProducts(response.data.data);

      setPagination(() => ({
        page: response.data.pagination.page,
        total: response.data.pagination.total,
        totalPages: response.data.pagination.totalPages,
        nextPage: response.data.pagination.nextPage || null,
        prevPage: response.data.pagination.prevPage || null,
      }));
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    // Fetch categories on component mount
    const getCategorires = async ({
      queryParams,
    }: {
      queryParams: Record<string, any>;
    }) => {
      try {
        const response = await api.get("/categories", {
          params: { ...queryParams },
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

    getCategorires({ queryParams: { limit: 1000, sortType: "asc" } });
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchProducts({
      page: pagination.page,
      categoryFilter: selectedCategory?._id || "all",
      stockFilter: stockFilter || "all",
    });
  }, [selectedCategory, stockFilter, pagination.page]);

  const handleCategoryChange = (category: ICategory, checked: boolean) => {
    if (checked) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  };

  const handleStockFilterChange = (
    filter: "all" | "inStock" | "outOfStock" | "lowStock"
  ) => {
    setStockFilter(filter);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setStockFilter("all");
  };

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
                <div key={category._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category._id}
                    checked={
                      (selectedCategory &&
                        selectedCategory._id === category._id) ||
                      false
                    }
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={category._id}
                    className="text-sm font-normal cursor-pointer capitalize"
                  >
                    {category.name}
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
                  checked={stockFilter === "inStock"}
                  onCheckedChange={() => handleStockFilterChange("inStock")}
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
                  id="low-stock"
                  checked={stockFilter === "lowStock"}
                  onCheckedChange={() => handleStockFilterChange("lowStock")}
                />
                <Label
                  htmlFor="low-stock"
                  className="text-sm font-normal cursor-pointer"
                >
                  Low Stock
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="out-of-stock"
                  checked={stockFilter === "outOfStock"}
                  onCheckedChange={() => handleStockFilterChange("outOfStock")}
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

  const ProductCard = ({ product }: { product: IProduct }) => (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent
        className={`${viewMode !== "grid" && "grid grid-cols-3 gap-8"}`}
      >
        <div className={`${viewMode !== "grid" ? "" : "mb-4"} relative`}>
          <Link href={`/products/${product.slug}`}>
            <Image
              src={product.media[0].url || ""}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-48 object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
            />
          </Link>
          {product.status === "outOfStock" && (
            <Badge variant="secondary" className="absolute top-2 right-2 z-10">
              Out of Stock
            </Badge>
          )}
          {product.isPopular && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              Popular
            </Badge>
          )}
        </div>
        <div
          className={`space-y-2 mt-2 ${viewMode !== "grid" && "col-span-2"}`}
        >
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {product.shortDescription ||
              product.longDescription ||
              "No description available for this product."}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">
              {product.unit.price || product.unit.originalPrice}
            </span>
            {product.unit.price < product.unit.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {product.unit.originalPrice}
              </span>
            )}
          </div>
          <Button
            className="w-full mt-2 cursor-pointer"
            disabled={product.status === "outOfStock"}
            variant={product.status !== "outOfStock" ? "default" : "secondary"}
          >
            {product.status !== "outOfStock" ? "Add to Cart" : "Out of Stock"}
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
                Showing {products.length} of {pagination.total} products
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
          {(selectedCategory !== null || stockFilter !== "all") && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory && (
                <Badge
                  key={selectedCategory.name.toLowerCase()}
                  variant="secondary"
                  className="px-3 py-1"
                >
                  {selectedCategory.name}
                  <button
                    onClick={() =>
                      handleCategoryChange(selectedCategory, false)
                    }
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="w-4 h-4 cursor-pointer" />
                  </button>
                </Badge>
              )}
              {stockFilter !== "all" && (
                <Badge variant="secondary" className="px-3 py-1">
                  {stockFilter === "inStock"
                    ? "In Stock"
                    : stockFilter === "lowStock"
                    ? "Low Stock"
                    : "Out of Stock"}
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
          {products.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
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
