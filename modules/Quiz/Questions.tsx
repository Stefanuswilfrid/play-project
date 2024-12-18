import { Text } from "@/components/Text";

import clsx from "clsx";
import React from "react";
import { questions } from "./data";
import { Transition } from "@/components/Transition";
import { useQuizActions, useQuizProgress, useQuizSelected, useQuizStatus } from "./store";
import { AnimatePresence, motion } from "framer-motion";
import { Scores } from "./Scores";

export function Questions() {
  const progress = useQuizProgress();

  const question = questions[progress];

  const isEnded = progress === questions.length;

  return (
    <div className="relative flex-1 grid place-items-center min-h-96">
      <AnimatePresence mode="wait">
        <motion.div
          key={progress}
          className="absolute py-4 max-w-3xl mx-auto max-md:h-full"
          transition={{
            type: "keyframes",
            duration: 0.3,
          }}
          initial={{
            position: "absolute",
            opacity: 0,
            x: 128,
          }}
          animate={{
            position: "absolute",
            opacity: 1,
            x: 0,
          }}
          exit={{
            position: "absolute",
            opacity: 0,
            x: -128,
          }}
        >
          {isEnded ? (
            <Scores />
          ) : question ? (
            <QuestionContent title={question.title} options={question.options} />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


type QuestionContentProps = {
  title: string;
  options: readonly string[];
};

export function QuestionContent({ title, options }: QuestionContentProps) {
  const selected = useQuizSelected();
  const status = useQuizStatus();

  const { updateSelected } = useQuizActions();

  React.useEffect(() => {
    window.addEventListener("keydown", (e) => {
      options.forEach((option, i) => {
        if (e.key === `${i + 1}`) {
          updateSelected(option);
        }
      });
    });

    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, [options, updateSelected]);

  return (
    <div className="w-full h-full flex flex-col">
      <Text
        styles={{
          variant: "h1",
        }}
        className="md:text-center"
      >
        {title}
      </Text>

      <div
        className={clsx(
          "flex-1 w-full grid grid-cols-2 md:grid-cols-4 max-md:gap-y-3 gap-2 mx-auto md:w-fit mt-4 md:mt-28",
          status.includes("checked") && "pointer-events-none"
        )}
      >
        {options?.map((option, i) => {
          return (
            <QuestionOption
              key={option}
              value={option}
              onChange={(value) => {
                updateSelected(value);
              }}
              isSelected={selected === option}
              isCorrect={selected === option && status === "checked-correct"}
              order={i + 1}
            />
          );
        })}
      </div>
    </div>
  );
}

export function QuestionOption({
  value,
  onChange,
  isSelected,
  isCorrect,
  order,
}: {
  value: string;
  onChange: (value: string) => void;
  isSelected?: boolean;
  isCorrect?: boolean;
  order: number;
}) {
  const useNormalClassNames = !isCorrect;
  return (
    <div
      aria-checked={isSelected}
      onClick={() => onChange(value)}
      role="radio"
      tabIndex={-1}
      className={clsx(
        "relative w-full h-full md:w-44 md:h-52 grid place-items-center text-2xl max-md:font-extrabold md:text-3xl border-2 border-empty rounded-xl shadow-b-small shadow-empty hover:bg-lightgray cursor-pointer group active:bg-lightpond active:shadow-pond active:border-pond active:text-darksky select-none active:translate-y-1 active:shadow-none",
        useNormalClassNames &&
          "text-softblack aria-checked:bg-lightpond aria-checked:shadow-pond aria-checked:border-pond aria-checked:text-darksky",
        isCorrect && "bg-lightgreen shadow-lightlimegreen border-lightlimegreen text-darkgreen"
      )}
    >
      <div
        className={clsx(
          "max-md:hidden absolute right-6 bottom-6 px-2 py-1 border-2 border-empty rounded-lg group-hover:bg-lightgray group-active:bg-lightpond group-active:border-pond",
          useNormalClassNames && "bg-white group-aria-checked:border-pond group-aria-checked:bg-lightpond",
          isCorrect && "bg-lightgreen shadow-lightlimegreen border-lightlimegreen text-darkgreen"
        )}
      >
        <Text
          styles={{
            variant: "span",
            color: "gray",
          }}
          className={clsx(
            "font-bold group-active:text-darksky",
            useNormalClassNames && "group-aria-checked:text-darksky",
            isCorrect && "text-darkgreen"
          )}
        >
          {order}
        </Text>
      </div>
      <span className="md:mb-8">{value}</span>
    </div>
  );
}
