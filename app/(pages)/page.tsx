"use client";

import { HeroSection } from "@/components/hero-section";
import { SearchBar } from "@/components/search-bar";
import { ProductsSection } from "@/components/products-section";
import { CustomerHelpSection } from "@/components/customer-help-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col mt-26">
      <main className="flex-1">
        <HeroSection />
        <SearchBar />
        <section className="container mx-auto py-12 px-4">
          <ProductsSection />
        </section>
        <CustomerHelpSection />
      </main>
    </div>
  );
}
