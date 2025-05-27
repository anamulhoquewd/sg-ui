"use client";

import { useState } from "react";
import {
  Download,
  FileIcon as FilePdf,
  FileSpreadsheet,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  ShoppingCart,
  Eye,
  Star,
  Printer,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "../_components/date-range-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Import charts
import {
  ProductSalesChart,
  ProductViewsChart,
  ProductConversionChart,
  ProductReviewsChart,
  ProductCategoryPerformanceChart,
  ProductInventoryChart,
  ProductPriceImpactChart,
  ProductSeasonalityChart,
} from "../_components/charts";

export default function ProductAnalyticsPage() {
  const [period, setPeriod] = useState("30d");
  const [date, setDate] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleExport = (format: string) => {
    // In a real application, this would trigger an API call to generate the export
    console.log(`Exporting data in ${format} format`);
    // Show success message
    alert(
      `Your ${format.toUpperCase()} export has started. You'll be notified when it's ready to download.`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Product Analytics
          </h2>
          <p className="text-muted-foreground">
            Detailed analysis of your product performance and inventory.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Popover
            open={period === "custom" || showFilters}
            onOpenChange={setShowFilters}
          >
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-10">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {showFilters && (
                  <Badge className="ml-2 rounded-sm px-1">3</Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px]" align="end">
              <div className="space-y-4">
                <h4 className="font-medium leading-none">Filter Data</h4>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium leading-none">
                    Date Range
                  </h5>
                  <DatePickerWithRange date={date} setDate={setDate} />
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium leading-none">
                    Product Categories
                  </h5>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mangoes" defaultChecked />
                      <Label htmlFor="mangoes">Mangoes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="honey" defaultChecked />
                      <Label htmlFor="honey">Honey</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bundles" defaultChecked />
                      <Label htmlFor="bundles">Bundles</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium leading-none">
                    Price Range
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="min-price">Min (৳)</Label>
                      <Input id="min-price" placeholder="0" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="max-price">Max (৳)</Label>
                      <Input id="max-price" placeholder="10000" />
                    </div>
                  </div>
                </div>
                <Button className="w-full">Apply Filters</Button>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("csv")}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("pdf")}>
                <FilePdf className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("excel")}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" />
                Print Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products Sold
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,542</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+18.2% from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Product Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,876</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+22.5% from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.2%</div>
            <div className="flex items-center text-sm text-red-500">
              <ArrowDownRight className="mr-1 h-4 w-4" />
              <span>-1.3% from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7/5</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+0.2 from previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Charts */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="views">Views</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Sales</CardTitle>
              <CardDescription>
                Sales volume by product over the selected period.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ProductSalesChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="views" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Views</CardTitle>
              <CardDescription>
                View counts by product over the selected period.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ProductViewsChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="conversion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Conversion</CardTitle>
              <CardDescription>
                Conversion rates by product over the selected period.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ProductConversionChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Reviews</CardTitle>
              <CardDescription>
                Review ratings by product over the selected period.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ProductReviewsChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Product Insights */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>
              Sales performance by product category.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ProductCategoryPerformanceChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inventory Levels</CardTitle>
            <CardDescription>
              Current inventory levels by product.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ProductInventoryChart />
          </CardContent>
        </Card>
      </div>

      {/* Additional Product Insights */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Price Impact Analysis</CardTitle>
            <CardDescription>
              Impact of price changes on sales volume.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ProductPriceImpactChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Seasonal Performance</CardTitle>
            <CardDescription>Product performance by season.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ProductSeasonalityChart />
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>
            Products with the highest sales and engagement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 gap-4 p-4 font-medium">
              <div>Product</div>
              <div>Category</div>
              <div>Units Sold</div>
              <div>Revenue</div>
              <div>Conversion Rate</div>
              <div>Rating</div>
            </div>
            {[
              {
                product: "Himshagor Mango (5kg)",
                category: "Mangoes",
                sold: 432,
                revenue: "৳756,000",
                conversion: "18.5%",
                rating: "4.8/5",
              },
              {
                product: "Pure Honey (500g)",
                category: "Honey",
                sold: 387,
                revenue: "৳251,550",
                conversion: "15.2%",
                rating: "4.9/5",
              },
              {
                product: "Mango & Honey Bundle",
                category: "Bundles",
                sold: 245,
                revenue: "৳367,500",
                conversion: "12.8%",
                rating: "4.7/5",
              },
              {
                product: "Rupali Mango (5kg)",
                category: "Mangoes",
                sold: 198,
                revenue: "৳346,500",
                conversion: "10.5%",
                rating: "4.6/5",
              },
              {
                product: "Organic Honey (1kg)",
                category: "Honey",
                sold: 176,
                revenue: "৳228,800",
                conversion: "9.8%",
                rating: "4.8/5",
              },
            ].map((product, i) => (
              <div key={i} className="grid grid-cols-6 gap-4 border-t p-4">
                <div>{product.product}</div>
                <div>{product.category}</div>
                <div>{product.sold.toLocaleString()}</div>
                <div>{product.revenue}</div>
                <div>{product.conversion}</div>
                <div>{product.rating}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm">
              View All Products
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
