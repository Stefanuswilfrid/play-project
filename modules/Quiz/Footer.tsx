import React from "react";
import { useQuizStatus } from "./store";
import clsx from "clsx";

export function Footer({ children }: { children: React.ReactNode }) {
  const status = useQuizStatus();

  return (
    <footer
      className={clsx(
        "relative border-empty h-[80px] md:h-[140px]",
        status === "checked-correct" && "sm:border-t-none bg-lightgreen",
        status === "checked-wrong" && "sm:border-t-none bg-lightred",
        !status.includes("checked") && "bg-white sm:border-t-2"
      )}
    >
      <div className="h-full max-w-6xl mx-auto px-4 py-6 md:px-16 lg:px-32 flex justify-end items-end md:items-center">
        {children}
      </div>
    </footer>
  );
}
