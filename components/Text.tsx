import { cn } from "@/utils/cn";
import React from "react";

type TextComponent = <T extends React.ElementType = "p">(props: TextProps<T>) => React.ReactNode | null;

const TextColor = ["white", "black", "softblack", "indigo", "gray", "darkgray", "darkgreen", "darkred"] as const;

const TextVariant = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"] as const;

type TextProps<T extends React.ElementType = "p"> = {
  as?: T;
  styles?: {
    color?: (typeof TextColor)[number];
    variant?: (typeof TextVariant)[number];
  };
} & React.ComponentPropsWithoutRef<T>;

export const Text: TextComponent = React.forwardRef(function Text<T extends React.ElementType = "p">(
  { as, styles, children, className, ...rest }: TextProps<T>,
  ref: React.ComponentPropsWithoutRef<T>["ref"]
) {
  const Component = as || "p";

  const color = styles?.color ?? "black";
  const variant = styles?.variant ?? "p";

  return (
    <Component
      ref={ref}
      className={cn(
        [
          color === "white" && ["text-white"],
          color === "black" && ["text-black"],
          color === "softblack" && ["text-softblack"],
          color === "indigo" && ["text-indigo"],
          color === "gray" && ["text-gray"],
          color === "darkgray" && ["text-darkgray"],
          color === "darkgreen" && ["text-darkgreen"],
          color === "darkred" && ["text-darkred"],
        ],
        [
          variant === "h1" && ["text-2xl sm:text-3xl font-extrabold"],
          variant === "h2" && ["text-xl sm:text-2xl font-extrabold"],
          variant === "h3" && ["text-lg sm:text-xl font-extrabold"],
          variant === "p" && ["sm:text-lg font-medium"],
          variant === "span" && ["text-sm sm:text-normal font-medium"],
        ],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});
