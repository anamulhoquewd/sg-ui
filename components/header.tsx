"use client";

import Link from "next/link";
import { Phone, ShoppingCart } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LanguageSelector } from "./language-selector";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import logo from "@/public/shuddhoghor-logo.jpg";
import { Button } from "./ui/button";

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  return (
    <header
      className={`border-b fixed w-full top-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-secondary container flex h-10 items-center justify-between px-4 text-sm">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <Link href="tel:01xxxxxxxx">01xxxxxxxx</Link>
        </div>
        <span>
          JavaScript is a programming language mainly used to make websites
          interactive.
        </span>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm hover:underline">
            About Us
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Contact
          </Link>
        </div>
      </div>

      <div className="bg-background container flex h-16 items-center justify-between px-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="logo" width={80} height={80} />
        </Link>
        {/* NAVIGATION MENU */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="#" passHref>
                <NavigationMenuLink>Documentation</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" passHref>
                <NavigationMenuLink>Documentation</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" passHref>
                <NavigationMenuLink>Documentation</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" passHref>
                <NavigationMenuLink>Documentation</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" passHref>
                <NavigationMenuLink>Documentation</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" passHref>
                <NavigationMenuLink>Documentation</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* TOGGLES & BUTTONS */}
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button className="cursor-pointer" size="icon">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </Link>
          <LanguageSelector />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
