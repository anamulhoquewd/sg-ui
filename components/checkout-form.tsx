"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

interface CheckoutFormProps {
  subtotal: number;
}

export function CheckoutForm({ subtotal }: CheckoutFormProps) {
  const [shippingMethod, setShippingMethod] = useState("inside-dhaka");
  const shippingCost = shippingMethod === "inside-dhaka" ? 70 : 150;
  const total = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted");
    // Implement order submission
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your full name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea
                id="address"
                placeholder="Enter your full address"
                required
              />
            </div>
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
            <div className="grid gap-2">
              <Label htmlFor="note">Order Note (Optional)</Label>
              <Textarea
                id="note"
                placeholder="Any special instructions for your order"
              />
            </div>
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
              <span>${total}</span>
            </div>
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Place Order
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
