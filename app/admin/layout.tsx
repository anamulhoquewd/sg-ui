"use client";

import type React from "react";

import Link from "next/link";
import Image from "next/image";
import { CircleUser, LogOut, MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Suspense } from "react";

import logo from "@/public/shuddhoghor-logo.jpg";
import { AppSidebar } from "@/components/side-bar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="flex">
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SidebarProvider>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <>
      <AppSidebar />

      <div className="flex-1 min-h-screen flex-col">
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
          {/* Mobile Navigation */}
          {isMobile && (
            <Button
              onClick={() => setOpenMobile(true)}
              variant="ghost"
              size="icon"
              className="order-1"
            >
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}

          <div className="flex items-center gap-2 order-2 md:order-1">
            <Link
              href="/admin"
              className="flex items-center gap-2 font-semibold md:flex"
            >
              <Image src={logo} width={50} height={50} alt="Shuddhoghor Logo" />
              <span className="hidden md:inline-block">Shuddhoghor Admin</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 order-3">
            <ModeToggle />
            {/* Auth Section */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full cursor-pointer"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={""} alt="User" />
                    <AvatarFallback>SG</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {"Shuddhoghor"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {"info@shuddhoghor.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link className="flex items-center gap-2" href="/admin/me">
                    <DropdownMenuItem className="cursor-pointer w-full">
                      <CircleUser className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger
                    className="p-0 border-none w-full cursor-pointer flex justify-start"
                    asChild
                  >
                    <Button variant="outline">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction className="cursor-pointer">
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6">
            <Suspense>{children}</Suspense>
          </div>
        </main>
      </div>
    </>
  );
}
