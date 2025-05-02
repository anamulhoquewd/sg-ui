"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LanguageSelector() {
  const [language, setLanguage] = useState("English");

  function toggle() {
    if (language === "English") {
      setLanguage("Bangla");
    } else {
      setLanguage("English");
    }
  }

  return (
    <Button className="cursor-pointer" onClick={toggle}>
      <Globe className="h-4 w-4" />
      {language}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
