"use client";

import Link from "next/link";
import { Footer } from "@/components/footer";
import { CheckoutForm } from "@/components/checkout-form";
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
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  Phone,
  Mail,
  ArrowRight,
  Home,
  CalendarClock,
  Clock,
  Copy,
  CheckCircle2,
  Truck,
} from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
  // In a real app, this would be fetched from a global state or API
  const subtotal = 3500;
  const [copied, setCopied] = useState(false);

  // Sample order data
  const order = {
    id: "ORD-12345678",
    date: "May 2, 2023",
    status: "Processing",
    estimatedDelivery: "May 4-5, 2023",
    paymentMethod: "Cash on Delivery",
    items: [
      {
        id: 1,
        name: "Himshagor Mango",
        price: 350,
        quantity: 5,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 4,
        name: "Pure Honey",
        price: 650,
        quantity: 5,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    shipping: {
      address: "123 Main Street, Dhaka, Bangladesh",
      cost: 70,
    },
    subtotal: 5000,
    total: 5070,
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Sample error data
  const error = {
    code: "ERR-PAYMENT-01",
    message: "Payment processing failed",
    details:
      "We couldn&apos;t process your payment. This could be due to insufficient funds, incorrect card details, or a temporary issue with the payment gateway.",
    orderReference: "REF-87654321",
  };

  // return (
  //   <div className="flex min-h-screen flex-col">
  //     <main className="flex-1 bg-muted/30">
  //       <div className="container mx-auto px-4 py-12">
  //         <div className="mx-auto max-w-3xl">
  //           {/* Success Message */}
  //           <div className="mb-8 text-center">
  //             <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
  //               <CheckCircle2 className="h-10 w-10" />
  //             </div>
  //             <h1 className="text-3xl font-bold mb-2">
  //               Order Placed Successfully!
  //             </h1>
  //             <p className="text-muted-foreground">
  //               Thank you for your order. We&apos;ll have received your order and will
  //               begin processing it soon.
  //             </p>
  //           </div>

  //           {/* Order Details Card */}
  //           <Card className="mb-8">
  //             <CardHeader className="pb-4">
  //               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  //                 <div>
  //                   <CardTitle className="text-xl">
  //                     Order #{order.id.split("-")[1]}
  //                   </CardTitle>
  //                   <CardDescription>Placed on {order.date}</CardDescription>
  //                 </div>
  //                 <div className="flex items-center gap-2">
  //                   <span className="text-sm text-muted-foreground">
  //                     Order ID: {order.id}
  //                   </span>
  //                   <Button
  //                     variant="ghost"
  //                     size="icon"
  //                     className="h-8 w-8"
  //                     onClick={copyOrderId}
  //                     title="Copy Order ID"
  //                   >
  //                     <Copy className="h-4 w-4" />
  //                     <span className="sr-only">Copy Order ID</span>
  //                   </Button>
  //                   {copied && (
  //                     <span className="text-xs text-primary">Copied!</span>
  //                   )}
  //                 </div>
  //               </div>
  //             </CardHeader>
  //             <CardContent className="pb-4">
  //               <div className="grid gap-6 md:grid-cols-3">
  //                 <div className="flex flex-col gap-1">
  //                   <span className="text-sm font-medium">Order Status</span>
  //                   <div className="flex items-center gap-2">
  //                     <span className="inline-flex h-2 w-2 rounded-full bg-yellow-500"></span>
  //                     <span>{order.status}</span>
  //                   </div>
  //                 </div>
  //                 <div className="flex flex-col gap-1">
  //                   <span className="text-sm font-medium">Payment Method</span>
  //                   <span>{order.paymentMethod}</span>
  //                 </div>
  //                 <div className="flex flex-col gap-1">
  //                   <span className="text-sm font-medium">
  //                     Estimated Delivery
  //                   </span>
  //                   <span>{order.estimatedDelivery}</span>
  //                 </div>
  //               </div>

  //               <Separator className="my-6" />

  //               <div className="space-y-4">
  //                 <h3 className="font-medium">Order Summary</h3>
  //                 {order.items.map((item) => (
  //                   <div key={item.id} className="flex items-center gap-4">
  //                     <div className="relative h-16 w-16 overflow-hidden rounded border">
  //                       <Image
  //                         src={item.image || "/placeholder.svg"}
  //                         alt={item.name}
  //                         fill
  //                         className="object-cover"
  //                       />
  //                     </div>
  //                     <div className="flex-1">
  //                       <h4 className="font-medium">{item.name}</h4>
  //                       <p className="text-sm text-muted-foreground">
  //                         {item.quantity}kg x ৳{item.price}/kg
  //                       </p>
  //                     </div>
  //                     <div className="text-right">
  //                       <p className="font-medium">
  //                         ৳{item.price * item.quantity}
  //                       </p>
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>

  //               <Separator className="my-6" />

  //               <div className="space-y-2">
  //                 <div className="flex justify-between">
  //                   <span>Subtotal</span>
  //                   <span>৳{order.subtotal}</span>
  //                 </div>
  //                 <div className="flex justify-between">
  //                   <span>Shipping</span>
  //                   <span>৳{order.shipping.cost}</span>
  //                 </div>
  //                 <Separator className="my-2" />
  //                 <div className="flex justify-between font-bold">
  //                   <span>Total</span>
  //                   <span>৳{order.total}</span>
  //                 </div>
  //               </div>
  //             </CardContent>
  //             <CardFooter className="flex flex-col items-start">
  //               <h3 className="font-medium mb-2">Delivery Address</h3>
  //               <p className="text-muted-foreground">
  //                 {order.shipping.address}
  //               </p>
  //             </CardFooter>
  //           </Card>

  //           {/* What's Next Card */}
  //           <Card className="mb-8">
  //             <CardHeader>
  //               <CardTitle>What&apos;s Next?</CardTitle>
  //             </CardHeader>
  //             <CardContent className="pb-4">
  //               <div className="grid gap-6 md:grid-cols-3">
  //                 <div className="flex flex-col items-center text-center gap-2">
  //                   <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
  //                     <Clock className="h-6 w-6" />
  //                   </div>
  //                   <h3 className="font-medium">Order Processing</h3>
  //                   <p className="text-sm text-muted-foreground">
  //                     We&apos;re preparing your order for shipment. This usually
  //                     takes 6-12 hours.
  //                   </p>
  //                 </div>
  //                 <div className="flex flex-col items-center text-center gap-2">
  //                   <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
  //                     <Truck className="h-6 w-6" />
  //                   </div>
  //                   <h3 className="font-medium">Shipping</h3>
  //                   <p className="text-sm text-muted-foreground">
  //                     Your order will be shipped within 24 hours. You&apos;ll receive
  //                     a notification.
  //                   </p>
  //                 </div>
  //                 <div className="flex flex-col items-center text-center gap-2">
  //                   <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
  //                     <CalendarClock className="h-6 w-6" />
  //                   </div>
  //                   <h3 className="font-medium">Delivery</h3>
  //                   <p className="text-sm text-muted-foreground">
  //                     Expected delivery is {order.estimatedDelivery}. We&apos;ll keep
  //                     you updated.
  //                   </p>
  //                 </div>
  //               </div>
  //             </CardContent>
  //           </Card>

  //           {/* Action Buttons */}
  //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
  //             <Link href="/order/track" className="flex-1">
  //               <Button variant="outline" className="w-full">
  //                 Track Order
  //                 <ArrowRight className="ml-2 h-4 w-4" />
  //               </Button>
  //             </Link>
  //             <Link href="/" className="flex-1">
  //               <Button className="w-full bg-primary hover:bg-primary/90">
  //                 <Home className="mr-2 h-4 w-4" />
  //                 Continue Shopping
  //               </Button>
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     </main>
  //   </div>
  // );

  // return (
  //   <div className="flex min-h-screen flex-col">
  //     <main className="flex-1 bg-muted/30">
  //       <div className="container mx-auto px-4 py-12">
  //         <div className="mx-auto max-w-2xl">
  //           {/* Error Message */}
  //           <div className="mb-8 text-center">
  //             <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-destructive/20 text-destructive mb-4">
  //               <AlertCircle className="h-10 w-10" />
  //             </div>
  //             <h1 className="text-3xl font-bold mb-2">
  //               Order Processing Failed
  //             </h1>
  //             <p className="text-muted-foreground">
  //               We&apos;re sorry, but we couldn&apos;t complete your order. Please review
  //               the details below.
  //             </p>
  //           </div>

  //           {/* Error Details Card */}
  //           <Card className="mb-8 border-destructive/50">
  //             <CardHeader className="pb-4">
  //               <CardTitle className="text-xl">Error Details</CardTitle>
  //               <CardDescription>Error Code: {error.code}</CardDescription>
  //             </CardHeader>
  //             <CardContent className="pb-4">
  //               <div className="space-y-4">
  //                 <div>
  //                   <h3 className="font-medium mb-1">{error.message}</h3>
  //                   <p className="text-muted-foreground">{error.details}</p>
  //                 </div>

  //                 <Separator />

  //                 <div>
  //                   <h3 className="font-medium mb-2">Possible Reasons:</h3>
  //                   <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
  //                     <li>Insufficient funds in your account</li>
  //                     <li>Incorrect card information</li>
  //                     <li>Your bank declined the transaction</li>
  //                     <li>Temporary issue with our payment system</li>
  //                     <li>Network connectivity issues during checkout</li>
  //                   </ul>
  //                 </div>
  //               </div>
  //             </CardContent>
  //             <CardFooter className="flex flex-col items-start">
  //               <p className="text-sm text-muted-foreground">
  //                 Reference ID: {error.orderReference}
  //               </p>
  //             </CardFooter>
  //           </Card>

  //           {/* What to Do Next Card */}
  //           <Card className="mb-8">
  //             <CardHeader>
  //               <CardTitle>What to Do Next?</CardTitle>
  //             </CardHeader>
  //             <CardContent>
  //               <div className="space-y-4">
  //                 <div>
  //                   <h3 className="font-medium mb-1">Try Again</h3>
  //                   <p className="text-sm text-muted-foreground">
  //                     You can try placing your order again. Your cart items have
  //                     been saved.
  //                   </p>
  //                 </div>

  //                 <div>
  //                   <h3 className="font-medium mb-1">
  //                     Use a Different Payment Method
  //                   </h3>
  //                   <p className="text-sm text-muted-foreground">
  //                     Try using a different card or payment method when you
  //                     checkout again.
  //                   </p>
  //                 </div>

  //                 <div>
  //                   <h3 className="font-medium mb-1">Contact Your Bank</h3>
  //                   <p className="text-sm text-muted-foreground">
  //                     If the problem persists, contact your bank to ensure there
  //                     are no restrictions on your card.
  //                   </p>
  //                 </div>

  //                 <div>
  //                   <h3 className="font-medium mb-1">
  //                     Contact Our Support Team
  //                   </h3>
  //                   <p className="text-sm text-muted-foreground">
  //                     Our customer service team is ready to assist you with
  //                     completing your order.
  //                   </p>
  //                   <div className="flex flex-col sm:flex-row gap-4 mt-4">
  //                     <Button
  //                       variant="outline"
  //                       className="flex items-center gap-2"
  //                     >
  //                       <Phone className="h-4 w-4" />
  //                       <span>01xxxxxxxx</span>
  //                     </Button>
  //                     <Button
  //                       variant="outline"
  //                       className="flex items-center gap-2"
  //                     >
  //                       <Mail className="h-4 w-4" />
  //                       <span>support@shuddhoghor.com</span>
  //                     </Button>
  //                   </div>
  //                 </div>
  //               </div>
  //             </CardContent>
  //           </Card>

  //           {/* Action Buttons */}
  //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
  //             <Link href="/cart" className="flex-1">
  //               <Button variant="outline" className="w-full">
  //                 <ArrowLeft className="mr-2 h-4 w-4" />
  //                 Return to Cart
  //               </Button>
  //             </Link>
  //             <Link href="/checkout" className="flex-1">
  //               <Button className="w-full bg-primary hover:bg-primary/90">
  //                 <RefreshCw className="mr-2 h-4 w-4" />
  //                 Try Again
  //               </Button>
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     </main>
  //   </div>
  // );

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
          <CheckoutForm subtotal={subtotal} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
