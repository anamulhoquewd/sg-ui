"use client";

import { useTheme } from "next-themes";
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  Scatter,
  ScatterChart,
  ComposedChart,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Sample data for charts
const revenueData = [
  {
    month: "Jan",
    revenue: 65000,
    orders: 220,
    profit: 32500,
    aov: 1200,
    conversion: 3.2,
  },
  {
    month: "Feb",
    revenue: 59000,
    orders: 195,
    profit: 29500,
    aov: 1150,
    conversion: 3.0,
  },
  {
    month: "Mar",
    revenue: 80000,
    orders: 265,
    profit: 40000,
    aov: 1300,
    conversion: 3.5,
  },
  {
    month: "Apr",
    revenue: 81000,
    orders: 270,
    profit: 40500,
    aov: 1350,
    conversion: 3.6,
  },
  {
    month: "May",
    revenue: 56000,
    orders: 190,
    profit: 28000,
    aov: 1100,
    conversion: 2.9,
  },
  {
    month: "Jun",
    revenue: 55000,
    orders: 185,
    profit: 27500,
    aov: 1050,
    conversion: 2.8,
  },
  {
    month: "Jul",
    revenue: 72000,
    orders: 240,
    profit: 36000,
    aov: 1250,
    conversion: 3.3,
  },
  {
    month: "Aug",
    revenue: 78000,
    orders: 260,
    profit: 39000,
    aov: 1280,
    conversion: 3.4,
  },
  {
    month: "Sep",
    revenue: 82000,
    orders: 275,
    profit: 41000,
    aov: 1320,
    conversion: 3.7,
  },
  {
    month: "Oct",
    revenue: 85000,
    orders: 280,
    profit: 42500,
    aov: 1350,
    conversion: 3.8,
  },
  {
    month: "Nov",
    revenue: 90000,
    orders: 300,
    profit: 45000,
    aov: 1400,
    conversion: 4.0,
  },
  {
    month: "Dec",
    revenue: 95000,
    orders: 320,
    profit: 47500,
    aov: 1450,
    conversion: 4.2,
  },
];

const salesByCategory = [
  { name: "Mangoes", value: 65 },
  { name: "Honey", value: 25 },
  { name: "Bundles", value: 10 },
];

const salesByPaymentMethod = [
  { name: "Credit Card", value: 45 },
  { name: "bKash", value: 30 },
  { name: "Cash on Delivery", value: 20 },
  { name: "Bank Transfer", value: 5 },
];

const salesByLocation = [
  { name: "Dhaka", value: 55 },
  { name: "Chittagong", value: 20 },
  { name: "Sylhet", value: 10 },
  { name: "Rajshahi", value: 8 },
  { name: "Other", value: 7 },
];

const salesByTime = [
  { hour: "00:00", sales: 12 },
  { hour: "02:00", sales: 8 },
  { hour: "04:00", sales: 5 },
  { hour: "06:00", sales: 10 },
  { hour: "08:00", sales: 25 },
  { hour: "10:00", sales: 45 },
  { hour: "12:00", sales: 60 },
  { hour: "14:00", sales: 58 },
  { hour: "16:00", sales: 55 },
  { hour: "18:00", sales: 70 },
  { hour: "20:00", sales: 52 },
  { hour: "22:00", sales: 30 },
];

const userActivityData = [
  { day: "Mon", visits: 120, signups: 15, orders: 12 },
  { day: "Tue", visits: 190, signups: 20, orders: 18 },
  { day: "Wed", visits: 130, signups: 12, orders: 10 },
  { day: "Thu", visits: 150, signups: 18, orders: 15 },
  { day: "Fri", visits: 180, signups: 22, orders: 20 },
  { day: "Sat", visits: 220, signups: 25, orders: 22 },
  { day: "Sun", visits: 200, signups: 23, orders: 21 },
];

const userAcquisitionData = [
  { month: "Jan", direct: 120, social: 80, search: 60, referral: 40 },
  { month: "Feb", direct: 130, social: 90, search: 70, referral: 45 },
  { month: "Mar", direct: 140, social: 100, search: 80, referral: 50 },
  { month: "Apr", direct: 150, social: 110, search: 90, referral: 55 },
  { month: "May", direct: 160, social: 120, search: 100, referral: 60 },
  { month: "Jun", direct: 170, social: 130, search: 110, referral: 65 },
];

const userRetentionData = [
  { month: "Jan", retention: 65 },
  { month: "Feb", retention: 62 },
  { month: "Mar", retention: 68 },
  { month: "Apr", retention: 70 },
  { month: "May", retention: 72 },
  { month: "Jun", retention: 75 },
];

const userDemographicsData = [
  { age: "18-24", male: 15, female: 20, other: 2 },
  { age: "25-34", male: 25, female: 30, other: 3 },
  { age: "35-44", male: 20, female: 25, other: 2 },
  { age: "45-54", male: 15, female: 20, other: 1 },
  { age: "55-64", male: 10, female: 15, other: 1 },
  { age: "65+", male: 5, female: 10, other: 0 },
];

const userEngagementData = [
  { month: "Jan", pageViews: 1200, timeOnSite: 120, bounceRate: 45 },
  { month: "Feb", pageViews: 1300, timeOnSite: 125, bounceRate: 43 },
  { month: "Mar", pageViews: 1400, timeOnSite: 130, bounceRate: 40 },
  { month: "Apr", pageViews: 1500, timeOnSite: 135, bounceRate: 38 },
  { month: "May", pageViews: 1600, timeOnSite: 140, bounceRate: 35 },
  { month: "Jun", pageViews: 1700, timeOnSite: 145, bounceRate: 33 },
];

const userDeviceData = [
  { name: "Mobile", value: 55 },
  { name: "Desktop", value: 35 },
  { name: "Tablet", value: 10 },
];

const userLocationData = [
  { name: "Dhaka", value: 50 },
  { name: "Chittagong", value: 15 },
  { name: "Sylhet", value: 10 },
  { name: "Rajshahi", value: 8 },
  { name: "Khulna", value: 7 },
  { name: "Other", value: 10 },
];

const userLifetimeValueData = [
  { month: 1, value: 1200 },
  { month: 2, value: 1800 },
  { month: 3, value: 2300 },
  { month: 4, value: 2700 },
  { month: 5, value: 3100 },
  { month: 6, value: 3400 },
  { month: 7, value: 3700 },
  { month: 8, value: 3900 },
  { month: 9, value: 4100 },
  { month: 10, value: 4300 },
  { month: 11, value: 4450 },
  { month: 12, value: 4600 },
];

const userSessionsData = [
  { duration: "0-1 min", sessions: 250 },
  { duration: "1-3 min", sessions: 420 },
  { duration: "3-5 min", sessions: 380 },
  { duration: "5-10 min", sessions: 320 },
  { duration: "10-15 min", sessions: 180 },
  { duration: "15+ min", sessions: 150 },
];

const productPerformanceData = [
  {
    name: "Himshagor",
    sales: 120,
    revenue: 42000,
    views: 2500,
    conversion: 4.8,
  },
  { name: "Rupali", sales: 100, revenue: 40000, views: 2200, conversion: 4.5 },
  { name: "Bari 4", sales: 80, revenue: 30400, views: 1800, conversion: 4.4 },
  {
    name: "Pure Honey",
    sales: 150,
    revenue: 97500,
    views: 3000,
    conversion: 5.0,
  },
  {
    name: "Seasonal Pack",
    sales: 50,
    revenue: 60000,
    views: 1500,
    conversion: 3.3,
  },
];

const productReviewsData = [
  { name: "Himshagor", rating: 4.8, reviews: 120 },
  { name: "Rupali", rating: 4.6, reviews: 95 },
  { name: "Bari 4", rating: 4.5, reviews: 80 },
  { name: "Pure Honey", rating: 4.9, reviews: 150 },
  { name: "Seasonal Pack", rating: 4.7, reviews: 60 },
];

const productCategoryPerformanceData = [
  { category: "Mangoes", sales: 350, revenue: 122500, profit: 61250 },
  { category: "Honey", sales: 250, revenue: 162500, profit: 81250 },
  { category: "Bundles", sales: 100, revenue: 120000, profit: 60000 },
];

const productInventoryData = [
  { name: "Himshagor", stock: 85, reorderPoint: 20 },
  { name: "Rupali", stock: 65, reorderPoint: 15 },
  { name: "Bari 4", stock: 45, reorderPoint: 15 },
  { name: "Pure Honey", stock: 120, reorderPoint: 30 },
  { name: "Seasonal Pack", stock: 25, reorderPoint: 10 },
];

const productPriceImpactData = [
  { price: 1500, sales: 120 },
  { price: 1600, sales: 110 },
  { price: 1700, sales: 100 },
  { price: 1800, sales: 90 },
  { price: 1900, sales: 80 },
  { price: 2000, sales: 70 },
];

const productSeasonalityData = [
  { month: "Jan", mangoes: 20, honey: 80 },
  { month: "Feb", mangoes: 25, honey: 85 },
  { month: "Mar", mangoes: 40, honey: 90 },
  { month: "Apr", mangoes: 80, honey: 85 },
  { month: "May", mangoes: 120, honey: 80 },
  { month: "Jun", mangoes: 150, honey: 75 },
  { month: "Jul", mangoes: 130, honey: 70 },
  { month: "Aug", mangoes: 100, honey: 75 },
  { month: "Sep", mangoes: 60, honey: 80 },
  { month: "Oct", mangoes: 40, honey: 85 },
  { month: "Nov", mangoes: 30, honey: 90 },
  { month: "Dec", mangoes: 25, honey: 95 },
];

// COLORS
const COLORS = ["#84cc16", "#3b82f6", "#f97316", "#8b5cf6", "#ec4899"];

// Sales Analytics Charts
export function RevenueChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        revenue: {
          label: "Revenue",
          color: "hsl(var(--chart-1))",
        },
        profit: {
          label: "Profit",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={revenueData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis dataKey="month" stroke={isDark ? "#e5e7eb" : "#374151"} />
          <YAxis
            stroke={isDark ? "#e5e7eb" : "#374151"}
            tickFormatter={(value) => `৳${value / 1000}k`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="var(--color-profit)"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function OrdersChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        orders: {
          label: "Orders",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={revenueData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis dataKey="month" stroke={isDark ? "#e5e7eb" : "#374151"} />
          <YAxis stroke={isDark ? "#e5e7eb" : "#374151"} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            dataKey="orders"
            fill="var(--color-orders)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function AverageOrderValueChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        aov: {
          label: "Average Order Value",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={revenueData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis dataKey="month" stroke={isDark ? "#e5e7eb" : "#374151"} />
          <YAxis
            stroke={isDark ? "#e5e7eb" : "#374151"}
            tickFormatter={(value) => `৳${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="aov"
            stroke="var(--color-aov)"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function ConversionRateChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        conversion: {
          label: "Conversion Rate",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={revenueData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis dataKey="month" stroke={isDark ? "#e5e7eb" : "#374151"} />
          <YAxis
            stroke={isDark ? "#e5e7eb" : "#374151"}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="conversion"
            stroke="var(--color-conversion)"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function SalesByCategoryChart() {
  return (
    <ChartContainer
      config={{
        retention: {
          label: "Retention Rate",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={salesByCategory}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {salesByCategory.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function SalesByPaymentMethodChart() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Payment Method",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={salesByPaymentMethod}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {salesByPaymentMethod.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function SalesByLocationChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        value: {
          label: "Sales Percentage",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={salesByLocation}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis
            type="number"
            stroke={isDark ? "#e5e7eb" : "#374151"}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis
            dataKey="name"
            type="category"
            stroke={isDark ? "#e5e7eb" : "#374151"}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            dataKey="value"
            fill="var(--color-value)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function SalesByTimeChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        sales: {
          label: "Sales",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={salesByTime}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis dataKey="hour" stroke={isDark ? "#e5e7eb" : "#374151"} />
          <YAxis stroke={isDark ? "#e5e7eb" : "#374151"} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            dataKey="sales"
            fill="var(--color-sales)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

// User Analytics Charts
export function UserAcquisitionChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        direct: {
          label: "Direct",
          color: "hsl(var(--chart-1))",
        },
        social: {
          label: "Social",
          color: "hsl(var(--chart-2))",
        },
        search: {
          label: "Search",
          color: "hsl(var(--chart-3))",
        },
        referral: {
          label: "Referral",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={userAcquisitionData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis dataKey="month" stroke={isDark ? "#e5e7eb" : "#374151"} />
          <YAxis stroke={isDark ? "#e5e7eb" : "#374151"} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="direct"
            stackId="1"
            stroke="var(--color-direct)"
            fill="var(--color-direct)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="social"
            stackId="1"
            stroke="var(--color-social)"
            fill="var(--color-social)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="search"
            stackId="1"
            stroke="var(--color-search)"
            fill="var(--color-search)"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="referral"
            stackId="1"
            stroke="var(--color-referral)"
            fill="var(--color-referral)"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function UserRetentionChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        retention: {
          label: "Retention Rate",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={userRetentionData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis dataKey="month" stroke={isDark ? "#e5e7eb" : "#374151"} />
          <YAxis
            stroke={isDark ? "#e5e7eb" : "#374151"}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="retention"
            stroke="var(--color-retention)"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function UserDemographicsChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        male: {
          label: "Male",
          color: "hsl(var(--chart-1))",
        },
        female: {
          label: "Female",
          color: "hsl(var(--chart-2))",
        },
        other: {
          label: "Other",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={userDemographicsData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis dataKey="age" stroke={isDark ? "#e5e7eb" : "#374151"} />
          <YAxis stroke={isDark ? "#e5e7eb" : "#374151"} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="male" fill="var(--color-male)" radius={[4, 0, 0, 4]} />
          <Bar
            dataKey="female"
            fill="var(--color-female)"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="other"
            fill="var(--color-other)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function UserEngagementChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        pageViews: {
          label: "Page Views",
          color: "hsl(var(--chart-1))",
        },
        timeOnSite: {
          label: "Time on Site (sec)",
          color: "hsl(var(--chart-2))",
        },
        bounceRate: {
          label: "Bounce Rate (%)",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={userEngagementData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis dataKey="month" stroke={isDark ? "#e5e7eb" : "#374151"} />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke={isDark ? "#e5e7eb" : "#374151"}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={isDark ? "#e5e7eb" : "#374151"}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="pageViews"
            fill="var(--color-pageViews)"
            radius={[4, 4, 0, 0]}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="timeOnSite"
            stroke="var(--color-timeOnSite)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="bounceRate"
            stroke="var(--color-bounceRate)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function UserDeviceChart() {
  return (
    <ChartContainer
      config={{
        retention: {
          label: "Retention Rate",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={userDeviceData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {userDeviceData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function UserLocationChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        value: {
          label: "Users",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={userLocationData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis
            type="number"
            stroke={isDark ? "#e5e7eb" : "#374151"}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis
            dataKey="name"
            type="category"
            stroke={isDark ? "#e5e7eb" : "#374151"}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            dataKey="value"
            fill="var(--color-value)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function UserLifetimeValueChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        value: {
          label: "Lifetime Value",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={userLifetimeValueData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis
            dataKey="month"
            stroke={isDark ? "#e5e7eb" : "#374151"}
            label={{ value: "Month", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            stroke={isDark ? "#e5e7eb" : "#374151"}
            tickFormatter={(value) => `৳${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-value)"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function UserSessionsChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        sessions: {
          label: "Sessions",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={userSessionsData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis dataKey="duration" stroke={isDark ? "#e5e7eb" : "#374151"} />
          <YAxis stroke={isDark ? "#e5e7eb" : "#374151"} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            dataKey="sessions"
            fill="var(--color-sessions)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

// Product Analytics Charts
export function ProductSalesChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        sales: {
          label: "Sales",
          color: "hsl(var(--chart-1))",
        },
        revenue: {
          label: "Revenue",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={productPerformanceData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis type="number" stroke={isDark ? "#e5e7eb" : "#374151"} />
          <YAxis
            dataKey="name"
            type="category"
            stroke={isDark ? "#e5e7eb" : "#374151"}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            dataKey="sales"
            fill="var(--color-sales)"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="revenue"
            fill="var(--color-revenue)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function ProductViewsChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        views: {
          label: "Views",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={productPerformanceData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis type="number" stroke={isDark ? "#e5e7eb" : "#374151"} />
          <YAxis
            dataKey="name"
            type="category"
            stroke={isDark ? "#e5e7eb" : "#374151"}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            dataKey="views"
            fill="var(--color-views)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function ProductConversionChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        conversion: {
          label: "Conversion Rate",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={productPerformanceData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis
            type="number"
            stroke={isDark ? "#e5e7eb" : "#374151"}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis
            dataKey="name"
            type="category"
            stroke={isDark ? "#e5e7eb" : "#374151"}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            dataKey="conversion"
            fill="var(--color-conversion)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function ProductReviewsChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        rating: {
          label: "Rating",
          color: "hsl(var(--chart-1))",
        },
        reviews: {
          label: "Reviews",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={productReviewsData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis type="number" stroke={isDark ? "#e5e7eb" : "#374151"} />
          <YAxis
            dataKey="name"
            type="category"
            stroke={isDark ? "#e5e7eb" : "#374151"}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            dataKey="reviews"
            fill="var(--color-reviews)"
            radius={[0, 4, 4, 0]}
          />
          <Line dataKey="rating" stroke="var(--color-rating)" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function ProductCategoryPerformanceChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        sales: {
          label: "Sales",
          color: "hsl(var(--chart-1))",
        },
        revenue: {
          label: "Revenue",
          color: "hsl(var(--chart-2))",
        },
        profit: {
          label: "Profit",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={productCategoryPerformanceData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis dataKey="category" stroke={isDark ? "#e5e7eb" : "#374151"} />
          <YAxis stroke={isDark ? "#e5e7eb" : "#374151"} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            dataKey="sales"
            fill="var(--color-sales)"
            radius={[4, 0, 0, 4]}
          />
          <Bar
            dataKey="revenue"
            fill="var(--color-revenue)"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="profit"
            fill="var(--color-profit)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function ProductInventoryChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        stock: {
          label: "Current Stock",
          color: "hsl(var(--chart-1))",
        },
        reorderPoint: {
          label: "Reorder Point",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={productInventoryData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis type="number" stroke={isDark ? "#e5e7eb" : "#374151"} />
          <YAxis
            dataKey="name"
            type="category"
            stroke={isDark ? "#e5e7eb" : "#374151"}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            dataKey="stock"
            fill="var(--color-stock)"
            radius={[0, 4, 4, 0]}
          />
          <Bar
            dataKey="reorderPoint"
            fill="var(--color-reorderPoint)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function ProductPriceImpactChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        sales: {
          label: "Sales",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis
            dataKey="price"
            name="Price"
            stroke={isDark ? "#e5e7eb" : "#374151"}
            label={{ value: "Price (৳)", position: "insideBottom", offset: -5 }}
            tickFormatter={(value) => `৳${value}`}
          />
          <YAxis
            dataKey="sales"
            name="Sales"
            stroke={isDark ? "#e5e7eb" : "#374151"}
            label={{ value: "Sales", angle: -90, position: "insideLeft" }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Scatter
            name="Price vs Sales"
            data={productPriceImpactData}
            fill="var(--color-sales)"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function ProductSeasonalityChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ChartContainer
      config={{
        mangoes: {
          label: "Mangoes",
          color: "hsl(var(--chart-1))",
        },
        honey: {
          label: "Honey",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={productSeasonalityData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis dataKey="month" stroke={isDark ? "#e5e7eb" : "#374151"} />
          <YAxis stroke={isDark ? "#e5e7eb" : "#374151"} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="mangoes"
            stroke="var(--color-mangoes)"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="honey"
            stroke="var(--color-honey)"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export { LineChart, BarChart };
