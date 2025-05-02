"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Calendar,
  CreditCard,
  Search,
  Settings,
  Smile,
  User,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <form
        onSubmit={handleSearch}
        className="flex w-full max-w-3xl mx-auto gap-2"
      >
        <Input
          type="text"
          placeholder="Search by mango name (e.g., Himshagor, Rupali, Bari 4)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 cursor-pointer"
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>
    </div>
  );

  return (
    <>
      <div className="w-80 py-5">
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="w-full cursor-pointer border rounded-md"
        >
          Search by mango name (e.g., Himshagor, Rupali, Bari 4)
        </Button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
