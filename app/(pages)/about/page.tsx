import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Award, Shield, Truck, Users, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col mt-26">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Mango orchard"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                About Shuddhoghor
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                Bringing the finest quality mangoes and honey directly from
                farms to your doorstep
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4">
                  <p>
                    Shuddhoghor was founded in 2018 with a simple mission: to
                    connect Bangladeshi mango farmers directly with consumers,
                    eliminating middlemen and ensuring both farmers and
                    customers get a fair deal.
                  </p>
                  <p>
                    Our journey began when our founder, Rahim Ahmed, visited his
                    ancestral village in Rajshahi and witnessed the struggles of
                    local mango farmers. Despite growing some of the
                    world&apos;s most delicious mangoes, these farmers were
                    unable to get fair prices for their produce due to multiple
                    layers of middlemen.
                  </p>
                  <p>
                    Starting with just five farmers and delivering to friends
                    and family in Dhaka, Shuddhoghor has now grown to partner
                    with over 100 farmers across Bangladesh&apos;s mango-growing
                    regions, delivering premium quality mangoes and honey to
                    thousands of customers nationwide.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=800&width=800"
                  alt="Founder in mango orchard"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="bg-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-12">Our Mission & Vision</h2>

              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-4">Mission</h3>
                <p className="text-lg">
                  To deliver the freshest, highest quality mangoes and honey
                  directly from farms to consumers while ensuring fair
                  compensation for farmers and sustainable agricultural
                  practices.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Vision</h3>
                <p className="text-lg">
                  To become Bangladesh&apos;s most trusted source for premium
                  agricultural products, revolutionizing the way farmers connect
                  with consumers and setting new standards for quality,
                  sustainability, and fair trade in the agricultural sector.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
                    <Leaf className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                  <p className="text-muted-foreground">
                    We promote sustainable farming practices that protect the
                    environment and ensure long-term agricultural viability.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Quality</h3>
                  <p className="text-muted-foreground">
                    We never compromise on quality, selecting only the finest
                    mangoes and honey that meet our strict standards.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Transparency</h3>
                  <p className="text-muted-foreground">
                    We believe in complete transparency in our sourcing,
                    pricing, and business practices.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
                    <Truck className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Reliability</h3>
                  <p className="text-muted-foreground">
                    We deliver on our promises, ensuring timely delivery and
                    consistent product quality.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Community</h3>
                  <p className="text-muted-foreground">
                    We support farming communities through fair pricing,
                    education, and sustainable development initiatives.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Customer Care</h3>
                  <p className="text-muted-foreground">
                    We prioritize customer satisfaction and strive to exceed
                    expectations in every interaction.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Products */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Our Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative h-64 w-64 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Premium Mangoes"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Premium Mangoes</h3>
                  <p className="mb-4">
                    Bangladesh is home to some of the world&apos;s most
                    delicious mango varieties. We carefully select and deliver
                    the finest mangoes from Rajshahi, Chapainawabganj, and other
                    renowned mango-growing regions.
                  </p>
                  <p className="mb-4">
                    Our collection includes popular varieties like Himshagor,
                    Rupali, and Bari 4, each known for their unique flavor
                    profiles, sweetness, and texture.
                  </p>
                  <p>
                    All our mangoes are naturally ripened, free from harmful
                    chemicals, and harvested at the perfect time to ensure
                    maximum flavor and freshness.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative h-64 w-64 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Pure Honey"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Pure Honey</h3>
                  <p className="mb-4">
                    Our pure, raw honey is collected from the pristine
                    Sundarbans mangrove forest and other natural sources across
                    Bangladesh.
                  </p>
                  <p className="mb-4">
                    Unlike commercial honey, our honey is minimally processed to
                    preserve its natural enzymes, antioxidants, and medicinal
                    properties.
                  </p>
                  <p>
                    We work directly with traditional honey collectors who use
                    sustainable harvesting methods that protect bee colonies and
                    their natural habitats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Experience the Shuddhoghor Difference
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Join thousands of satisfied customers who enjoy our premium
              quality mangoes and honey delivered directly to their doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Shop Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
