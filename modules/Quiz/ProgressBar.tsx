import React from "react";
import { NUM_QUESTIONS, useQuizProgress } from "./store";
import { useLottieData } from "@/components/Lottie";
import clsx from "clsx";

export function ProgressBar() {
  const progress = useQuizProgress();

  const { View, goToAndPlay } = useLottieData("progress-bar-splash", {
    loop: false,
    autoplay: false,
    color: "blue",
    className: clsx(
      "pointer-events-none absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 w-16 h-16",
      progress > 0 ? "opacity-100" : "opacity-0"
    ),
  });

  React.useEffect(() => {
    goToAndPlay(0, true);
  }, [goToAndPlay, progress]);

  return (
    <div className="bg-empty w-full rounded-full">
      <div
        aria-valuemax={1}
        aria-valuemin={0}
        aria-valuenow={Math.round(progress / NUM_QUESTIONS)}
        role="progressbar"
        style={{
          width: `${(progress / NUM_QUESTIONS) * 100}%`,
          opacity: progress > 0 ? 1 : 0,
        }}
        className="relative px-2 pt-1 bg-blue duration-300 h-4 rounded-full"
      >
        <div className="w-full h-1 bg-glassblue rounded-full"></div>
        {View}
      </div>
    </div>
  );
}
