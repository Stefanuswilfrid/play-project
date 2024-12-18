import { Transition } from "@/components/Transition";
import { QuizModule } from "@/modules/Quiz";

import React from "react";

export default function PracticePage() {
  return (
    <Transition
      show
      classNames={{
        from: "opacity-0",
        to: "opacity-100 delay-300",
        exit: "opacity-0",
      }}
    >
      <QuizModule />
    </Transition>
  );
}
