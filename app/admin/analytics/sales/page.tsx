"use client";

import { useState } from "react";
import {
  Download,
  FileDown,
  FileIcon as FilePdf,
  FileSpreadsheet,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingCart,
  CreditCard,
  RefreshCw,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Import charts
import {
  RevenueChart,
  OrdersChart,
  AverageOrderValueChart,
  ConversionRateChart,
  SalesByCategoryChart,
  SalesByPaymentMethodChart,
  SalesByLocationChart,
  SalesByTimeChart,
} from "../_components/charts";

export default function SalesAnalyticsPage() {
  const [period, setPeriod] = useState("30d");
  // Properly initialize the date state with default values
  const [date, setDate] = useState<{ from: Date; to: Date }>({
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
          <h2 className="text-2xl font-bold tracking-tight">Sales Analytics</h2>
          <p className="text-muted-foreground">
            Detailed analysis of your store's sales performance.
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
                  <Badge className="ml-2 rounded-sm px-1">4</Badge>
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
                    Payment Methods
                  </h5>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="card" defaultChecked />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bkash" defaultChecked />
                      <Label htmlFor="bkash">bKash</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cod" defaultChecked />
                      <Label htmlFor="cod">Cash on Delivery</Label>
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
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳145,231.89</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+20.1% from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+12.2% from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳1,245</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+5.3% from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <div className="flex items-center text-sm text-red-500">
              <ArrowDownRight className="mr-1 h-4 w-4" />
              <span>-0.4% from previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="aov">Average Order Value</TabsTrigger>
          <TabsTrigger value="conversion">Conversion Rate</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>
                Revenue performance over the selected period.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <RevenueChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Volume</CardTitle>
              <CardDescription>
                Number of orders over the selected period.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <OrdersChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="aov" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Average Order Value</CardTitle>
              <CardDescription>
                Average order value over the selected period.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <AverageOrderValueChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="conversion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate</CardTitle>
              <CardDescription>
                Conversion rate over the selected period.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ConversionRateChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sales Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Product Category</CardTitle>
            <CardDescription>
              Revenue breakdown by product category.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <SalesByCategoryChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales by Payment Method</CardTitle>
            <CardDescription>
              Revenue breakdown by payment method.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <SalesByPaymentMethodChart />
          </CardContent>
        </Card>
      </div>

      {/* Additional Sales Insights */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Location</CardTitle>
            <CardDescription>
              Revenue breakdown by geographic location.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <SalesByLocationChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales by Time of Day</CardTitle>
            <CardDescription>Revenue breakdown by hour of day.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <SalesByTimeChart />
          </CardContent>
        </Card>
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>Configure automated sales reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-medium">Weekly Sales Summary</h3>
                <p className="text-sm text-muted-foreground">
                  Sent every Monday at 9:00 AM
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Scheduled Report</DialogTitle>
                      <DialogDescription>
                        Configure your automated sales report settings.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {/* Report configuration form would go here */}
                      <p className="text-sm text-muted-foreground">
                        Report configuration form would be implemented here.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm">
                  Disable
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-medium">Monthly Performance Report</h3>
                <p className="text-sm text-muted-foreground">
                  Sent on the 1st of each month
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Scheduled Report</DialogTitle>
                      <DialogDescription>
                        Configure your automated sales report settings.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {/* Report configuration form would go here */}
                      <p className="text-sm text-muted-foreground">
                        Report configuration form would be implemented here.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm">
                  Disable
                </Button>
              </div>
            </div>
            <Button className="w-full sm:w-auto">
              <FileDown className="mr-2 h-4 w-4" />
              Create New Scheduled Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
