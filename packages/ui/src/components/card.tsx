import { Component, JSX, splitProps } from "solid-js";
import { cn } from "../utils";

interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const Card: Component<CardProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={cn(
        "rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm",
        local.class
      )}
      {...others}
    />
  );
};

interface CardHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const CardHeader: Component<CardHeaderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("flex flex-col space-y-1.5 p-6", local.class)}
      {...others}
    />
  );
};

interface CardTitleProps extends JSX.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle: Component<CardTitleProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <h3
      class={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        local.class
      )}
      {...others}
    />
  );
};

interface CardDescriptionProps extends JSX.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription: Component<CardDescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <p
      class={cn("text-sm text-gray-500", local.class)}
      {...others}
    />
  );
};

interface CardContentProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const CardContent: Component<CardContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div class={cn("p-6 pt-0", local.class)} {...others} />
  );
};

interface CardFooterProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const CardFooter: Component<CardFooterProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("flex items-center p-6 pt-0", local.class)}
      {...others}
    />
  );
}; 