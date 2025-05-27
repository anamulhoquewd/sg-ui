import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, LineChart, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Analytics | Shuddhoghor Admin",
  description:
    "Comprehensive analytics and reporting for your e-commerce store",
};

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Analytics & Reporting
        </h1>
        <p className="text-muted-foreground">
          Comprehensive data visualization and reporting to track your store's
          performance.
        </p>
        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="sales" asChild>
              <Link
                href="/admin/analytics/sales"
                className="flex items-center gap-2"
              >
                <LineChart className="h-4 w-4" />
                <span>Sales</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="users" asChild>
              <Link
                href="/admin/analytics/customers"
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                <span>Customers</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="products" asChild>
              <Link
                href="/admin/analytics/products"
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Products</span>
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {children}
    </div>
  );
}
