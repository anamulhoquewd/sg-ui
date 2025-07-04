"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ShoppingCart, Menu, ChevronsUpDown } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

import logo from "./../public/shuddhoghor-logo.jpg";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import useCategory from "@/app/admin/categories/_hook/useCategory";

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const { categories } = useCategory();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const navigationItems = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
  ];

  return (
    <header
      className={`border-b fixed w-full top-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top bar */}
      <div className="bg-secondary flex h-10 items-center justify-between px-4 text-sm">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <Link href="tel:01xxxxxxxx" className="hidden sm:inline">
            01xxxxxxxx
          </Link>
        </div>
        <span className="hidden md:inline">
          JavaScript is a programming language mainly used to make websites
          interactive.
        </span>
        <div className="hidden sm:flex items-center gap-4">
          <Link href="/about" className="text-sm hover:underline">
            About Us
          </Link>
          <Link href="/contact" className="text-sm hover:underline">
            Contact
          </Link>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-background flex h-16 items-center justify-between px-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo || ""} alt="logo" width={40} height={40} />
        </Link>

        {/* DESKTOP NAVIGATION MENU */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link href={item.href} passHref>
                  <NavigationMenuLink className="px-3 py-2 text-sm font-medium">
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="cursor-pointer">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {categories.map((component) => (
                    <ListItem
                      key={component.name}
                      title={component.name}
                      href={`/products?category=${component.slug}`}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* MOBILE MENU */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px] px-4">
            <div className="flex flex-col gap-6 py-4">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Image src={logo} alt="logo" width={40} height={40} />
                <span className="font-bold text-xl">Shuddhoghor</span>
              </Link>
              <nav className="flex flex-col gap-4">
                {navigationItems.map((item) => (
                  <SheetClose asChild key={item.title}>
                    <Link
                      href={item.href}
                      className="font-medium text-lg hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  </SheetClose>
                ))}

                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                  <div className="flex items-center justify-between">
                    <CollapsibleTrigger asChild>
                      <p className="text-lg font-medium hover:text-primary transition-colors w-full flex items-center justify-between gap-2.5">
                        <span>Categories</span>{" "}
                        <ChevronsUpDown className="w-5 h-5" />
                        <span className="sr-only">Toggle</span>
                      </p>
                    </CollapsibleTrigger>
                  </div>

                  <CollapsibleContent className="mt-2 ml-4 flex flex-col gap-2 text-lg">
                    {categories.map((component) => (
                      <Link
                        className="font-medium hover:text-primary transition-colors"
                        href={`/products?category=${component.slug}`}
                      >
                        {component.name}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </nav>
              <div className="mt-auto pt-6 border-t">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <Link href="tel:01xxxxxxxx">01xxxxxxxx</Link>
                  </div>
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                  <Link href="/contact" className="hover:underline">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* TOGGLES & BUTTONS */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/cart">
            <Button className="cursor-pointer" size="icon">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href = "#", ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-base font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
