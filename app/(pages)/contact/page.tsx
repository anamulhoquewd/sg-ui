"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  Twitter,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the form data to your backend
    console.log({ name, email, subject, message });

    // Show success message
    setSubmitted(true);

    // Reset form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");

    // Hide success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="flex min-h-screen flex-col mt-26">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/10 py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions about our products or services? We&apos;re here to
              help. Reach out to us using any of the methods below.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">Call Us</CardTitle>
                  <CardDescription>Available 9am to 9pm</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">01xxxxxxxx</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    For orders and inquiries
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">Email Us</CardTitle>
                  <CardDescription>
                    We&apos;ll respond within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">info@shuddhoghor.com</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    For general inquiries
                  </p>
                  <p className="font-medium mt-2">support@shuddhoghor.com</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    For customer support
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">Visit Us</CardTitle>
                  <CardDescription>Our office location</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">123 Fruit Street, Gulshan</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Dhaka, Bangladesh
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Mon-Sat: 9am - 9pm
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form and Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                {submitted && (
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-4 rounded-lg flex items-center gap-2 mb-6">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>
                      Your message has been sent successfully. We&apos;ll get
                      back to you soon!
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What is this regarding?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Find Us</h2>
                <div className="rounded-lg overflow-hidden border h-[400px] bg-muted">
                  <iframe
                    src="https://maps.app.goo.gl/mABBJTPfXSkQ6A9o8"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Shuddhoghor Office Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Other Ways to Connect
            </h2>

            <Tabs defaultValue="social" className="max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="faq">FAQs</TabsTrigger>
              </TabsList>

              <TabsContent
                value="social"
                className="p-6 bg-background rounded-lg mt-6"
              >
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-4">
                    Follow Us on Social Media
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Stay updated with our latest products, offers, and news by
                    following us on social media.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex items-center gap-2"
                    >
                      <Facebook className="h-5 w-5" />
                      <span>Facebook</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex items-center gap-2"
                    >
                      <Instagram className="h-5 w-5" />
                      <span>Instagram</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex items-center gap-2"
                    >
                      <Twitter className="h-5 w-5" />
                      <span>Twitter</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="faq"
                className="p-6 bg-background rounded-lg mt-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-medium mb-2">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-muted-foreground">
                    Find answers to common questions about our products,
                    shipping, and more.
                  </p>
                </div>
                <div className="text-center">
                  <Link href="/faq">
                    <Button className="bg-primary hover:bg-primary/90">
                      View All FAQs
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  );
}
