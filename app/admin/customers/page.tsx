"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Plus, MoreHorizontal, Trash2, User } from "lucide-react";

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

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/axios/interceptor";
import { defaultPagination } from "@/utils/details";
import Paginations, { Pagination } from "@/components/pagination";
import { DeleteDialog } from "../_components/delete-dialong";
import { ICustomer } from "@/interfaces/users";
import useCustomer from "./_hook/useCustomer";
import UpdateDialog from "./_component/update-dialog";

export default function CustomersPage() {
  const {
    pagination,
    setPagination,
    search,
    setSearch,
    selectedItem,
    setSelectedItem,
    setDeleteOpen,
    deleteOpen,
    handleDelete,
    customers,
    setUpdateOpen,
    updateOpen,
    handleUpdate,
    isLoading,
    form,
  } = useCustomer();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage customers.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>
            You have {pagination.total} customers in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search customers..."
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No products found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  customers.map((admin: ICustomer) => (
                    <TableRow key={admin._id}>
                      <TableCell>{admin?.name}</TableCell>
                      <TableCell>{admin?.phone}</TableCell>
                      <TableCell>
                        {admin?.address || "No address available"}
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
                              className="cursor-pointer"
                              onClick={() => {
                                setUpdateOpen(true);
                                setSelectedItem(admin);
                              }}
                            >
                              <User className="mr-2 h-4 w-4" />
                              Update Customer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setDeleteOpen(true);
                                setSelectedItem(admin);
                              }}
                              className="text-destructive cursor-pointer"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Customer
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
        {customers.length !== 0 && (
          <CardFooter className="flex items-center justify-end">
            <Paginations
              pagination={pagination}
              setPagination={setPagination}
            />
          </CardFooter>
        )}

        {selectedItem && (
          <>
            <UpdateDialog
              open={updateOpen}
              changeOpen={setUpdateOpen}
              onSubmit={handleUpdate}
              form={form}
              isLoading={isLoading}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
            <DeleteDialog
              onConfirm={() => handleDelete(selectedItem._id)}
              open={deleteOpen}
              changeOpen={setDeleteOpen}
            />
          </>
        )}
      </Card>
    </div>
  );
}
