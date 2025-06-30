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
} from "lucide-react";
import api from "@/axios/interceptor";
import { Product } from "@/components/product-page";
import { Input } from "@/components/ui/input";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${slug}`);

      if (!response.data.success) {
        throw new Error("Product not found");
      }

      setProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);
  const [quantity, setQuantity] = useState(5);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    console.log(`Added ${quantity}kg of ${product?.name} to cart`);
    // Implement cart functionality
  };

  return (
    <div className="flex min-h-screen flex-col mt-26">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back button */}
          <Link
            href="/products"
            prefetch={false}
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
                  src={product?.media[selectedImage].url || "/placeholder.svg"}
                  alt={product?.media[selectedImage].alt || "Product Image"}
                  fill
                  className="object-cover"
                  priority
                />
                {product?.isPopular && (
                  <Badge className="absolute top-4 left-4 bg-primary">
                    Popular
                  </Badge>
                )}
              </div>

              {product?.media && product.media.length > 1 && (
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
                        src={image.url || "/placeholder.svg"}
                        alt={`${product?.name} ${index + 1}`}
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
              <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>

              <div className="text-2xl font-bold text-primary mb-4">
                {`${product?.unit.price} ${
                  product?.unit.unitType === "kg" ? "Kg" : "Piece"
                }`}
              </div>

              <p className="text-muted-foreground mb-6">
                {product?.shortDescription || "No description available."}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-muted disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-14 border-0 p-0 text-center focus:ring-0"
                  />
                  <button
                    onClick={increaseQuantity}
                    className="p-2 hover:bg-muted"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  className="bg-primary hover:bg-primary/90 flex-1"
                  onClick={addToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="flex-1">
                  Buy Now
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">
                      On orders over 2000
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
                  <span className="text-sm text-green-600">
                    {product?.status === "inStock"
                      ? "In Stock"
                      : product?.status === "lowStock"
                      ? "Low Stock"
                      : "Out of Stock"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Origin:</span>
                  <span className="text-sm">{product?.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Season:</span>
                  <span className="text-sm">{product?.season}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Average Weight:</span>
                  <span className="text-sm">
                    {product?.unit.averageWeightPerFruit}
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
                <p>{product?.longDescription}</p>
              </div>
            </TabsContent>
            <TabsContent value="details" className="pt-6">
              <div className="prose max-w-none dark:prose-invert">
                <h3 className="mb-4 font-bold text-xl">Product Details</h3>
                <ul>
                  <li>
                    <strong>Origin:</strong> {product?.origin}
                  </li>
                  <li>
                    <strong>Season:</strong> {product?.season}
                  </li>
                  <li>
                    <strong>Average Weight:</strong>{" "}
                    {product?.unit.averageWeightPerFruit}
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
