"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Trash2,
  Eye,
  ListIcon as Category,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/axios/interceptor";
import Paginations from "@/components/pagination";
import { defaultPagination } from "@/utils/details";
import { handleAxiosError } from "@/utils/error";
import { toast } from "sonner";
import UpdateDialog from "./_component/update-dialog";
import DeleteDialog from "./_component/delete-dialog";
import NewCategory from "./_component/new-category-dialog";

export interface Pagination {
  page: number;
  total: number;
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
}

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState<Pagination>(defaultPagination);

  // Dialog states
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [newCategoryDialogOpen, setNewCategoryDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch categories
  const loadCategories = async ({
    searchQuery,
    page = 1,
  }: {
    searchQuery: string;
    page: number;
  }) => {
    try {
      const response = await api.get("/categories", {
        params: {
          search: searchQuery,
          page,
        },
      });
      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      setCategories(response.data.data);

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
    const timer = setTimeout(() => {
      setSearchQuery(search);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    loadCategories({ page: pagination.page, searchQuery });
  }, [pagination.page, searchQuery]);

  const openDialog = (category: any, dialogType: string) => {
    setSelectedCategory(category);
    switch (dialogType) {
      case "update":
        setUpdateDialogOpen(true);
        break;
      case "delete":
        setDeleteDialogOpen(true);
        break;
      default:
        console.error("Unknown dialog type:", dialogType);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/categories/${id}`);

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      toast(response?.data?.message || "Product deleted successfully!");
      loadCategories({ page: pagination.page, searchQuery });
    } catch (error) {
      handleAxiosError(error);
      console.error("Error deleting category:", error);
    } finally {
      // Close the dialog
      setSelectedCategory(null);
      setDeleteDialogOpen;
    }
  };

  const handleUpdate = async (data: any) => {
    console.log(`Updating for category ${selectedCategory._id}:`, data);
    // Here you would make an API call to update the category
    // After successful update, you would refresh the category list

    try {
      const response = await api.put(
        `/categories/${selectedCategory._id}`,
        data
      );

      toast(response?.data?.message || "Category updated successful!");

      loadCategories({ page: pagination.page, searchQuery });
    } catch (error) {
      handleAxiosError(error);
      console.error("Error updating category:", error);
    } finally {
      // Close the dialog
      setSelectedCategory(null);
      setUpdateDialogOpen(false);
    }
  };

  const handleSubmit = async (data: any) => {
    console.log("Creating new category with data:", data);
    try {
      const response = await api.post("/categories/register", data);

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something went wrong!");
      }

      toast(response?.data?.message || "Category created successfully!");
      loadCategories({ page: pagination.page, searchQuery });
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      // Close the dialog
      setNewCategoryDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage your categories.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setNewCategoryDialogOpen(true)}
            className="bg-primary hover:bg-primary/90 cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories Management</CardTitle>
          <CardDescription>
            You have {pagination.total} categories in your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
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
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No categories found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map(
                    (category: {
                      _id: string;
                      name: string;
                      slug: string;
                      description: string | null;
                    }) => (
                      <TableRow key={category._id}>
                        <TableCell>{category?.name}</TableCell>
                        <TableCell>{category?.slug}</TableCell>
                        <TableCell>
                          {category?.description || "No description available"}
                        </TableCell>
                        <TableCell>
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
                                onClick={() => openDialog(category, "update")}
                              >
                                <Category className="mr-2 h-4 w-4" />
                                Update Category
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Category
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => openDialog(category, "delete")}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Category
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {categories.length !== 0 && (
          <CardFooter className="flex items-center justify-end">
            <Paginations
              pagination={pagination}
              setPagination={setPagination}
            />
          </CardFooter>
        )}
      </Card>

      <NewCategory
        open={newCategoryDialogOpen}
        onOpenChange={setNewCategoryDialogOpen}
        onSubmit={(data) => handleSubmit(data)}
      />

      {/* Dialogs for updating different parts of the category */}
      {selectedCategory && (
        <>
          <UpdateDialog
            open={updateDialogOpen}
            onOpenChange={setUpdateDialogOpen}
            category={selectedCategory}
            onUpdate={(data) => handleUpdate(data)}
          />

          <DeleteDialog
            onConfirm={() => handleDelete(selectedCategory._id)}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          />
        </>
      )}
    </div>
  );
}
