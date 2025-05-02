"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, ShoppingCart, Menu } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

import logo from "./../public/shuddhoghor-logo.jpg"

export function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  const navigationItems = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Blog", href: "/blog" },
    { title: "FAQ", href: "/faq" },
  ]

  return (
    <header
      className={`border-b fixed w-full top-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top bar */}
      <div className="bg-secondary container flex h-10 items-center justify-between px-4 text-sm">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <Link href="tel:01xxxxxxxx" className="hidden sm:inline">
            01xxxxxxxx
          </Link>
        </div>
        <span className="hidden md:inline">
          JavaScript is a programming language mainly used to make websites interactive.
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
      <div className="bg-background container flex h-16 items-center justify-between px-4">
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
                  <NavigationMenuLink className="px-3 py-2 text-sm font-medium">{item.title}</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
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
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <div className="flex flex-col gap-6 py-6">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src="/placeholder.svg?height=40&width=40" alt="logo" width={40} height={40} />
                <span className="font-bold text-xl">Shuddhoghor</span>
              </Link>
              <nav className="flex flex-col gap-4">
                {navigationItems.map((item) => (
                  <SheetClose asChild key={item.title}>
                    <Link href={item.href} className="text-lg font-medium hover:text-primary transition-colors">
                      {item.title}
                    </Link>
                  </SheetClose>
                ))}
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
  )
}
