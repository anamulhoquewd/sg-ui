import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  Truck,
  CheckCircle2,
  ClipboardCheck,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  Search,
  AlertCircle,
} from "lucide-react";

export function OrderTracking({
  orderIdInput,
  setOrderIdInput,
  emailInput,
  setEmailInput,
  phoneInput,
  setPhoneInput,
  isTracking,
  handleTrackOrder,
  setTrackingMethod,
  error,
  order,
  setIsTracking,
  getStatusIcon,
  getStatusColor,
}: any) {
  return (
    <main className="flex-1 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
            <p className="text-muted-foreground">
              Enter your order details below to track the status of your
              delivery
            </p>
          </div>

          {!isTracking ? (
            <Card>
              <CardHeader>
                <CardTitle>Order Lookup</CardTitle>
                <CardDescription>
                  Please enter your order ID and either your email address or
                  phone number
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrackOrder} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="orderId">Order ID</Label>
                    <Input
                      id="orderId"
                      placeholder="e.g. ORD-12345678"
                      value={orderIdInput}
                      onChange={(e) => setOrderIdInput(e.target.value)}
                    />
                  </div>

                  <Tabs defaultValue="email" onValueChange={setTrackingMethod}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="email">Track with Email</TabsTrigger>
                      <TabsTrigger value="phone">Track with Phone</TabsTrigger>
                    </TabsList>
                    <TabsContent value="email" className="space-y-2 pt-4">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                      />
                    </TabsContent>
                    <TabsContent value="phone" className="space-y-2 pt-4">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                      />
                    </TabsContent>
                  </Tabs>

                  {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{error}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Track Order
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Order Status Overview */}
              <Card className="mb-8">
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">
                        Order #{order.id.split("-")[1]}
                      </CardTitle>
                      <CardDescription>Placed on {order.date}</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsTracking(false)}
                    >
                      Track Another Order
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-muted/50 rounded-lg">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                      {order.status === "ordered" && (
                        <ClipboardCheck className="h-8 w-8" />
                      )}
                      {order.status === "processing" && (
                        <Package className="h-8 w-8" />
                      )}
                      {order.status === "shipped" && (
                        <Truck className="h-8 w-8" />
                      )}
                      {order.status === "delivered" && (
                        <CheckCircle2 className="h-8 w-8" />
                      )}
                    </div>
                    <div className="text-center md:text-left">
                      <h2 className="text-2xl font-bold mb-1">
                        {order.statusText}
                      </h2>
                      <p className="text-muted-foreground">
                        Estimated delivery:{" "}
                        <span className="font-medium">
                          {order.estimatedDelivery}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Order Timeline */}
                  <div className="mt-8">
                    <h3 className="font-medium mb-6">Order Progress</h3>
                    <div className="relative">
                      {/* Vertical line connecting timeline items */}
                      <div className="absolute left-6 top-0 h-full w-0.5 bg-muted"></div>

                      <div className="space-y-8">
                        {order.timeline.map((item, index) => (
                          <div key={index} className="relative flex gap-4">
                            <div
                              className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${getStatusColor(
                                item.completed
                              )}`}
                            >
                              {getStatusIcon(item.status)}
                            </div>
                            <div className="flex flex-col pt-1">
                              <h4 className="font-medium capitalize">
                                {item.status}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                              <p className="text-sm">
                                {item.date} • {item.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Delivery Updates */}
                  {order.status === "shipped" && (
                    <div className="mt-8">
                      <h3 className="font-medium mb-4">Delivery Updates</h3>
                      <Card>
                        <CardContent className="p-0">
                          <div className="divide-y">
                            {order.deliveryUpdates.map((update, index) => (
                              <div key={index} className="p-4">
                                <div className="flex justify-between mb-1">
                                  <span className="font-medium">
                                    {update.location}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    {update.date} • {update.time}
                                  </span>
                                </div>
                                <p className="text-sm">{update.status}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Shipping Information */}
                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-medium mb-2">Shipping Information</h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">Delivery Address</p>
                              <p className="text-sm text-muted-foreground">
                                {order.shipping.address}
                              </p>
                            </div>
                          </div>
                          {order.status === "shipped" && (
                            <div className="flex items-start gap-3 mt-4">
                              <Truck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium">Courier</p>
                                <p className="text-sm text-muted-foreground">
                                  {order.shipping.courier}
                                </p>
                                <p className="text-sm">
                                  Tracking #:{" "}
                                  <span className="font-medium">
                                    {order.shipping.trackingNumber}
                                  </span>
                                </p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Need Help?</h3>
                      <Card>
                        <CardContent className="p-4 space-y-4">
                          <p className="text-sm">
                            If you have any questions or concerns about your
                            order, please contact us:
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              className="flex items-center justify-start gap-2"
                            >
                              <Phone className="h-4 w-4" />
                              <span>01xxxxxxxx</span>
                            </Button>
                            <Button
                              variant="outline"
                              className="flex items-center justify-start gap-2"
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>Live Chat</span>
                            </Button>
                            <Button
                              variant="outline"
                              className="flex items-center justify-start gap-2 col-span-2"
                            >
                              <Mail className="h-4 w-4" />
                              <span>support@shuddhoghor.com</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Order Items */}
                    <div>
                      <h3 className="font-medium mb-4">Items in Your Order</h3>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4"
                          >
                            <div className="relative h-16 w-16 overflow-hidden rounded border">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.quantity}kg x ৳{item.price}/kg
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                ৳{item.price * item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Order Summary */}
                    <div>
                      <h3 className="font-medium mb-4">Order Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>৳{order.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>৳{order.shipping.cost}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>৳{order.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/">Continue Shopping</Link>
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90" asChild>
                    <Link href="/contact">
                      Contact Support
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
