"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Minus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import OrderSummary from "@/components/order-summary";

// Sample product data
const products = [
  {
    id: 1,
    name: "Himshagor",
    price: 350,
    image: "https://ghorerbazar.com/cdn/shop/files/Lachcha_Semai_500gm.jpg",
    popular: true,
    description: "Sweet and juicy mango variety",
  },
  {
    id: 2,
    name: "Rupali",
    price: 400,
    image: "/placeholder.svg?height=300&width=300",
    popular: true,
    description: "Aromatic and flavorful mango",
  },
  {
    id: 3,
    name: "Bari 4",
    price: 380,
    image: "https://ghorerbazar.com/cdn/shop/files/Lachcha_Semai_500gm.jpg",
    popular: false,
    description: "Large, fiberless mango variety",
  },
  {
    id: 4,
    name: "Pure Honey",
    price: 650,
    image: "/placeholder.svg?height=300&width=300",
    popular: true,
    description: "100% pure natural honey",
  },
];

export default function CartPage() {
  // In a real app, this would be fetched from a global state or API
  const [cartItems, setCartItems] = useState<
    { id: number; quantity: number }[]
  >([
    { id: 1, quantity: 5 },
    { id: 4, quantity: 5 },
    { id: 2, quantity: 6 },
  ]);

  const [shippingMethod, setShippingMethod] = useState("inside-dhaka");
  const [subtotal, setSubtotal] = useState(0);

  const shippingCost = shippingMethod === "inside-dhaka" ? 70 : 150;
  const total = subtotal + shippingCost;

  const increaseQuantity = (productId: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 5 } : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(5, item.quantity - 5);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.id);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
    setSubtotal(total);
  }, [cartItems]);

  return (
    <div className="flex min-h-screen flex-col mt-26">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link
            href="/products"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="text-2xl font-bold ml-auto">Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="border-b">
                  <CardTitle>Cart Items</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {cartItems.map((item) => {
                      const product = products.find((p) => p.id === item.id);
                      if (!product) return null;

                      return (
                        <div
                          key={item.id}
                          className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                        >
                          <div className="flex-shrink-0 w-20 h-20 relative rounded overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {product.description}
                            </p>
                            <p className="text-primary font-medium mt-1">
                              ৳{product.price}/kg
                            </p>
                          </div>

                          <div className="flex items-center gap-10">
                            <div className="flex items-center border border-primary rounded-[10px]">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => decreaseQuantity(item.id)}
                                disabled={item.quantity <= 5}
                                className="rounded-tr-none rounded-br-none cursor-pointer"
                              >
                                <Minus className="h-4 w-4" />
                                <span className="sr-only">
                                  Decrease quantity
                                </span>
                              </Button>
                              <span className="w-12 text-center">
                                {item.quantity}kg
                              </span>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => increaseQuantity(item.id)}
                                className="rounded-tl-none rounded-bl-none cursor-pointer"
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">
                                  Increase quantity
                                </span>
                              </Button>
                            </div>

                            <span className="font-medium">
                              ৳{product.price * item.quantity}
                            </span>

                            <div className="flex items-center justify-between w-full sm:justify-end gap-4">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="text-white cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
            <OrderSummary
              {...{ subtotal, shippingMethod, setShippingMethod, total }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
