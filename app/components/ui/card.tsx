"use client";

import * as React from "react";
import { cn } from "@/app/lib/utils";

// ===========================
// 🔶 CARD BASE
// ===========================
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl shadow-md p-6 transition-colors duration-300 bg-card text-card-foreground border",
      className
    )}
    {...props} // 👈 onClick, style, id, etc.
  />
));
Card.displayName = "Card";

// ===========================
// 🔶 HEADER
// ===========================
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-b pb-3 mb-3 flex flex-col space-y-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// ===========================
// 🔶 TITLE
// ===========================
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = "", ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-xl font-bold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// ===========================
// 🔶 DESCRIPTION
// ===========================
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = "", ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// ===========================
// 🔶 CONTENT
// ===========================
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

// ===========================
// 🔶 FOOTER
// ===========================
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center mt-4", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
