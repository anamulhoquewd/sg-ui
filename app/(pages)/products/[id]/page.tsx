"use client";

import { useState } from "react";
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

// Sample product data
const products = [
  {
    id: "1",
    name: "Himshagor Mango",
    price: 350,
    images: [
      "https://ghorerbazar.com/cdn/shop/files/Lachcha_Semai_500gm.jpg",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    popular: true,
    description:
      "Sweet and juicy mango variety with a rich flavor profile and minimal fiber content.",
    longDescription:
      "Himshagor is one of the most popular mango varieties in Bangladesh. Known for its exceptional sweetness and distinctive aroma, this premium mango has a smooth texture with minimal fiber. The fruit has a golden-yellow skin when ripe and bright orange flesh that's incredibly juicy. Each Himshagor mango weighs approximately 250-350 grams, making it a medium-sized variety that's perfect for individual consumption.",
    origin: "Rajshahi, Bangladesh",
    season: "May to June",
    weight: "250-350g per fruit",
    storage:
      "Store at room temperature until ripe, then refrigerate for up to 5 days.",
    nutritionalInfo: "Rich in vitamins A and C, potassium, and antioxidants.",
    rating: 4.8,
    reviewCount: 124,
    stock: "In Stock",
    relatedProducts: ["2", "3", "4"],
  },
  {
    id: "2",
    name: "Rupali Mango",
    price: 400,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    popular: true,
    description: "Aromatic and flavorful mango with a unique taste profile.",
    longDescription:
      "Rupali mangoes are known for their distinctive aroma and flavor. This premium variety has a smooth texture and minimal fiber, making it a delightful eating experience. The fruit has a pale yellow skin when ripe and bright yellow flesh that's incredibly juicy.",
    origin: "Chapainawabganj, Bangladesh",
    season: "June to July",
    weight: "300-400g per fruit",
    storage:
      "Store at room temperature until ripe, then refrigerate for up to 5 days.",
    nutritionalInfo: "Rich in vitamins A and C, potassium, and antioxidants.",
    rating: 4.7,
    reviewCount: 98,
    stock: "In Stock",
    relatedProducts: ["1", "3", "4"],
  },
  {
    id: "3",
    name: "Bari 4 Mango",
    price: 380,
    images: ["/placeholder.svg?height=600&width=600"],
    popular: false,
    description: "Large, fiberless mango variety with excellent taste.",
    longDescription:
      "Bari 4 is a large mango variety developed by the Bangladesh Agricultural Research Institute. It's known for its size, minimal fiber content, and excellent taste. The fruit has a greenish-yellow skin when ripe and bright orange flesh that's incredibly juicy.",
    origin: "Various regions of Bangladesh",
    season: "June to July",
    weight: "400-500g per fruit",
    storage:
      "Store at room temperature until ripe, then refrigerate for up to 5 days.",
    nutritionalInfo: "Rich in vitamins A and C, potassium, and antioxidants.",
    rating: 4.5,
    reviewCount: 76,
    stock: "In Stock",
    relatedProducts: ["1", "2", "4"],
  },
  {
    id: "4",
    name: "Pure Honey",
    price: 650,
    images: ["/placeholder.svg?height=600&width=600"],
    popular: true,
    description: "100% pure natural honey collected from the Sundarbans.",
    longDescription:
      "Our pure honey is collected from the pristine Sundarbans mangrove forest. It's 100% natural with no additives or preservatives. This honey has a rich, complex flavor profile with floral notes and a smooth texture.",
    origin: "Sundarbans, Bangladesh",
    season: "Available year-round",
    weight: "500g per jar",
    storage: "Store in a cool, dry place away from direct sunlight.",
    nutritionalInfo:
      "Rich in antioxidants, has antibacterial properties, and contains various vitamins and minerals.",
    rating: 4.9,
    reviewCount: 156,
    stock: "In Stock",
    relatedProducts: ["1", "2", "3"],
  },
];

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const product = products.find((p) => p.id === productId) || products[0];

  const [quantity, setQuantity] = useState(5);
  const [selectedImage, setSelectedImage] = useState(0);

  const increaseQuantity = () => {
    setQuantity(quantity + 5);
  };

  const decreaseQuantity = () => {
    if (quantity > 5) {
      setQuantity(quantity - 5);
    }
  };

  const addToCart = () => {
    console.log(`Added ${quantity}kg of ${product.name} to cart`);
    // Implement cart functionality
  };

  return (
    <div className="flex min-h-screen flex-col mt-26">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back button */}
          <Link
            href="/"
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
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.popular && (
                  <Badge className="absolute top-4 left-4 bg-primary">
                    Popular
                  </Badge>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-4 overflow-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                        selectedImage === index ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
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
                ৳{product.price}/kg
              </div>

              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 5}
                    className="p-2 hover:bg-muted disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </button>
                  <div className="px-4 py-2 text-center min-w-[60px]">
                    {quantity}kg
                  </div>
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
                      On orders over ৳2000
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
                    {product.stock}
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
                  <span className="text-sm">{product.weight}</span>
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
                <p>{product.longDescription}</p>
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
                    <strong>Average Weight:</strong> {product.weight}
                  </li>
                  <li>
                    <strong>Storage Instructions:</strong> {product.storage}
                  </li>
                  <li>
                    <strong>Nutritional Information:</strong>{" "}
                    {product.nutritionalInfo}
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
