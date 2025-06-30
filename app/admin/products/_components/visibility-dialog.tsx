"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye } from "lucide-react";

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
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const visibilityFormSchema = z.object({
  visibility: z.boolean(),
  isPopular: z.boolean(),
});

type VisibilityFormValues = z.infer<typeof visibilityFormSchema>;

interface VisibilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: any;
  onUpdate: (data: VisibilityFormValues) => void;
}

export function VisibilityDialog({
  open,
  onOpenChange,
  product,
  onUpdate,
}: VisibilityDialogProps) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<VisibilityFormValues>({
    resolver: zodResolver(visibilityFormSchema),
    defaultValues: {
      visibility: product?.visibility || false,
      isPopular: product?.isPopular || false,
    },
  });

  const onSubmit = async (data: VisibilityFormValues) => {
    setIsPending(true);
    try {
      onUpdate(data);
    } catch (error) {
      console.error("Error updating visibility settings:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Update Visibility
          </DialogTitle>
          <DialogDescription>
            Change visibility settings for {product?.name}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Visibility</FormLabel>
                    <FormDescription>
                      Make this product visible on your store
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPopular"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Popular Product</FormLabel>
                    <FormDescription>
                      Mark as a popular product to highlight in featured
                      sections
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Visibility"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
