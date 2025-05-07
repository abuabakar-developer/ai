// components/ui/Card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-2xl border border-gray-200 bg-white shadow-md", className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 border-b border-gray-100", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <h3 className={cn("text-lg font-semibold", className)} {...props} />
);

const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-gray-500", className)} {...props} />
);

export { Card, CardContent, CardHeader, CardTitle, CardDescription };
