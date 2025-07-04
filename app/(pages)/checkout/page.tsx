"use client";

import Link from "next/link";
import { CheckoutForm, FormValues } from "./_component/checkout-form";
import { ArrowLeft } from "lucide-react";
import OrderSuccess from "./_component/order-success";
import OrderFailed from "./_component/order-failed";
import { useStoreActions, useStoreState } from "easy-peasy";
import { IProduct } from "@/interfaces/products";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/axios/interceptor";
import { toast } from "sonner";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const method = searchParams.get("shipping-method");
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState<
    { type: "success"; response: any } | { type: "error"; error: any } | null
  >(null);

  const [shippingMethod, setShippingMethod] = useState("inside-dhaka");
  const shippingCost = shippingMethod === "inside-dhaka" ? 70 : 150;
  const productsState = useStoreState(
    (state: { carts: { [key: string]: IProduct } }) => state.carts
  );
  const products = productsState ? Object.values(productsState.data) : [];
  const subtotal = products.reduce((acc, curr) => {
    return (acc += curr.quantity * curr.unit.price);
  }, 0);
  const clearCart = useStoreActions((actions: any) => actions.carts.clearData);

  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const response = await api.post("orders", {
        items: products.map((p) => ({ product: p._id, quantity: p.quantity })),
        ...data,
        deliveryCost: shippingCost,
      });

      if (!response.data.success) {
        setOrderStatus({
          type: "error",
          error: response.data.error.message ?? {
            message: "Somthing went wrong!",
            code: 500,
          },
        });
        return;
      }

      toast(response.data.message || "Order created successfully!");
      setOrderStatus({
        type: "success",
        response: { ...response.data.data, subtotal, shippingCost },
      });
      clearCart();

      setTimeout(() => {
        router.push("/");
      }, 10000);
    } catch (error: any) {
      setOrderStatus({ type: "error", error: error.response.data.error });
      console.error("Order failed:", error);

      setTimeout(() => {
        router.push("/");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setShippingMethod(method || "");
  }, [method]);

  // return <OrderSuccess order={order} />;
  // return <OrderFailed error={error} />;

  if (orderStatus?.type === "success") {
    return <OrderSuccess response={orderStatus.response} />;
  }

  if (orderStatus?.type === "error") {
    return <OrderFailed error={orderStatus.error} />;
  }

  return (
    <div className="flex min-h-screen flex-col mt-26">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link
            href="/cart"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
          <h1 className="text-2xl font-bold ml-auto">Checkout</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <CheckoutForm
            shippingCost={shippingCost}
            setShippingMethod={setShippingMethod}
            shippingMethod={shippingMethod}
            subtotal={subtotal}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}
