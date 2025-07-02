import api from "@/axios/interceptor";
import { IPagination } from "@/interfaces/global";
import { IOrder } from "@/interfaces/orders";
import { defaultPagination } from "@/utils/details";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface IFilter {
  status: string;
  paymentStatus: string;
  dateRange: { from: Date | undefined; to: Date | undefined } | undefined;
  singleDate: Date | undefined;
  amountRange: [number, number] | number[];
}
interface ILoadOrder {
  search: {
    orderId: string;
    customerId: string;
    productId: string;
  };
  filters: IFilter;
  page: number;
}
interface ISearch {
  orderId: string;
  customerId: string;
  productId: string;
}

function useOrder() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);

  // Define the range for the amount filter
  const minRange = 0;
  const maxRange = 10000;

  // Dialogs
  const [selectedItem, setSelectedItem] = useState<IOrder | null>(null);
  const [statusOpen, setStatusOpen] = useState<boolean>(false);
  const [adjustmentOpen, setAdjustmentOpen] = useState<boolean>(false);
  const [itemsOpen, setItemsOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [showItemsOpen, setShowItemsOpen] = useState<boolean>(false);

  // Search
  const [search, setSearch] = useState<ISearch>({
    orderId: "",
    customerId: "",
    productId: "",
  });
  const [debouncedOrderId, setDebouncedOrderId] = useState<string>("");
  const [debouncedCustomerId, setDebouncedCustomerId] = useState<string>("");
  const [debouncedProductId, setDebouncedProductId] = useState<string>("");
  const [debouncedAmountRange, setDebouncedAmountRange] = useState<
    [number, number]
  >([0, 10000]);

  const [filterBy, setFilterBy] = useState<IFilter>({
    status: "",
    paymentStatus: "",
    dateRange: undefined as
      | { from: Date | undefined; to: Date | undefined }
      | undefined,
    singleDate: undefined as Date | undefined,
    amountRange: [minRange, maxRange] as [number, number],
  });

  const loadOrders = async ({ search, filters, page }: ILoadOrder) => {
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

  const handleUpdate = async (data: any, type: string) => {
    console.log("Update Product Data:", data, type);

    if (!selectedItem) return;

    try {
      const response = await api.patch(
        `/orders/${selectedItem._id}/${type}`,
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

      setSelectedItem(null);

      toast(response.data.message || "Category updated successfully!");
    } catch (error) {
      console.error("Failed to update order:", error);
    } finally {
      setSelectedItem(null);
    }
  };

  const handleDelete = async (id: string) => {
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

      setSelectedItem(null);

      toast(response.data.message || "Order deleted successfully!");
    } catch (error: any) {
      console.error("Failed to delete order:", error);
      if (error.response.data.error.message)
        toast(error.response.data.error.message);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAmountRange(filterBy.amountRange as [number, number]);
    }, 1000);
    return () => clearTimeout(timer);
  }, [filterBy.amountRange]);

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

  return {
    clearAllFilters,
    getActiveFiltersCount,
    handleDelete,
    handleUpdate,
    showAdvancedFilters,
    setShowAdvancedFilters,
    orders,
    pagination,
    setPagination,
    statusOpen,
    setStatusOpen,
    adjustmentOpen,
    setAdjustmentOpen,
    itemsOpen,
    setItemsOpen,
    showItemsOpen,
    setShowItemsOpen,
    deleteOpen,
    setDeleteOpen,
    selectedItem,
    setSelectedItem,
    search,
    setSearch,
    filterBy,
    setFilterBy,
    minRange,
    maxRange,
  };
}

export default useOrder;
