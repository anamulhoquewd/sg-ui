"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import OrderSummary from "@/components/order-summary";
import { useStoreActions, useStoreState } from "easy-peasy";
import { IProduct } from "@/interfaces/products";

export default function CartPage() {
  const [shippingMethod, setShippingMethod] = useState("inside-dhaka");

  const shippingCost = shippingMethod === "inside-dhaka" ? 70 : 150;

  const productsState = useStoreState(
    (state: { carts: { [key: string]: IProduct } }) => state.carts
  );
  const products = productsState ? Object.values(productsState.data) : [];

  const removeItemFromCart = useStoreActions(
    (actions: any) => actions.carts.removeItem
  );
  const updateQuantity = useStoreActions(
    (actions: any) => actions.carts.updateQuantity
  );

  const subtotal = products.reduce((acc, curr) => {
    return (acc += curr.quantity * curr.unit.price);
  }, 0);
  const total = subtotal + shippingCost;

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

        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/products">Start Shopping</Link>
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
                    {products.map((product) => {
                      return (
                        <div
                          key={product?._id}
                          className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                        >
                          <div className="flex-shrink-0 w-20 h-20 relative rounded overflow-hidden">
                            <Image
                              src={product?.media.url || "/placeholder.svg"}
                              alt={product?.media.alt || product?.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium">{product?.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {product?.title}
                            </p>
                            <span className="text-xl font-bold">
                              {`$${product?.unit.price}`}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {` / ${product?.unit.unitType}`}
                            </span>
                          </div>

                          <div className="flex items-center gap-10">
                            <div className="flex items-center border border-primary rounded-[10px]">
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={product?.quantity <= 1}
                                className="rounded-tr-none rounded-br-none cursor-pointer"
                                onClick={() =>
                                  updateQuantity({
                                    id: product._id,
                                    quantity: product.quantity - 1,
                                  })
                                }
                              >
                                <Minus className="h-4 w-4" />
                                <span className="sr-only">
                                  Decrease quantity
                                </span>
                              </Button>
                              <div className="flex items-end gap-0.5">
                                <span className="text-xl font-bold">
                                  {product?.quantity}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {`/${product?.unit.unitType}`}
                                </span>
                              </div>
                              <Button
                                disabled={
                                  product?.quantity >=
                                  product.unit.stockQuantity
                                }
                                size="icon"
                                variant="ghost"
                                className="rounded-tl-none rounded-bl-none cursor-pointer"
                                onClick={() =>
                                  updateQuantity({
                                    id: product._id,
                                    quantity: product.quantity + 1,
                                  })
                                }
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">
                                  Increase quantity
                                </span>
                              </Button>
                            </div>

                            <span className="font-medium">
                              ৳{product?.unit.price * product?.quantity}
                            </span>

                            <div className="flex items-center justify-between w-full sm:justify-end gap-4">
                              <Button
                                variant="destructive"
                                size="sm"
                                className="text-white cursor-pointer"
                                onClick={() => removeItemFromCart(product?._id)}
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
