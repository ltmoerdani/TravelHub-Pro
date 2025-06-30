import { Component, JSX, splitProps } from "solid-js";
import { cn } from "../utils";

export interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const Card: Component<CardProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        local.class
      )}
      {...others}
    />
  );
};

export interface CardHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const CardHeader: Component<CardHeaderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("flex flex-col space-y-1.5 p-6", local.class)}
      {...others}
    />
  );
};

export interface CardTitleProps extends JSX.HTMLAttributes<HTMLHeadingElement> {}

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

export interface CardDescriptionProps extends JSX.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription: Component<CardDescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <p
      class={cn("text-sm text-muted-foreground", local.class)}
      {...others}
    />
  );
};

export interface CardContentProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const CardContent: Component<CardContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div class={cn("p-6 pt-0", local.class)} {...others} />
  );
}; 