"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ListIcon as Category } from "lucide-react";

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
import { FormValues } from "../_hook/useCategory";
import { ICategory } from "@/interfaces/categories";

interface Props {
  form: any;
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
  open: boolean;
  changeOpen: (open: boolean) => void;
  selectedItem: ICategory;
  setSelectedItem: (selectedItem: ICategory | null) => void;
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
            <Category className="h-5 w-5" />
            Update Category
          </DialogTitle>
          <DialogDescription>
            Change the category for {selectedItem?.name}.
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
                    Category Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Type name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name displayed in categroy listings
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="cursor-pointer">
                    Category Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter category description"
                      className="min-h-16"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The description displayed in category listings
                  </FormDescription>
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
