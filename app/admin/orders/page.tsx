"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  Truck,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import ItemsDialog from "./_components/items-dialog";
import AdjustmentDialog from "./_components/adjustment-dialog";
import StatusDialog, {
  getStatusBadge,
  getStatusIcon,
  getPaymentStatusBadge,
} from "./_components/status-dialog";
import { IOrder } from "@/interfaces/orders";
import ShowItems from "./_components/show-items";
import { DeleteDialog } from "../_components/delete-dialong";
import useOrder from "./_hook/useOrder";

export default function OrdersPage() {
  // Function to copy the access key to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const {
    setShowAdvancedFilters,
    statusOpen,
    setStatusOpen,
    itemsOpen,
    setItemsOpen,
    setAdjustmentOpen,
    adjustmentOpen,
    setDeleteOpen,
    deleteOpen,
    showAdvancedFilters,
    selectedItem,
    setSelectedItem,
    setShowItemsOpen,
    showItemsOpen,
    pagination,
    setPagination,
    search,
    setSearch,
    filterBy,
    setFilterBy,
    getActiveFiltersCount,
    clearAllFilters,
    minRange,
    maxRange,
    orders,
    handleDelete,
    handleUpdate,
  } = useOrder();

  const openDialog = (order: IOrder, dialogType: string) => {
    setSelectedItem(order);
    switch (dialogType) {
      case "status":
        setStatusOpen(true);
        break;
      case "adjustment":
        setAdjustmentOpen(true);
        break;
      case "items":
        setItemsOpen(true);
        break;
      case "delete":
        setDeleteOpen(true);
        break;
      default:
        console.error("Unknown dialog type:", dialogType);
    }
  };

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
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
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
                  <SelectValue placeholder="All Pay Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pay Status</SelectItem>
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
                            setShowItemsOpen(true);
                            setSelectedItem(order);
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
                              onClick={() => openDialog(order, "status")}
                            >
                              <Truck className="mr-2 h-4 w-4" />
                              Update Status
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

      {selectedItem && (
        <>
          <ShowItems
            open={showItemsOpen}
            onOpenChange={setShowItemsOpen}
            order={selectedItem}
          />
          <StatusDialog
            open={statusOpen}
            onOpenChange={setStatusOpen}
            order={selectedItem}
            onUpdate={(data) => handleUpdate(data, "status")}
          />
          <AdjustmentDialog
            open={adjustmentOpen}
            onOpenChange={setAdjustmentOpen}
            order={selectedItem}
            onUpdate={(data) => handleUpdate(data, "adjustment")}
          />
          <ItemsDialog
            open={itemsOpen}
            onOpenChange={setItemsOpen}
            order={selectedItem}
            onUpdate={(data) => handleUpdate(data, "items")}
          />

          <DeleteDialog
            onConfirm={() => handleDelete(selectedItem._id)}
            open={deleteOpen}
            changeOpen={setDeleteOpen}
          />
        </>
      )}
    </div>
  );
}
