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
import { AlertCircle, ArrowLeft, Mail, Phone, RefreshCw } from "lucide-react";
import Link from "next/link";
import React from "react";

function OrderFailed({ error }: { error: any }) {
  return (
    <div className="flex min-h-screen flex-col mt-26">
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-2xl">
            {/* Error Message */}
            <div className="mb-8 text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-destructive/20 text-destructive mb-4">
                <AlertCircle className="h-10 w-10" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                Order Processing Failed
              </h1>
              <p className="text-muted-foreground">
                We&apos;re sorry, but we couldn&apos;t complete your order.
                Please review the details below.
              </p>
            </div>

            {/* Error Details Card */}
            <Card className="mb-8 border-destructive/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Error Details</CardTitle>
                <CardDescription>Error Code: {error.code}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1 text-destructive">
                      {error.message}
                    </h3>
                    {/* <p className="text-muted-foreground">{error.details}</p> */}
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Possible Reasons:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Insufficient funds in your account</li>
                      <li>Incorrect card information</li>
                      <li>Your bank declined the transaction</li>
                      <li>Temporary issue with our payment system</li>
                      <li>Network connectivity issues during checkout</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              {/* <CardFooter className="flex flex-col items-start">
                <p className="text-sm text-muted-foreground">
                  Reference ID: {error.orderReference}
                </p>
              </CardFooter> */}
            </Card>

            {/* What to Do Next Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>What to Do Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Try Again</h3>
                    <p className="text-sm text-muted-foreground">
                      You can try placing your order again. Your cart items have
                      been saved.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">
                      Use a Different Payment Method
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Try using a different card or payment method when you
                      checkout again.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">Contact Your Bank</h3>
                    <p className="text-sm text-muted-foreground">
                      If the problem persists, contact your bank to ensure there
                      are no restrictions on your card.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">
                      Contact Our Support Team
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Our customer service team is ready to assist you with
                      completing your order.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        <span>01xxxxxxxx</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        <span>support@shuddhoghor.com</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cart" className="flex-1">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Cart
                </Button>
              </Link>
              <Link href="/checkout" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderFailed;
