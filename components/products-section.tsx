import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Sample product data
const products = [
  {
    id: 1,
    name: "Himshagor",
    price: 350,
    image: "https://ghorerbazar.com/cdn/shop/files/Lachcha_Semai_500gm.jpg",
    popular: true,
    description: "Sweet and juicy mango variety",
  },
  {
    id: 2,
    name: "Rupali",
    price: 400,
    image: "https://ghorerbazar.com/cdn/shop/files/Lachcha_Semai_500gm.jpg",
    popular: true,
    description: "Aromatic and flavorful mango",
  },
  {
    id: 3,
    name: "Bari 4",
    price: 380,
    image: "https://ghorerbazar.com/cdn/shop/files/3one.jpg",
    popular: false,
    description: "Large, fiberless mango variety",
  },
  {
    id: 4,
    name: "Pure Honey",
    price: 650,
    image: "https://ghorerbazar.com/cdn/shop/files/Lachcha_Semai_500gm.jpg",
    popular: true,
    description: "100% pure natural honey",
  },
  {
    id: 5,
    name: "Pure Honey",
    price: 650,
    image: "https://ghorerbazar.com/cdn/shop/files/Lachcha_Semai_500gm.jpg",
    popular: true,
    description: "100% pure natural honey",
  },
  {
    id: 6,
    name: "Pure Honey",
    price: 650,
    image: "https://ghorerbazar.com/cdn/shop/files/Lachcha_Semai_500gm.jpg",
    popular: true,
    description: "100% pure natural honey",
  },
];

export function ProductsSection() {
  // Sort products by popularity
  const sortedProducts = [...products].sort((a, b) => {
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return 0;
  });

  return (
    <>
      <h2 className="mb-8 text-3xl font-bold text-center">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-48">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.image || ""}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </Link>{" "}
              {product.popular && (
                <Badge className="absolute top-2 right-2 bg-primary">
                  Popular
                </Badge>
              )}
            </div>
            <CardHeader>
              <Link href={`/products/${product.id}`}>
                <CardTitle className="line-clamp-2 hover:text-primary transition-colors duration-200">
                  {product.name}
                </CardTitle>
              </Link>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2 line-clamp-3">
                {product.description}
              </p>
              <p className="text-xl font-bold text-primary">
                ${product.price}/kg
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full cursor-pointer">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart (5kg)
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
