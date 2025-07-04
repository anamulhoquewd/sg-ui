"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Home,
  CalendarClock,
  Clock,
  Copy,
  CheckCircle2,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import {
  getPaymentStatusBadge,
  getStatusBadge,
} from "@/app/admin/orders/_components/status-dialog";

function OrderSuccess({ response }: { response: any }) {
  const [copied, setCopied] = useState(false);

  const copyOrderId = () => {
    navigator.clipboard.writeText(response._id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  console.warn(response);

  return (
    <div className="flex min-h-screen flex-col mt-26">
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl">
            {/* Success Message */}
            <div className="mb-8 text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                Order Placed Successfully!
              </h1>
              <p className="text-muted-foreground">
                Thank you for your order. We&apos;ll have received your order
                and will begin processing it soon.
              </p>
            </div>

            {/* Order Details Card */}
            <Card className="mb-8">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">
                      Order #{response._id.split("-")[1]}
                    </CardTitle>
                    <CardDescription>
                      Placed on {format(new Date(response.createdAt), "Pp")}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Order ID: {response._id}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={copyOrderId}
                      title="Copy Order ID"
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy Order ID</span>
                    </Button>
                    {copied && (
                      <span className="text-xs text-primary">Copied!</span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">Order Status</span>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-2 w-2 rounded-full bg-yellow-500"></span>
                      {getStatusBadge(response.status)}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">Payment Status</span>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-2 w-2 rounded-full bg-yellow-500"></span>
                      {getPaymentStatusBadge(response.paymentStatus)}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      Estimated Delivery
                    </span>
                    <span>next 2 to 3 days</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="font-medium">Order Summary</h3>
                  {response.items.map((item: any) => (
                    <div key={item.product} className="flex items-center gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} x ${item.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${response.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${response.shippingCost}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${response.subtotal + response.shippingCost}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <h3 className="font-medium mb-2">Delivery Address</h3>
                <p className="text-muted-foreground">{response.address}</p>
              </CardFooter>
            </Card>

            {/* What's Next Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>What&apos;s Next?</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Clock className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium">Order Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      We&apos;re preparing your order for shipment. This usually
                      takes 6-12 hours.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Truck className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium">Shipping</h3>
                    <p className="text-sm text-muted-foreground">
                      Your order will be shipped within 24 hours. You&apos;ll
                      receive a notification.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <CalendarClock className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium">Delivery</h3>
                    <p className="text-sm text-muted-foreground">
                      Expected delivery is 2 to 3 days. We&apos;ll keep you
                      updated.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/order/track" className="flex-1">
                <Button variant="outline" className="w-full">
                  Track Order
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Home className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderSuccess;
