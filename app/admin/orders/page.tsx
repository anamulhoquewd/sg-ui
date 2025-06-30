"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Package,
  X,
  Calendar,
  User,
  ShoppingCart,
  Copy,
  CreditCard,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { format, set } from "date-fns";
import api from "@/axios/interceptor";
import { defaultPagination } from "@/utils/details";
import Paginations, { Pagination } from "@/components/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DateRangePicker } from "@/components/date-range-picker";
import DeleteDialog from "./_components/delete-dialog";
import ItemsDialog from "./_components/items-dialog";
import AdjustmentDialog from "./_components/adjustment-dialog";
import StatusDialog, {
  getStatusBadge,
  getStatusIcon,
  getPaymentStatusBadge,
} from "./_components/status-dialog";
import { IOrder } from "@/interfaces/orders";
import ShowItems from "./_components/show-items";

export default function OrdersPage() {
  // Define the range for the amount filter
  const minRange = 0;
  const maxRange = 10000;

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [statusesDialogOpen, setStatusesDialogOpen] = useState(false);
  const [adjustmentDialogOpen, setAdjustmentDialogOpen] = useState(false);
  const [itemsDialogOpen, setItemsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [showItemsDialogOpen, setShowItemsDialogOpen] = useState(false);

  const [search, setSearch] = useState({
    orderId: "",
    customerId: "",
    productId: "",
  });
  const [debouncedOrderId, setDebouncedOrderId] = useState("");
  const [debouncedCustomerId, setDebouncedCustomerId] = useState("");
  const [debouncedProductId, setDebouncedProductId] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]); // Initialize with sample data
  const [pagination, setPagination] = useState<Pagination>(defaultPagination);
  const [filterBy, setFilterBy] = useState<{
    status: string;
    paymentStatus: string;
    dateRange: { from: Date | undefined; to: Date | undefined } | undefined;
    singleDate: Date | undefined;
    amountRange: [number, number] | number[];
  }>({
    status: "",
    paymentStatus: "",
    dateRange: undefined as
      | { from: Date | undefined; to: Date | undefined }
      | undefined,
    singleDate: undefined as Date | undefined,
    amountRange: [minRange, maxRange] as [number, number],
  });

  const [debouncedAmountRange, setDebouncedAmountRange] = useState<
    [number, number]
  >([0, 10000]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAmountRange(filterBy.amountRange as [number, number]);
    }, 1000);
    return () => clearTimeout(timer);
  }, [filterBy.amountRange]);

  const loadOrders = async ({
    search,
    filters,
    page,
  }: {
    search: {
      orderId: string;
      customerId: string;
      productId: string;
    };
    filters: typeof filterBy;
    page: number;
  }) => {
    try {
      const response = await api.get("/orders", {
        params: {
          search: search?.orderId || undefined,
          status: filters?.status || undefined,
          paymentStatus: filters?.paymentStatus || undefined,
          fromDate: filters?.dateRange?.from
            ? format(filters.dateRange.from, "yyyy-MM-dd")
            : undefined,
          toDate: filters?.dateRange?.to
            ? format(filters.dateRange.to, "yyyy-MM-dd")
            : undefined,
          date: filters?.singleDate
            ? format(filters.singleDate, "yyyy-MM-dd")
            : undefined,
          customer: search?.customerId || undefined,
          product: search?.productId || undefined,
          minAmount:
            filters?.amountRange[0] !== minRange
              ? filters?.amountRange[0]
              : undefined,
          maxAmount:
            filters?.amountRange[0] !== minRange
              ? filters?.amountRange[1]
              : undefined,
          page: page === 1 ? undefined : page,
        },
      });

      if (!response.data.success || !Array.isArray(response.data.data)) {
        throw new Error("Invalid response data format");
      }

      setOrders(response.data.data || []);

      setPagination(() => ({
        page: response.data.pagination.page,
        total: response.data.pagination.total,
        totalPages: response.data.pagination.totalPages,
        nextPage: response.data.pagination.nextPage || null,
        prevPage: response.data.pagination.prevPage || null,
      }));
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const clearAllFilters = () => {
    setFilterBy({
      status: "",
      paymentStatus: "",
      dateRange: { from: undefined, to: undefined },
      singleDate: undefined,
      amountRange: [minRange, maxRange] as [number, number],
    });
    setSearch({
      orderId: "",
      customerId: "",
      productId: "",
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filterBy.status) count++;
    if (filterBy.paymentStatus) count++;
    if (filterBy.dateRange?.from && filterBy.dateRange?.to) count++;
    if (filterBy.singleDate) count++;
    if (debouncedOrderId) count++;
    if (debouncedCustomerId) count++;
    if (debouncedProductId) count++;
    if (
      filterBy.amountRange[0] !== minRange ||
      filterBy.amountRange[1] !== maxRange
    )
      count++;
    return count;
  };

  // Function to copy the access key to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const openDialog = (order: IOrder, dialogType: string) => {
    setSelectedOrder(order);
    switch (dialogType) {
      case "statuses":
        setStatusesDialogOpen(true);
        break;
      case "adjustment":
        setAdjustmentDialogOpen(true);
        break;
      case "items":
        setItemsDialogOpen(true);
        break;
      case "delete":
        setDeleteDialogOpen(true);
        break;
      default:
        console.error("Unknown dialog type:", dialogType);
    }
  };

  const handleUpdateOrder = async (data: any, type: string) => {
    console.log("Update Product Data:", data, type);

    if (!selectedOrder) {
      return;
    }

    try {
      const response = await api.patch(
        `/orders/${selectedOrder._id}/${type}`,
        data
      );

      if (!response.data.success) {
        throw new Error("Failed to update order");
      }

      // Update the local state with the new order data
      loadOrders({
        search: {
          orderId: debouncedOrderId,
          customerId: debouncedCustomerId,
          productId: debouncedProductId,
        },
        filters: filterBy,
        page: pagination.page,
      });
    } catch (error) {
      console.error("Failed to update order:", error);
    } finally {
      setSelectedOrder(null);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    console.log("Delete Product ID:", id);
    try {
      const response = await api.delete(`/orders/${id}`);

      if (!response.data.success) {
        throw new Error("Failed to delete order");
      }

      // Reload orders after deletion
      loadOrders({
        search: {
          orderId: debouncedOrderId,
          customerId: debouncedCustomerId,
          productId: debouncedProductId,
        },
        filters: filterBy,
        page: pagination.page,
      });

      setSelectedOrder(null);
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedOrderId(search.orderId);
      setDebouncedCustomerId(search.customerId);
      setDebouncedProductId(search.productId);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search.customerId, search.orderId, search.productId]);

  // Fetch orders on initial load
  useEffect(() => {
    loadOrders({
      search: {
        orderId: debouncedOrderId,
        customerId: debouncedCustomerId,
        productId: debouncedProductId,
      },
      filters: filterBy,
      page: pagination.page,
    });
  }, [
    debouncedOrderId,
    debouncedCustomerId,
    debouncedProductId,
    filterBy.status,
    filterBy.paymentStatus,
    filterBy.dateRange,
    filterBy.singleDate,
    debouncedAmountRange,
    pagination.page,
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Order Management
          </h1>
          <p className="text-muted-foreground">
            You have {pagination.total} total orders.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            Export Orders
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>
            Search and filter orders with various criteria.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Basic Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by Order ID..."
                  className="pl-8"
                  value={search.orderId}
                  onChange={(e) =>
                    setSearch({ ...search, orderId: e.target.value })
                  }
                />
              </div>

              <Select
                value={filterBy.status}
                onValueChange={(value) =>
                  setFilterBy((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filterBy.paymentStatus}
                onValueChange={(value) =>
                  setFilterBy((prev) => ({ ...prev, paymentStatus: value }))
                }
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="All Pay Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pay Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={
                  getActiveFiltersCount() > 0
                    ? "border-primary"
                    : "" + "cursor-pointer"
                }
              >
                <Filter className="h-4 w-4" />
                {getActiveFiltersCount() > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
            </div>

            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="cursor-pointer"
              >
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mb-6 p-4 border rounded-lg bg-muted/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Date Range Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Date Range</Label>
                  <DateRangePicker
                    initialDateFrom={filterBy.dateRange?.from}
                    initialDateTo={filterBy.dateRange?.to}
                    onUpdate={(values) =>
                      setFilterBy((prev) => ({
                        ...prev,
                        dateRange: values.range,
                      }))
                    }
                  />
                </div>

                {/* Single Date Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Single Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal cursor-pointer"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {filterBy.singleDate
                          ? format(filterBy.singleDate, "MMM dd, yyyy")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={filterBy.singleDate}
                        onSelect={(date) =>
                          setFilterBy((prev) => ({ ...prev, singleDate: date }))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Customer ID Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Customer ID</Label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter Customer ID"
                      className="pl-8"
                      type="search"
                      value={search.customerId}
                      onChange={(e) =>
                        setSearch((prev) => ({
                          ...prev,
                          customerId: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Product ID Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Product ID</Label>
                  <div className="relative">
                    <ShoppingCart className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter Product ID"
                      className="pl-8"
                      type="search"
                      value={search.productId}
                      onChange={(e) =>
                        setSearch((prev) => ({
                          ...prev,
                          productId: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Amount Range Filter */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium">
                    Amount Range: ৳{filterBy.amountRange[0]?.toLocaleString()} -
                    ৳{filterBy.amountRange[1]?.toLocaleString()}
                  </Label>
                  <div className="px-2">
                    <Slider
                      value={filterBy.amountRange}
                      onValueChange={(value) =>
                        setFilterBy((prev) => ({
                          ...prev,
                          amountRange: [value[0], value[1]] as [number, number],
                        }))
                      }
                      max={10000}
                      min={0}
                      step={100}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>৳{minRange.toLocaleString()}</span>
                    <span>৳{maxRange.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-18">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No products found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2 flex-1">
                          <code className="px-2 py-1 bg-muted rounded text-xs font-mono truncate max-w-[180px]">
                            {order._id.substring(0, 6)}...
                          </code>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 cursor-pointer"
                                  onClick={() => copyToClipboard(order._id)}
                                >
                                  <Copy className="h-3 w-3" />
                                  <span className="sr-only">
                                    Copy Customer ID
                                  </span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Copy ID</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant={"outline"}
                          size={"sm"}
                          onClick={() => {
                            setShowItemsDialogOpen(true);
                            setSelectedOrder(order);
                          }}
                          className="cursor-pointer"
                        >
                          Show Items
                          <span className="sr-only">Show Items</span>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {order.customer.name.toUpperCase().charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {order.customer.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {order.customer.phone}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          {getStatusBadge(order.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getPaymentStatusBadge(order.paymentStatus)}
                      </TableCell>
                      <TableCell className="text-right">
                        ৳{order.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="cursor-pointer"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/orders/${order._id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => openDialog(order, "statuses")}
                            >
                              <Truck className="mr-2 h-4 w-4" />
                              Update Statuses
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openDialog(order, "adjustment")}
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Amount Adjustments
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openDialog(order, "items")}
                            >
                              <Package className="mr-2 h-4 w-4" />
                              Update Items
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Invoice
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => openDialog(order, "delete")}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Product
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-end">
          <Paginations pagination={pagination} setPagination={setPagination} />
        </CardFooter>
      </Card>

      <ShowItems
        open={showItemsDialogOpen}
        onOpenChange={setShowItemsDialogOpen}
        order={selectedOrder}
      />

      {selectedOrder && (
        <>
          <StatusDialog
            open={statusesDialogOpen}
            onOpenChange={setStatusesDialogOpen}
            order={selectedOrder}
            onUpdate={(data) => handleUpdateOrder(data, "status")}
          />
          <AdjustmentDialog
            open={adjustmentDialogOpen}
            onOpenChange={setAdjustmentDialogOpen}
            order={selectedOrder}
            onUpdate={(data) => handleUpdateOrder(data, "adjustment")}
          />
          <ItemsDialog
            open={itemsDialogOpen}
            onOpenChange={setItemsDialogOpen}
            order={selectedOrder}
            onUpdate={(data) => handleUpdateOrder(data, "items")}
          />

          <DeleteDialog
            onConfirm={() => handleDeleteOrder(selectedOrder._id)}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          />
        </>
      )}
    </div>
  );
}
