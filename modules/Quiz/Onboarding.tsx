import { Owl, OwlSide, ParentChildIcon } from "@/components/Svg";
import React from "react";
import { Text } from "@/components/Text";
import { Transition } from "@/components/Transition";
import { useQuizStatus } from "./store";
import { questions } from "./data";

export function Onboarding() {
  const status = useQuizStatus();

  const show = status === "onboarding";

  return (
    <Transition
      show={show}
      classNames={{
        default:
          "fixed w-screen max-sm:w-[calc(100%+3rem)] max-sm:top-1/2 max-sm:-translate-y-1/2 sm:bottom-12 -z-10 flex max-sm:items-center justify-center",
        from: "opacity-100 -translate-x-16 sm:-translate-x-4",
        to: "opacity-100 -translate-x-16 sm:-translate-x-4",
        exit: "opacity-0 -translate-x-20",
      }}
    >
      <div className="max-sm:hidden shrink-0">
        <ParentChildIcon />
      </div>


      <div className="relative sm:-translate-x-4 sm:mt-16 text-black h-fit max-w-sm">
        <div className="bg-white px-6 sm:px-8 py-3 rounded-2xl border-2 border-empty">
          <Text>
            Time to practice <span className="text-indigo font-extrabold">{questions.length} questions</span> 
          </Text>
        </div>
        <div className="w-3.5 h-3.5 border-l-2 border-b-2 border-empty absolute left-0 -translate-x-1.5 bg-white rotate-45 top-1/2 -translate-y-1/2"></div>
      </div>
    </Transition>
  );
}
