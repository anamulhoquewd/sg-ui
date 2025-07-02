import api from "@/axios/interceptor";
import { IPagination } from "@/interfaces/global";
import { IAdmin } from "@/interfaces/users";
import { defaultPagination } from "@/utils/details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Form schema
const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters." }),
  address: z.string().max(100, "Address must be less than 100 characters long"),
});

type FormValues = z.infer<typeof userFormSchema>;

function useAdmin() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IAdmin | null>(null);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [admins, setAdmins] = useState<IAdmin[] | []>([]);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);

  const router = useRouter();

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  // Form submission
  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const response = await api.post("/admins/auth/register", data);

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      form.reset({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      toast(response.data.message || "Category created successfully!");

      // Navigate back to users list
      router.push("/admin/users");
    } catch (error: any) {
      console.error("Error creating user:", error);

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

  const loadAdmins = async ({
    page = 1,
    search,
  }: {
    page: number;
    search: string;
  }) => {
    try {
      const response = await api.get("/admins", {
        params: {
          page,
          search,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Somthing went wrong!");
      }

      setAdmins(response.data.data);
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

  const handleDelete = async (data: string) => {
    console.log(data);
    try {
      const response = await api.delete(`/admins/${data}`);

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Somthing went wrong!");
      }

      loadAdmins({ page: pagination.page, search: searchQuery });

      toast(response.data.message || "Admin deleted successfully!");
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
    loadAdmins({ page: pagination.page, search: searchQuery });
  }, [pagination.page, searchQuery]);

  return {
    handleDelete,
    admins,
    pagination,
    setPagination,
    search,
    setSearch,
    isLoading,
    selectedItem,
    setSelectedItem,
    deleteOpen,
    setDeleteOpen,
    form,
    handleSubmit,
  };
}

export default useAdmin;
