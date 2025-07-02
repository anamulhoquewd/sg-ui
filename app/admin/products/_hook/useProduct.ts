import api from "@/axios/interceptor";
import { ICategory } from "@/interfaces/categories";
import { IPagination } from "@/interfaces/global";
import { IProduct } from "@/interfaces/products";
import { defaultPagination } from "@/utils/details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Form schema
const productFormSchema = z.object({
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only (no spaces or special characters)."
    ),
  name: z
    .string()
    .min(5, { message: "Product name must be at least 5 characters." }),
  title: z
    .string()
    .min(10, { message: "Product title must be at least 10 characters." }),
  shortDescription: z
    .string()
    .min(20, { message: "Short description must be at least 20 characters." })
    .optional(),
  longDescription: z
    .string()
    .min(50, { message: "Long description must be at least 50 characters." })
    .optional(),
  origin: z.string().optional(),

  category: z
    .string()
    .length(24, { message: "Invalid category ID" })
    .regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid ObjectId format" }),
  status: z.enum(["inStock", "lowStock", "outOfStock"]),
  isPopular: z.boolean(),
  visibility: z.boolean(),
  season: z.string().optional(),

  unit: z.object({
    unitType: z.enum(["kg", "piece"]),
    averageWeightPerFruit: z.string(),
    price: z.coerce
      .number()
      .positive({ message: "Original Price must be a positive number." }),
    costPerItem: z.coerce
      .number()
      .nonnegative({ message: "Cost must be a non-negative number." })
      .optional(),
    stockQuantity: z.coerce.number().nonnegative({
      message: "Stock quantity must be a non-negative number.",
    }),
  }),

  lowStockThreshold: z.coerce.number().nonnegative(),
});

type FormValues = z.infer<typeof productFormSchema>;

function useProduct() {
  const [images, setImages] = useState<{ url: string; file?: File }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);

  // Dialog states
  const [selectedItem, setSelectedItem] = useState<IProduct | null>(null);
  const [unitOpen, setUnitOpen] = useState<boolean>(false);
  const [generalOpen, setGeneralOpen] = useState<boolean>(false);
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [visibilityOpen, setVisibilityOpen] = useState<boolean>(false);
  const [mediaOpen, setMediaOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const router = useRouter();

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      slug: "",
      name: "",
      title: "",
      origin: "",
      category: "",
      isPopular: false,
      visibility: true,
      season: "",
      lowStockThreshold: 20,
      unit: {
        price: 0,
        costPerItem: 0,
        stockQuantity: 0,
        averageWeightPerFruit: "",
      },
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const hadnleSubmit = async (data: z.infer<typeof productFormSchema>) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      const hasImages = images.some((image) => image?.file);

      if (!hasImages) {
        toast("At least one image is required");
        throw new Error("At least one image is required.");
      }

      // Append images
      images.forEach((image) => {
        if (image.file) {
          formData.append("media", image.file);
        }
      });

      const [productResponse, mediaResponse] = await Promise.all([
        api.post("http://localhost:3000/api/v1/products/register", {
          ...data,
        }),
        api.post(`/products/media?slug=${data.slug}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
      ]);

      if (!productResponse.data.success) {
        toast(productResponse.data?.error?.message || "Something went wrong");
        throw new Error(
          productResponse.data?.error?.message || "Something with wrong"
        );
      }
      if (!mediaResponse.data.success) {
        toast(mediaResponse.data?.error?.message || "Something went wrong");
        throw new Error(
          mediaResponse.data?.error?.message || "Something with wrong"
        );
      }

      // Submit

      await api.patch(`/products/${productResponse.data.data._id}/media`, {
        urls: mediaResponse.data.data,
      });

      toast(productResponse.data?.message || "Product has been created.");
      toast(mediaResponse.data?.message || "Files has been uploaded in S3.");

      form.reset({
        slug: "",
        name: "",
        title: "",
        origin: "",
        category: "",
        isPopular: false,
        visibility: true,
        season: "",
        lowStockThreshold: 20,
        unit: {
          price: 0,
          costPerItem: 0,
          stockQuantity: 0,
          averageWeightPerFruit: "",
        },
      });

      router.push("/admin/products");
    } catch (error: any) {
      console.error("Error : ", error);

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

  const loadProducts = async ({
    searchQuery,
    page = 1,
    categoryFilter,
  }: {
    searchQuery: string;
    page: number;
    categoryFilter: string;
  }) => {
    try {
      const response = await api.get("/products", {
        params: {
          search: searchQuery,
          page,
          ...(categoryFilter !== "all" && {
            category: categoryFilter,
          }),
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      setProducts(response.data.data);

      setPagination(() => ({
        page: response.data.pagination.page,
        total: response.data.pagination.total,
        totalPages: response.data.pagination.totalPages,
        nextPage: response.data.pagination.nextPage || null,
        prevPage: response.data.pagination.prevPage || null,
      }));
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/products/${id}`);

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      toast(response.data.message || "Product deleted successfully!");
      loadProducts({ page: pagination.page, searchQuery, categoryFilter });
    } catch (error: any) {
      console.log(error);

      if (error.response.data.error.message)
        toast(error.response.data.error.message);
    }
  };

  const handleUpdate = async (data: any, type: string) => {
    if (!selectedItem) return;

    console.log(`Updating ${type} for product ${selectedItem._id}:`, data);

    try {
      if (type === "media") {
        if (data.mediaToDelete.length > 0) {
          const response = await api.delete(
            `/products/${selectedItem._id}/${type}`,
            { data: { urls: data.mediaToDelete } }
          );

          if (!response.data.success)
            throw new Error(response.data.error.message);

          toast(
            response?.data?.message || "Product media delete is successful!"
          );
        }

        if (data.newMedia.length > 0) {
          const formData = new FormData();

          // Append images
          data.newMedia.forEach((media: any) => {
            if (media.file) {
              formData.append("media", media.file);
            }
          });

          const urlsResponse = await api.post(`/products/media`, formData, {
            params: { slug: selectedItem.slug },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (!urlsResponse.data.success) {
            throw new Error(
              urlsResponse.data.error.message || "Something with wrong!"
            );
          }

          const updateResponse = await api.patch(
            `/products/${selectedItem._id}/media`,
            {
              urls: urlsResponse.data.data,
            }
          );

          if (!updateResponse.data.success) {
            throw new Error(
              updateResponse.data.error.message || "Something with wrong!"
            );
          }

          toast(
            urlsResponse?.data?.message || "Product media upload successful!"
          );
          toast(
            updateResponse?.data?.message ||
              "Product updated with media urls successful!"
          );
        }
      } else {
        const response = await api.patch(
          `/products/${selectedItem._id}/${type}`,
          data
        );

        toast(response?.data?.message || "Product media delete is successful!");
      }

      loadProducts({ page: pagination.page, searchQuery, categoryFilter });

      form.reset({
        slug: "",
        name: "",
        title: "",
        origin: "",
        category: "",
        isPopular: false,
        visibility: true,
        season: "",
        lowStockThreshold: 20,
        unit: {
          price: 0,
          costPerItem: 0,
          stockQuantity: 0,
          averageWeightPerFruit: "",
        },
      });
    } catch (error: any) {
      console.log(error);
    } finally {
      // Close the dialog
      switch (type) {
        case "unit":
          setUnitOpen(false);
          break;
        case "general":
          setGeneralOpen(false);
          break;
        case "category":
          setCategoryOpen(false);
          break;
        case "visibility":
          setVisibilityOpen(false);
          break;
        case "media":
          setMediaOpen(false);
          break;
        case "delete":
          setDeleteOpen(false);
          break;
      }
    }
  };

  const getStockPercentage = (product: IProduct) => {
    // Calculate percentage based on a reasonable maximum (e.g., 5x the low stock threshold)
    const maxExpected = product.lowStockThreshold * 5;
    const percentage = (product.unit.stockQuantity / maxExpected) * 100;
    return Math.min(percentage, 100); // Cap at 100%
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
    loadProducts({ page: pagination.page, searchQuery, categoryFilter });
  }, [pagination.page, searchQuery, categoryFilter]);

  return {
    products,
    getStockPercentage,
    unitOpen,
    setUnitOpen,
    generalOpen,
    setGeneralOpen,
    deleteOpen,
    setDeleteOpen,
    categoryOpen,
    setCategoryOpen,
    visibilityOpen,
    setVisibilityOpen,
    mediaOpen,
    setMediaOpen,
    selectedItem,
    setSelectedItem,
    pagination,
    setPagination,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    handleDelete,
    handleUpdate,
    hadnleSubmit,
    handleImageUpload,
    removeImage,
    form,
    isLoading,
    images,
  };
}

export default useProduct;
