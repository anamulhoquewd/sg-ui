import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";

export function CustomerHelpSection() {
  return (
    <section className="bg-primary/5 py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-center">Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Phone className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Call Us</CardTitle>
                <CardDescription>Available 9am to 9pm</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our customer service team is ready to assist you with any
                questions.
              </p>
              <Link href="tel:017xxxxxxxx">
                <Button className="w-full cursor-pointer">017xxxxxxxx</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Mail className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Email Us</CardTitle>
                <CardDescription>24/7 email support</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Send us an email and we&apos;ll get back to you within 24 hours.
              </p>
              <Link href="mailto:support@shuddhoghor.com">
                <Button className="w-full cursor-pointer">
                  support@shuddhoghor.com
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <MessageSquare className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>Instant assistance</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Chat with our support team for immediate assistance with your
                orders.
              </p>

              <Link href="#">
                <Button className="w-full cursor-pointer bg-primary hover:bg-primary/90">
                  Start Chat
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
