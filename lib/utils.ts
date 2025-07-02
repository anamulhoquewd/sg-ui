import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to decode payload. used for decode to public data. not for verification
export function decodeJwtPayload(token: string) {
  try {
    if (!token) return null;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      Buffer.from(base64, "base64").toString("utf-8")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token format", error);
    return null;
  }
}
