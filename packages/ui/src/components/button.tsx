import { Component, JSX, splitProps } from "solid-js";
import { cn } from "../utils";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg';
}

export const Button: Component<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "size"]);

  return (
    <button
      class={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
        // Variants
        {
          "bg-blue-600 text-white hover:bg-blue-700": local.variant === "default" || !local.variant,
          "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900": local.variant === "outline",
          "hover:bg-gray-100 hover:text-gray-900": local.variant === "ghost",
          "text-blue-600 underline-offset-4 hover:underline": local.variant === "link",
        },
        // Sizes
        {
          "h-10 px-4 py-2": local.size === "default" || !local.size,
          "h-9 rounded-md px-3": local.size === "sm",
          "h-11 rounded-md px-8": local.size === "lg",
        },
        local.class
      )}
      {...others}
    />
  );
}; 