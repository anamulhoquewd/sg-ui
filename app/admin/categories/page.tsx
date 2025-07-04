"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Trash2,
  Eye,
  ListIcon as Category,
  Edit,
  ImageIcon,
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
import UpdateDialog from "./_component/update-dialog";
import NewCategory from "./_component/new-category-dialog";
import { DeleteDialog } from "../_components/delete-dialong";
import { toast } from "sonner";
import useCategory from "./_hook/useCategory";
import { UploadAvatar } from "@/components/upload-avatar";
import Image from "next/image";

export default function Categories() {
  const {
    pagination,
    setPagination,
    setSearch,
    search,
    categories,
    selectedItem,
    setSelectedItem,
    deleteDialogOpen,
    setDeleteDialogOpen,
    setUpdateDialogOpen,
    updateDialogOpen,
    handleDelete,
    newDialogOpen,
    setNewDialogOpen,
    handleSubmit,
    handleUpdate,
    form,
    isLoading,
    error,
    setError,
    uploadHandler,
    isAvatarOpen,
    setIsAvatarOpen,
  } = useCategory();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage your categories.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setNewDialogOpen(true)}
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
                  <TableHead>Image</TableHead>
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
                  categories.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell>
                        <div className="relative h-10 w-10 overflow-hidden rounded-md">
                          <Image
                            src={
                              category?.avatar ||
                              "https://placehold.jp/250x250.png?text=Media"
                            }
                            alt={category?.avatar || category?.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{category?.name}</TableCell>
                      <TableCell>{category?.slug}</TableCell>
                      <TableCell>
                        {category?.description || "No description available"}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 cursor-pointer"
                            onClick={() => {
                              setIsAvatarOpen(true);
                              setSelectedItem(category);
                            }}
                          >
                            <ImageIcon className="h-3.5 w-3.5" />
                            <span className="sr-only">Edit General</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 cursor-pointer"
                              >
                                <MoreHorizontal className="h-3.5 w-3.5" />
                                <span className="sr-only">More Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedItem(category);
                                  setUpdateDialogOpen(true);
                                }}
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
                                onClick={() => {
                                  setSelectedItem(category);
                                  setDeleteDialogOpen(true);
                                }}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Category
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
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
        open={newDialogOpen}
        changeOpen={setNewDialogOpen}
        onSubmit={handleSubmit}
        form={form}
        isLoading={isLoading}
      />

      <UploadAvatar
        collection={{
          name: selectedItem?.name ?? "John Doe",
          avatar: selectedItem?.avatar ?? "",
        }}
        error={error}
        setError={setError}
        uploadHandler={uploadHandler}
        isAvatarOpen={isAvatarOpen}
        setIsAvatarOpen={setIsAvatarOpen}
      />

      {/* Dialogs for updating different parts of the category */}
      {selectedItem && (
        <>
          <UpdateDialog
            form={form}
            onSubmit={handleUpdate}
            open={updateDialogOpen}
            changeOpen={setUpdateDialogOpen}
            isLoading={isLoading}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />

          <DeleteDialog
            onConfirm={() => handleDelete(selectedItem._id)}
            open={deleteDialogOpen}
            changeOpen={setDeleteDialogOpen}
          />
        </>
      )}
    </div>
  );
}
