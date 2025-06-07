"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Package,
  Percent,
  ListIcon as Category,
  EyeIcon,
  EyeOff,
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

import { UnitDialog } from "./_components/unit-dialog";
import { GeneralDialog } from "./_components/general-dialog";
import { DiscountDialog } from "./_components/discount-dialog";
import { CategoryDialog } from "./_components/category-dialog";
import { VisibilityDialog } from "./_components/visibility-dialog";
import { MediaDialog } from "./_components/media-dialog";
import { Progress } from "@/components/ui/progress";
import api from "@/axios/interceptor";
import Paginations from "@/components/pagination";
import { defaultPagination } from "@/utils/details";
import { handleAxiosError } from "@/utils/error";

export interface Pagination {
  page: number;
  total: number;
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
}

// Sample product data based on the provided structure
const dameProducts = [
  {
    unit: {
      unitType: "piece",
      originalPrice: 1003,
      costPerItem: 50,
      stockQuantity: 140,
      averageWeightPerFruit: "",
      price: 1003,
    },
    discount: {
      discountType: "percentage",
      discountValue: 12,
      discountExp: "2025-06-03T18:00:00.000Z",
    },
    _id: "683b57940ea47011056dd3a5",
    slug: "new-product4",
    name: "this is new product",
    title: "this is new product",
    media: [
      {
        alt: "new-product4",
        url: "https://sg-products.s3.eu-north-1.amazonaws.com/products/new-product4/ChatGPT-Image-May-6,-2025,-08_34_13-PM-1748719496394.jpeg",
      },
      {
        alt: "new-product4",
        url: "https://sg-products.s3.eu-north-1.amazonaws.com/products/new-product4/man-holding-pile-clean-clothes-1748719496394.jpeg",
      },
      {
        alt: "new-product4",
        url: "https://sg-products.s3.eu-north-1.amazonaws.com/products/new-product4/1747387386983-1748719496394.jpeg",
      },
    ],
    status: "lowStock",
    visibility: true,
    isPopular: false,
    lowStockThreshold: 5,
    category: {
      _id: "683b512551d36051b14f1f49",
      slug: "pomegranate",
      name: "Pomegranate",
      shortDescription: "This is very popular item in bangladesh now.",
      createdAt: "2025-05-31T18:57:41.136Z",
      updatedAt: "2025-05-31T18:57:41.136Z",
      __v: 0,
    },
    createdAt: "2025-05-31T19:25:08.630Z",
    updatedAt: "2025-05-31T19:25:08.630Z",
    __v: 0,
  },
  {
    unit: {
      unitType: "piece",
      originalPrice: 1003,
      costPerItem: 50,
      stockQuantity: 140,
      averageWeightPerFruit: "",
      price: 1003,
    },
    discount: {
      discountType: "percentage",
      discountValue: 12,
      discountExp: "2025-06-03T18:00:00.000Z",
    },
    _id: "683b56db91f6d2ad979e9d97",
    slug: "new-product2",
    name: "this is new product",
    title: "this is new product",
    media: [
      {
        alt: "new-product2",
        url: "https://sg-products.s3.eu-north-1.amazonaws.com/products/new-product2/ChatGPT-Image-May-6,-2025,-08_34_13-PM-1748719309922.jpeg",
      },
      {
        alt: "new-product2",
        url: "https://sg-products.s3.eu-north-1.amazonaws.com/products/new-product2/man-holding-pile-clean-clothes-1748719309922.jpeg",
      },
      {
        alt: "new-product2",
        url: "https://sg-products.s3.eu-north-1.amazonaws.com/products/new-product2/1747387386983-1748719309922.jpeg",
      },
    ],
    status: "lowStock",
    visibility: true,
    isPopular: false,
    lowStockThreshold: 5,
    category: {
      _id: "683b512551d36051b14f1f49",
      slug: "pomegranate",
      name: "Pomegranate",
      shortDescription: "This is very popular item in bangladesh now.",
      createdAt: "2025-05-31T18:57:41.136Z",
      updatedAt: "2025-05-31T18:57:41.136Z",
      __v: 0,
    },
    createdAt: "2025-05-31T19:22:03.674Z",
    updatedAt: "2025-05-31T19:22:03.674Z",
    __v: 0,
  },
  {
    unit: {
      unitType: "piece",
      originalPrice: 1003,
      costPerItem: 50,
      stockQuantity: 140,
      averageWeightPerFruit: "",
      price: 1003,
    },
    _id: "683b558bcfba0bfcfd78e2f7",
    slug: "new-product",
    name: "this is new product",
    title: "this is new product",
    media: [
      {
        alt: "new-product",
        url: "https://sg-products.s3.eu-north-1.amazonaws.com/products/new-product/ChatGPT-Image-May-6,-2025,-08_34_13-PM-1748718975177.jpeg",
      },
      {
        alt: "new-product",
        url: "https://sg-products.s3.eu-north-1.amazonaws.com/products/new-product/man-holding-pile-clean-clothes-1748718975177.jpeg",
      },
      {
        alt: "new-product",
        url: "https://sg-products.s3.eu-north-1.amazonaws.com/products/new-product/1747387386983-1748718975177.jpeg",
      },
    ],
    status: "lowStock",
    visibility: true,
    isPopular: false,
    lowStockThreshold: 5,
    category: {
      _id: "683b512551d36051b14f1f49",
      slug: "pomegranate",
      name: "Pomegranate",
      shortDescription: "This is very popular item in bangladesh now.",
      createdAt: "2025-05-31T18:57:41.136Z",
      updatedAt: "2025-05-31T18:57:41.136Z",
      __v: 0,
    },
    createdAt: "2025-05-31T19:16:27.888Z",
    updatedAt: "2025-05-31T19:16:27.888Z",
    __v: 0,
  },
  {
    unit: {
      unitType: "kg",
      originalPrice: 4200,
      costPerItem: 10,
      stockQuantity: 20,
      averageWeightPerFruit: "",
      price: 4200,
    },
    _id: "683b4ec05c7ce09de19ebba5",
    slug: "mango",
    name: "Mango",
    title: "sdfsfsfsfs",
    origin: "hhdhd",
    shortDescription: "fsdfsdfsfsfsfsdfsfsdf",
    longDescription: "sdfsdfsdfsdfsdfsfsfsfsdfsdfsdsfsfsfsdfsdfsdfsdfsdfsdf",
    media: [
      {
        alt: "mango",
        url: "https://sg-products.s3.eu-north-1.amazonaws.com/products/mango/man-holding-pile-clean-clothes-1748717240819.jpeg",
        _id: "683b4ec05c7ce09de19ebba6",
      },
      {
        alt: "mango",
        url: "https://sg-products.s3.eu-north-1.amazonaws.com/products/mango/1747387386983-1748717240819.jpeg",
        _id: "683b4ec05c7ce09de19ebba7",
      },
    ],
    status: "inStock",
    visibility: true,
    season: "dfdfh",
    isPopular: false,
    lowStockThreshold: 69,
    category: {
      _id: "6836aa9148cc37b282d69ac2",
      slug: "mangos",
      name: "Mango",
      shortDescription: "This is very popular item in bangladesh now.",
      createdAt: "2025-05-28T06:17:53.977Z",
      updatedAt: "2025-05-28T06:17:53.977Z",
      __v: 0,
    },
    createdAt: "2025-05-31T18:47:28.397Z",
    updatedAt: "2025-05-31T18:47:28.397Z",
    __v: 0,
  },
];

// Category data for dropdown
const dameCategories = [
  { _id: "683b512551d36051b14f1f49", name: "Mangoes" },
  { _id: "683b512551d36051b14f1f50", name: "Honey" },
  { _id: "683b512551d36051b14f1f51", name: "Bundles" },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState(dameCategories);
  const [products, setProducts] = useState(dameProducts);
  const [pagination, setPagination] = useState<Pagination>(defaultPagination);

  // Dialog states
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [unitDialogOpen, setUnitDialogOpen] = useState(false);
  const [generalDialogOpen, setGeneralDialogOpen] = useState(false);
  const [discountDialogOpen, setDiscountDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [visibilityDialogOpen, setVisibilityDialogOpen] = useState(false);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);

  // Fetch products
  const getProducts = async ({
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
    } catch (error) {
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    // Fetch categories
    const getCategorires = async () => {
      try {
        const response = await api.get("/categories", {
          params: { limit: 1000 },
        });

        if (!response.data.success) {
          throw new Error(
            response.data.error.message || "Something with wrong!"
          );
        }

        setCategories(response.data.data);
      } catch (error) {
        handleAxiosError(error);
      }
    };

    getCategorires();
  }, []);

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
    getProducts({ page: pagination.page, searchQuery, categoryFilter });
  }, [pagination.page, searchQuery, categoryFilter]);

  const openDialog = (product: any, dialogType: string) => {
    setSelectedProduct(product);
    switch (dialogType) {
      case "unit":
        setUnitDialogOpen(true);
        break;
      case "general":
        setGeneralDialogOpen(true);
        break;
      case "discount":
        setDiscountDialogOpen(true);
        break;
      case "category":
        setCategoryDialogOpen(true);
        break;
      case "visibility":
        setVisibilityDialogOpen(true);
        break;
      case "media":
        setMediaDialogOpen(true);
        break;
    }
  };

  const handleUpdateProduct = async (data: any, type: string) => {
    console.log(`Updating ${type} for product ${selectedProduct._id}:`, data);
    // Here you would make an API call to update the product
    // After successful update, you would refresh the product list

    console.log("Data: ", data);
    console.log("Type: ", type);

    try {
      const response = await api.patch(
        `/products/${selectedProduct._id}/${type}`,
        data
      );

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      getProducts({ page: pagination.page, searchQuery, categoryFilter });
    } catch (error) {
      handleAxiosError(error);
    } finally {
      // Close the dialog
      switch (type) {
        case "unit":
          setUnitDialogOpen(false);
          break;
        case "general":
          setGeneralDialogOpen(false);
          break;
        case "discount":
          setDiscountDialogOpen(false);
          break;
        case "category":
          setCategoryDialogOpen(false);
          break;
        case "visibility":
          setVisibilityDialogOpen(false);
          break;
        case "media":
          setMediaDialogOpen(false);
          break;
      }
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "inStock":
        return "default";
      case "lowStock":
        return "outline";
      case "outOfStock":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case "inStock":
        return "In Stock";
      case "lowStock":
        return "Low Stock";
      case "outOfStock":
        return "Out of Stock";
      default:
        return status;
    }
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const getStockPercentage = (product: any) => {
    // Calculate percentage based on a reasonable maximum (e.g., 5x the low stock threshold)
    const maxExpected = product.lowStockThreshold * 5;
    const percentage = (product.unit.stockQuantity / maxExpected) * 100;
    return Math.min(percentage, 100); // Cap at 100%
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory, prices, and categories.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>
            You have {products.length} products in your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category: { name: string; _id: string }) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead className="w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No products found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => {
                    // Image
                    const mediaUrl =
                      product.media[0]?.url ||
                      "https://placehold.jp/250x250.png?text=Media";
                    return (
                      <TableRow key={product._id}>
                        <TableCell>
                          <div className="relative h-10 w-10 overflow-hidden rounded-md">
                            <Image
                              src={mediaUrl}
                              alt={product.media[0]?.alt || product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>
                            <div>{product.name}</div>
                            <Link href={`/products/${product.slug}`}>
                              <div className="text-xs text-muted-foreground">
                                {product.slug}
                              </div>
                            </Link>
                          </div>
                        </TableCell>
                        <TableCell>{product?.category.name}</TableCell>
                        <TableCell className="text-right">
                          <div>
                            {formatPrice(product.unit.price)}
                            {product.unit.price <
                              product.unit.originalPrice && (
                              <div className="text-xs text-muted-foreground line-through">
                                {formatPrice(product.unit.originalPrice)}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className=" space-y-1.5">
                            <div>
                              {product.unit.stockQuantity +
                                " " +
                                product.unit.unitType}
                            </div>

                            <div className="flex flex-col items-end gap-1">
                              <div className="w-16">
                                <Progress
                                  value={getStockPercentage(product)}
                                  className={
                                    "h-1.5 " +
                                    (product.unit.stockQuantity === 0 &&
                                      "bg-red-500")
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusBadgeVariant(product.status)}
                          >
                            {formatStatus(product.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {product.visibility ? (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              <EyeIcon className="mr-1 h-3 w-3" />
                              Visible
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-gray-50 text-gray-700 border-gray-200"
                            >
                              <EyeOff className="mr-1 h-3 w-3" />
                              Hidden
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => openDialog(product, "general")}
                            >
                              <Edit className="h-3.5 w-3.5" />
                              <span className="sr-only">Edit General</span>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreHorizontal className="h-3.5 w-3.5" />
                                  <span className="sr-only">More Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => openDialog(product, "unit")}
                                >
                                  <Package className="mr-2 h-4 w-4" />
                                  Update Unit Info
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    openDialog(product, "discount")
                                  }
                                >
                                  <Percent className="mr-2 h-4 w-4" />
                                  Update Discount
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    openDialog(product, "category")
                                  }
                                >
                                  <Category className="mr-2 h-4 w-4" />
                                  Update Category
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    openDialog(product, "visibility")
                                  }
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  Update Visibility
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => openDialog(product, "media")}
                                >
                                  <Image
                                    className="mr-2 h-4 w-4"
                                    width={16}
                                    height={16}
                                    alt="Media"
                                    src={mediaUrl}
                                  />
                                  Manage Media
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Product
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Product
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-end">
          <Paginations pagination={pagination} setPagination={setPagination} />
        </CardFooter>
      </Card>

      {/* Dialogs for updating different parts of the product */}
      {selectedProduct && (
        <>
          <UnitDialog
            open={unitDialogOpen}
            onOpenChange={setUnitDialogOpen}
            product={selectedProduct}
            onUpdate={(data) => handleUpdateProduct(data, "unit")}
          />

          <GeneralDialog
            open={generalDialogOpen}
            onOpenChange={setGeneralDialogOpen}
            product={selectedProduct}
            onUpdate={(data) => handleUpdateProduct(data, "general")}
          />

          <DiscountDialog
            open={discountDialogOpen}
            onOpenChange={setDiscountDialogOpen}
            product={selectedProduct}
            onUpdate={(data) => handleUpdateProduct(data, "discount")}
          />

          <CategoryDialog
            open={categoryDialogOpen}
            onOpenChange={setCategoryDialogOpen}
            product={selectedProduct}
            categories={categories}
            onUpdate={(data) => handleUpdateProduct(data, "category")}
          />

          <VisibilityDialog
            open={visibilityDialogOpen}
            onOpenChange={setVisibilityDialogOpen}
            product={selectedProduct}
            onUpdate={(data) => handleUpdateProduct(data, "visibility")}
          />

          <MediaDialog
            open={mediaDialogOpen}
            onOpenChange={setMediaDialogOpen}
            product={selectedProduct}
            onUpdate={(data) => handleUpdateProduct(data, "media")}
          />
        </>
      )}
    </div>
  );
}
