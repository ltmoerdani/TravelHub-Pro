import { Component, JSX, splitProps } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
        outline: "border border-blue-200 hover:bg-blue-100 hover:text-blue-900 focus-visible:ring-blue-500",
        secondary: "bg-blue-100 text-blue-900 hover:bg-blue-200 focus-visible:ring-blue-500",
        ghost: "hover:bg-blue-100 hover:text-blue-900 focus-visible:ring-blue-500",
        link: "underline-offset-4 hover:underline text-blue-900 focus-visible:ring-blue-500",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button: Component<ButtonProps> = (props) => {
  const [local, variants, others] = splitProps(
    props,
    ["class"],
    ["variant", "size"]
  );

  return (
    <button
      class={cn(buttonVariants(variants), local.class)}
      {...others}
    />
  );
}; 