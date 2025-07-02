import api from "@/axios/interceptor";
import { IPagination } from "@/interfaces/global";
import { ICustomer } from "@/interfaces/users";
import { defaultPagination } from "@/utils/details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const customerFormSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  phone: z
    .string()
    .regex(
      /^01\d{9}$/,
      "Phone number must start with 01 and be exactly 11 digits"
    )
    .optional(),
  address: z.string().max(100).optional(),
});

export type FormValues = z.infer<typeof customerFormSchema>;

function useCustomer() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ICustomer | null>(null);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);

  const form = useForm<FormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: selectedItem ?? { name: "", phone: "", address: "" },
  });

  const loadCustomers = async ({
    page = 1,
    search,
  }: {
    page: number;
    search: string;
  }) => {
    try {
      const response = await api.get("/customers", {
        params: {
          page,
          search,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Somthing went wrong!");
      }

      setCustomers(response.data.data);

      setPagination(() => ({
        page: response.data.pagination.page,
        total: response.data.pagination.total,
        totalPages: response.data.pagination.totalPages,
        nextPage: response.data.pagination.nextPage || null,
        prevPage: response.data.pagination.prevPage || null,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (data: FormValues) => {
    if (!selectedItem) return;

    setIsLoading(true);

    try {
      const response = await api.put(`/customers/${selectedItem._id}`, data);

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      form.reset({
        name: "",
        phone: "",
        address: "",
      });

      setSelectedItem(null);
      loadCustomers({ page: pagination.page, search: searchQuery });

      toast(response.data.message || "Customer updated successfully!");
    } catch (error: any) {
      console.error("Error updating customer:", error);

      if (error.response.data.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (data: string) => {
    console.log(data);
    try {
      const response = await api.delete(`/customers/${data}`);

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Somthing went wrong!");
      }

      loadCustomers({ page: pagination.page, search: searchQuery });

      toast(response.data.message || "Customer deleted successfully!");
    } catch (error: any) {
      console.log("Error: ", error);

      if (error.response.data.error.message)
        toast(error.response.data.error.message);
    } finally {
      setSelectedItem(null);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    loadCustomers({ page: pagination.page, search: searchQuery });
  }, [pagination.page, searchQuery]);

  useEffect(() => {
    if (selectedItem) {
      form.reset(selectedItem);
    } else {
      form.reset({
        name: "",
        phone: "",
        address: "",
      });
    }
  }, [selectedItem]);

  return {
    search,
    setSearch,
    customers,
    pagination,
    setPagination,
    isLoading,
    selectedItem,
    setSelectedItem,
    setDeleteOpen,
    deleteOpen,
    handleDelete,
    updateOpen,
    setUpdateOpen,
    handleUpdate,
    form,
  };
}

export default useCustomer;
