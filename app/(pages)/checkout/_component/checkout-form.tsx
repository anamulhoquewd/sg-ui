"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { Button } from "../../../../components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

interface Props {
  subtotal: number;
  onSubmit: (data: FormValues) => void;
  shippingMethod: string;
  setShippingMethod: (shippingMethod: string) => void;
  shippingCost: number;
  isLoading: boolean;
}

const customerFormSchema = z.object({
  name: z.string().min(3).max(50),
  phone: z
    .string()
    .regex(
      /^01\d{9}$/,
      "Phone number must start with 01 and be exactly 11 digits"
    ),
  address: z.string().min(3).max(100),
});

export type FormValues = z.infer<typeof customerFormSchema>;

export function CheckoutForm({
  subtotal,
  onSubmit,
  shippingMethod,
  setShippingMethod,
  shippingCost,
  isLoading,
}: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: { name: "", phone: "", address: "" },
  });

  const handleSubmit = (data: FormValues) => {
    try {
      onSubmit(data);

      form.reset({
        name: "",
        phone: "",
        address: "",
      });
    } catch (error: any) {
      if (error.response.data.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="cursor-pointer">Full Name</FormLabel>
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
                  <FormLabel className="cursor-pointer">Phone Number</FormLabel>
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
                    Delivery Address
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-2">
              <Label>Shipping Method</Label>
              <RadioGroup
                value={shippingMethod}
                onValueChange={setShippingMethod}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inside-dhaka" id="inside-dhaka" />
                  <Label
                    htmlFor="inside-dhaka"
                    className="flex justify-between w-full"
                  >
                    <span>Inside Dhaka</span>
                    <span>$70</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="outside-dhaka" id="outside-dhaka" />
                  <Label
                    htmlFor="outside-dhaka"
                    className="flex justify-between w-full"
                  >
                    <span>Outside Dhaka</span>
                    <span>$150</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${subtotal + shippingCost}</span>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ordering in...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
