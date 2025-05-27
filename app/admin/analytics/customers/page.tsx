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
  Users,
  UserPlus,
  UserCheck,
  ShoppingBag,
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

// Import charts
import {
  UserAcquisitionChart,
  UserRetentionChart,
  UserDemographicsChart,
  UserEngagementChart,
  UserDeviceChart,
  UserLocationChart,
  UserLifetimeValueChart,
  UserSessionsChart,
} from "../_components/charts";

export default function UserAnalyticsPage() {
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
          <h2 className="text-2xl font-bold tracking-tight">User Analytics</h2>
          <p className="text-muted-foreground">
            Detailed analysis of your store's user engagement and behavior.
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
                    User Type
                  </h5>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="new-users" defaultChecked />
                      <Label htmlFor="new-users">New Users</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="returning-users" defaultChecked />
                      <Label htmlFor="returning-users">Returning Users</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="guest-users" defaultChecked />
                      <Label htmlFor="guest-users">Guest Users</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium leading-none">
                    User Source
                  </h5>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="direct" defaultChecked />
                      <Label htmlFor="direct">Direct</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="social" defaultChecked />
                      <Label htmlFor="social">Social Media</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="search" defaultChecked />
                      <Label htmlFor="search">Search Engines</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="referral" defaultChecked />
                      <Label htmlFor="referral">Referrals</Label>
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
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,543</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+15.3% from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+1,243</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+8.7% from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,872</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              <span>+12.1% from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8%</div>
            <div className="flex items-center text-sm text-red-500">
              <ArrowDownRight className="mr-1 h-4 w-4" />
              <span>-0.2% from previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Charts */}
      <Tabs defaultValue="acquisition" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>
        <TabsContent value="acquisition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Acquisition</CardTitle>
              <CardDescription>
                New user signups over the selected period.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <UserAcquisitionChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Retention</CardTitle>
              <CardDescription>User retention rates over time.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <UserRetentionChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>
                User activity and engagement metrics.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <UserEngagementChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Demographics</CardTitle>
              <CardDescription>Breakdown of user demographics.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <UserDemographicsChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Insights */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Lifetime Value</CardTitle>
            <CardDescription>
              Average revenue generated per user over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <UserLifetimeValueChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Sessions</CardTitle>
            <CardDescription>Session duration and frequency.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <UserSessionsChart />
          </CardContent>
        </Card>
      </div>

      {/* Additional User Insights */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Devices</CardTitle>
            <CardDescription>
              Breakdown of devices used to access your store.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <UserDeviceChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Locations</CardTitle>
            <CardDescription>
              Geographic distribution of your users.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <UserLocationChart />
          </CardContent>
        </Card>
      </div>

      {/* User Segments */}
      <Card>
        <CardHeader>
          <CardTitle>User Segments</CardTitle>
          <CardDescription>
            Analysis of key user segments and their behavior.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                <div>Segment</div>
                <div>Users</div>
                <div>Conversion Rate</div>
                <div>Avg. Order Value</div>
                <div>Revenue</div>
              </div>
              {[
                {
                  segment: "New Customers",
                  users: 3245,
                  conversion: "4.2%",
                  aov: "৳1,120",
                  revenue: "৳42,350",
                },
                {
                  segment: "Returning Customers",
                  users: 2187,
                  conversion: "8.7%",
                  aov: "৳1,450",
                  revenue: "৳78,230",
                },
                {
                  segment: "High-Value Customers",
                  users: 543,
                  conversion: "12.3%",
                  aov: "৳2,780",
                  revenue: "৳124,560",
                },
                {
                  segment: "One-Time Purchasers",
                  users: 4321,
                  conversion: "1.8%",
                  aov: "৳980",
                  revenue: "৳32,450",
                },
                {
                  segment: "Abandoned Cart",
                  users: 1876,
                  conversion: "0%",
                  aov: "৳0",
                  revenue: "৳0",
                },
              ].map((segment, i) => (
                <div key={i} className="grid grid-cols-5 gap-4 border-t p-4">
                  <div>{segment.segment}</div>
                  <div>{segment.users.toLocaleString()}</div>
                  <div>{segment.conversion}</div>
                  <div>{segment.aov}</div>
                  <div>{segment.revenue}</div>
                </div>
              ))}
            </div>
            <Button className="w-full sm:w-auto">
              <FileDown className="mr-2 h-4 w-4" />
              Export Segment Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
