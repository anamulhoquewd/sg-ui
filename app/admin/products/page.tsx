"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Package,
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
import { CategoryDialog } from "./_components/category-dialog";
import { VisibilityDialog } from "./_components/visibility-dialog";
import { MediaDialog } from "./_components/media-dialog";
import { Progress } from "@/components/ui/progress";
import Paginations from "@/components/pagination";
import { DeleteDialog } from "../_components/delete-dialong";
import { IProduct } from "@/interfaces/products";
import useProduct from "./_hook/useProduct";
import useCategory from "../categories/_hook/useCategory";

export default function ProductsPage() {
  const openDialog = (product: any, dialogType: string) => {
    setSelectedItem(product);
    switch (dialogType) {
      case "unit":
        setUnitOpen(true);
        break;
      case "general":
        setGeneralOpen(true);
        break;
      case "category":
        setCategoryOpen(true);
        break;
      case "visibility":
        setVisibilityOpen(true);
        break;
      case "media":
        setMediaOpen(true);
        break;
      case "delete":
        setDeleteOpen(true);
        break;
      default:
        console.error("Unknown dialog type:", dialogType);
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

  const { categories } = useCategory();
  const {
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
    products,
    handleDelete,
    handleUpdate,
  } = useProduct();

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
            You have {pagination.total} products in your inventory.
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
                  products.map((product: IProduct) => {
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
                              alt={product?.media[0]?.alt || product?.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>
                            <div>{product.name}</div>
                            <Link
                              target="_blank"
                              href={`/products/${product.slug}`}
                            >
                              <div className="text-xs text-muted-foreground inline">
                                {product.slug}
                              </div>
                            </Link>
                          </div>
                        </TableCell>
                        <TableCell>{product?.category.name}</TableCell>
                        <TableCell className="text-right">
                          <div>{product.unit.price.toLocaleString()}</div>
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
                                <DropdownMenuItem
                                  onClick={() => openDialog(product, "delete")}
                                  className="text-destructive"
                                >
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
        {products.length !== 0 && (
          <CardFooter className="flex items-center justify-end">
            <Paginations
              pagination={pagination}
              setPagination={setPagination}
            />
          </CardFooter>
        )}
      </Card>

      {/* Dialogs for updating different parts of the product */}
      {selectedItem && (
        <>
          <UnitDialog
            open={unitOpen}
            onOpenChange={setUnitOpen}
            product={selectedItem}
            onUpdate={(data) => handleUpdate(data, "unit")}
          />

          <GeneralDialog
            open={generalOpen}
            onOpenChange={setGeneralOpen}
            product={selectedItem}
            onUpdate={(data) => handleUpdate(data, "general")}
          />

          <CategoryDialog
            open={categoryOpen}
            onOpenChange={setCategoryOpen}
            product={selectedItem}
            categories={categories}
            onUpdate={(data) => handleUpdate(data, "category")}
          />

          <VisibilityDialog
            open={visibilityOpen}
            onOpenChange={setVisibilityOpen}
            product={selectedItem}
            onUpdate={(data) => handleUpdate(data, "visibility")}
          />

          <MediaDialog
            open={mediaOpen}
            onOpenChange={setMediaOpen}
            product={selectedItem}
            onUpdate={(data) => handleUpdate(data, "media")}
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
