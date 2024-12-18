import { cn } from "@/utils/cn";
import React from "react";

type ButtonProps = {
  variant?: keyof typeof classNames;
  size?: "normal" | "large";
  textSize?: "small" | "normal";
} & React.ComponentPropsWithoutRef<"button">;

const classNames = {
  primary: "bg-indigoglass text-white shadow-indigo",
  secondary: "bg-white text-indigo shadow-rum",
  sky: "bg-sky text-white hover:bg-lightsky active:bg-lightsky shadow-darksky",
  green: "bg-green hover:bg-limegreen active:bg-limegreen shadow-darkgreen text-white",
  red: "bg-red shadow-darkred text-white",
  ghost: "bg-transparent shadow-none text-danger active:translate-y-0",
} as const;

const sizeClassNames = {
  normal: "px-4 py-2 rounded-xl",
  large: "px-6 py-3 rounded-2xl",
} as const;

const textSizeClassNames = {
  small: "text-sm",
  normal: "text-base",
} as const;

export function Button({
  children,
  className,
  size = "normal",
  textSize = "normal",
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "w-fit whitespace-nowrap select-none",
        "active:translate-y-1 active:shadow-none shadow-b",
        "font-extrabold tracking-wide h-fit",
        classNames[variant],
        sizeClassNames[size],
        textSizeClassNames[textSize],
        "disabled:bg-empty disabled:text-gray disabled:shadow-none disabled:active:translate-y-0",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
