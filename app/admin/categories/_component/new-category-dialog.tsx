"use client";

import { ListIcon } from "lucide-react";

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

interface Props {
  form: any;
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
  open: boolean;
  changeOpen: (open: boolean) => void;
}

export default function NewCategory({
  form,
  onSubmit,
  isLoading,
  open,
  changeOpen,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ListIcon className="h-5 w-5" />
            New Category
          </DialogTitle>
          <DialogDescription>Create a new category.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="cursor-pointer">
                    category Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Type name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name displayed in category listings
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="cursor-pointer">
                    Category Slug
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Type slug" {...field} />
                  </FormControl>
                  <FormDescription>
                    The unique identifier for the category
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
                onClick={() => changeOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
