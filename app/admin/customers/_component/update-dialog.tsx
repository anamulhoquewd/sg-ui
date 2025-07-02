"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ListIcon as Category, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ICustomer } from "@/interfaces/users";
import { FormValues } from "../_hook/useCustomer";

interface Props {
  form: any;
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
  open: boolean;
  changeOpen: (open: boolean) => void;
  selectedItem: ICustomer;
  setSelectedItem: (selectedItem: ICustomer | null) => void;
}

export default function UpdateDialog({
  form,
  onSubmit,
  isLoading,
  open,
  changeOpen,
  selectedItem,
  setSelectedItem,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        changeOpen(isOpen);
        if (!isOpen) setSelectedItem(null);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Update Customers
          </DialogTitle>
          <DialogDescription>
            Change the customer for {selectedItem?.name}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="cursor-pointer">
                    Customer Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Type name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="cursor-pointer">
                    Custoemr phone
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Type phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="cursor-pointer">
                    Custoemr address
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Type address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  changeOpen(false);
                  setSelectedItem(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
