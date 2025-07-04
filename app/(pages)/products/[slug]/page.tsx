"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  Truck,
  Shield,
  Clock,
  Package,
  Home,
  Search,
} from "lucide-react";
import api from "@/axios/interceptor";
import { Input } from "@/components/ui/input";
import { IProduct } from "@/interfaces/products";
import { useStoreActions } from "easy-peasy";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

// Loading component
function ProductPageSkeleton() {
  return (
    <div className="flex min-h-screen flex-col mt-26">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-6 w-32 mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <div className="flex gap-4">
                <Skeleton className="h-20 w-20 rounded-md" />
                <Skeleton className="h-20 w-20 rounded-md" />
                <Skeleton className="h-20 w-20 rounded-md" />
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-4">
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 flex-1" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Product Not Found component
function ProductNotFound({ slug }: { slug: string }) {
  return (
    <div className="flex min-h-screen flex-col mt-26">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back button */}
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to products
          </Link>

          {/* Not Found Content */}
          <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="mb-8">
              <Package className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
              <p className="text-lg text-muted-foreground mb-2">
                Sorry, we couldn't find the product "{slug}" you're looking for.
              </p>
              <p className="text-muted-foreground">
                It may have been removed, renamed, or is temporarily
                unavailable.
              </p>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Home className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Go Home</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Return to our homepage to explore all categories
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/">Go to Homepage</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Package className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Browse Products</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Discover our full range of fresh products
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    <Link href="/products">View All Products</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Search className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Search Products</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Try searching for what you need
                  </p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search products..."
                      className="flex-1"
                    />
                    <Button size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Popular Products Suggestion */}
            <div className="w-full max-w-4xl">
              <h2 className="text-2xl font-semibold mb-6">
                You might also like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <Card
                    key={item}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                        <Package className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium mb-1">
                        Sample Product {item}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Fresh and organic
                      </p>
                      <p className="font-semibold text-primary">$2.99 / lb</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Main Product Page Component
export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const loadProduct = async () => {
    setLoading(true);
    try {
      setError(null);
      const response = await api.get(`/products/${slug}`);

      if (!response.data.success) {
        throw new Error("Product not found");
      }
      setProduct(response.data.data);
    } catch (error: any) {
      console.error("Error fetching product:", error);
      setError(error.response.data.error.message || "Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [slug]);

  // Show loading state
  if (loading) {
    return <ProductPageSkeleton />;
  }

  // Show error state (product not found)
  if (error || !product) {
    return <ProductNotFound slug={slug} />;
  }

  const increaseQuantity = () => {
    if (quantity < product?.unit?.stockQuantity) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addItem = useStoreActions((actions: any) => actions.carts.addItem);
  const addItemToCart = (product: IProduct, quantity: number = 1) => {
    addItem({
      name: product.name,
      media: { url: product.media[0].url, alt: product.media[0].alt },
      title: product.title,
      unit: {
        price: product.unit.price,
        stockQuantity: product.unit.stockQuantity,
        unitType: product.unit.unitType,
      },
      quantity,
      _id: product._id,
    });
    toast("Product added to cart.");
  };

  // Show product details
  return (
    <div className="flex min-h-screen flex-col mt-26">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back button */}
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to products
          </Link>

          {/* Product details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border">
                <Image
                  src={
                    product.media[selectedImage]?.url ||
                    "/placeholder.svg?height=500&width=500"
                  }
                  alt={product.media[selectedImage]?.alt || "Product Image"}
                  fill
                  className="object-cover"
                  priority
                />
                {product.isPopular && (
                  <Badge className="absolute top-4 left-4 bg-primary">
                    Popular
                  </Badge>
                )}
              </div>
              {product.media && product.media.length > 1 && (
                <div className="flex gap-4 overflow-auto pb-2">
                  {product.media.map((image, index) => (
                    <button
                      key={index}
                      className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                        selectedImage === index ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={image.url || "/placeholder.svg?height=80&width=80"}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="text-2xl font-bold text-primary mb-4">
                <span className="text-xl font-bold">
                  ${product.unit.price.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {" / "}
                  {product.unit.unitType}
                </span>
              </div>
              <p className="text-muted-foreground mb-6">
                {product.shortDescription || "No description available."}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-primary rounded-[10px]">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="rounded-tr-none rounded-br-none cursor-pointer"
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>

                  <div className="flex items-end gap-0.5">
                    <span className="text-xl font-bold">{quantity}</span>
                    <span className="text-sm text-muted-foreground">
                      {`/${product?.unit.unitType}`}
                    </span>
                  </div>

                  <Button
                    disabled={quantity >= product.unit.stockQuantity}
                    size="icon"
                    variant="ghost"
                    className="rounded-tl-none rounded-bl-none cursor-pointer"
                    onClick={increaseQuantity}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  className="bg-primary hover:bg-primary/90 flex-1 cursor-pointer"
                  disabled={product.status === "outOfStock"}
                  onClick={() => addItemToCart(product, quantity)}
                  variant={
                    product.status !== "outOfStock" ? "default" : "secondary"
                  }
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.status !== "outOfStock"
                    ? "Add to Cart"
                    : "Out of Stock"}
                </Button>
                <Link href={"/cart"} className="flex-1">
                  <Button
                    disabled={product.status === "outOfStock"}
                    variant="outline"
                    className="cursor-pointer bg-transparent w-full"
                    onClick={() => addItemToCart(product, quantity)}
                  >
                    Buy Now
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">
                      On orders over $50
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Quality Guarantee</p>
                    <p className="text-xs text-muted-foreground">
                      100% satisfaction
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Fast Delivery</p>
                    <p className="text-xs text-muted-foreground">
                      Within 24-48 hours
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Availability:</span>
                  <span
                    className={`text-sm ${
                      product.status === "inStock"
                        ? "text-green-600"
                        : product.status === "lowStock"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.status === "inStock"
                      ? "In Stock"
                      : product.status === "lowStock"
                      ? "Low Stock"
                      : "Out of Stock"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Origin:</span>
                  <span className="text-sm">{product.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Season:</span>
                  <span className="text-sm">{product.season}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Average Weight:</span>
                  <span className="text-sm">
                    {product.unit.averageWeightPerFruit}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product tabs */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="justify-start w-full border-b rounded-none bg-transparent p-0">
              <TabsTrigger
                value="description"
                className="max-w-30 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="max-w-30 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3"
              >
                Details
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <div className="prose max-w-none dark:prose-invert">
                <h3 className="mb-4 font-bold text-xl">Product Description</h3>
                <h4 className="mt-4 font-bold">Short Description</h4>
                <p>
                  {product.shortDescription || "No short description available"}
                </p>
                <h4 className="mt-4 font-bold">Long Description</h4>
                <p>
                  {product.longDescription || "No long description available"}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="details" className="pt-6">
              <div className="prose max-w-none dark:prose-invert">
                <h3 className="mb-4 font-bold text-xl">Product Details</h3>
                <ul>
                  <li>
                    <strong>Origin:</strong> {product.origin}
                  </li>
                  <li>
                    <strong>Season:</strong> {product.season}
                  </li>
                  <li>
                    <strong>Average Weight:</strong>{" "}
                    {product.unit.averageWeightPerFruit}
                  </li>
                  <li>
                    <strong>Stock Quantity:</strong>{" "}
                    {product.unit.stockQuantity}
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
