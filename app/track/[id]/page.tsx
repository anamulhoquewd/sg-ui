"use client";

import { useState } from "react";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ClipboardCheck,
} from "lucide-react";
import { OrderTracking } from "@/components/order-tracking";

export default function OrderTrackingPage() {
  const [orderIdInput, setOrderIdInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [trackingMethod, setTrackingMethod] = useState("email");
  const [error, setError] = useState("");

  // Sample order data - in a real app, this would come from an API call
  const order = {
    id: "ORD-12345678",
    date: "May 2, 2023",
    status: "shipped",
    statusText: "Your order is on the way",
    estimatedDelivery: "May 4-5, 2023",
    paymentMethod: "Cash on Delivery",
    customer: {
      name: "Rahim Ahmed",
      email: "rahim@example.com",
      phone: "01712345678",
    },
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
      courier: "Fast Delivery Express",
      trackingNumber: "FDE1234567890",
    },
    subtotal: 5000,
    total: 5070,
    timeline: [
      {
        status: "ordered",
        date: "May 2, 2023",
        time: "10:30 AM",
        description: "Order placed successfully",
        completed: true,
      },
      {
        status: "processing",
        date: "May 2, 2023",
        time: "2:45 PM",
        description: "Order confirmed and processing",
        completed: true,
      },
      {
        status: "shipped",
        date: "May 3, 2023",
        time: "11:15 AM",
        description: "Order shipped via Fast Delivery Express",
        completed: true,
      },
      {
        status: "delivered",
        date: "Estimated",
        time: "May 4-5, 2023",
        description: "Delivery to your address",
        completed: false,
      },
    ],
    deliveryUpdates: [
      {
        date: "May 3, 2023",
        time: "11:15 AM",
        location: "Dhaka Central Hub",
        status: "Package has left the warehouse",
      },
      {
        date: "May 3, 2023",
        time: "4:30 PM",
        location: "Dhaka Distribution Center",
        status: "Package arrived at sorting facility",
      },
      {
        date: "May 3, 2023",
        time: "7:45 PM",
        location: "Dhaka Local Hub",
        status: "Package is out for delivery",
      },
    ],
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!orderIdInput) {
      setError("Please enter your order ID");
      return;
    }

    if (trackingMethod === "email" && !emailInput) {
      setError("Please enter your email address");
      return;
    }

    if (trackingMethod === "phone" && !phoneInput) {
      setError("Please enter your phone number");
      return;
    }

    // In a real app, you would make an API call here to fetch the order details
    // For this demo, we'll just set isTracking to true to show the order details
    setError("");
    setIsTracking(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ordered":
        return <ClipboardCheck className="h-6 w-6" />;
      case "processing":
        return <Package className="h-6 w-6" />;
      case "shipped":
        return <Truck className="h-6 w-6" />;
      case "delivered":
        return <CheckCircle2 className="h-6 w-6" />;
      default:
        return <Clock className="h-6 w-6" />;
    }
  };

  const getStatusColor = (completed: boolean) => {
    return completed
      ? "text-primary bg-primary/20"
      : "text-muted-foreground bg-muted";
  };

  return (
    <div className="flex min-h-screen flex-col mt-26">
      <OrderTracking
        {...{
          order,
          getStatusIcon,
          getStatusColor,
          setIsTracking,
          setTrackingMethod,
          setOrderIdInput,
          setEmailInput,
          setPhoneInput,
          handleTrackOrder,
          error,
          isTracking,
          trackingMethod,
          orderIdInput,
          emailInput,
          phoneInput,
        }}
      />
    </div>
  );
}
