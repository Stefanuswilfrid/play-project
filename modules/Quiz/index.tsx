import { Loader, useLoading } from "./Loader";
import * as React from "react";
import { ExitDialog } from "./Dialog";
import { Correct, GreenFlag, Incorrect, RedFlag, SettingsIcon } from "@/components/Svg";
import { Onboarding } from "./Onboarding";
import { Footer } from "./Footer";
import { Button } from "@/components/Button";
import { Questions } from "./Questions";
import { ProgressBar } from "./ProgressBar";
import { useQuizActions, useQuizProgress, useQuizSelected, useQuizStatus } from "./store";
import { Transition } from "@/components/Transition";
import { Text } from "@/components/Text";
import { questions } from "./data";
import clsx from "clsx";
import { ReviewDialog } from "./Dialog/ReviewDialog";

export function QuizModule() {
  const isLoading = useLoading();
  const { resetState } = useQuizActions();

  React.useEffect(() => {
    resetState();
  }, [resetState]);

  return (
    <React.Fragment>
      <Loader show={isLoading} />

      {!isLoading && <Main />}
    </React.Fragment>
  );
}

function Main() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full flex flex-col max-w-6xl mx-auto max-sm:px-4 max-sm:py-6 px-16 p-12 overflow-hidden">
        <div className="flex items-center gap-4 sm:gap-6">
          <ReviewDialog />
          <ExitDialog />
          <ProgressBar />
        </div>

        <Questions />
      </main>

      <Onboarding />

      <Footer>
        <ContinueButton />
        <CheckButton />
        <NextQuestionButton />
      </Footer>
    </div>
  );
}

function NextQuestionButton() {
  const status = useQuizStatus();
  const progress = useQuizProgress();

  const { nextQuestion } = useQuizActions();

  if (!status.includes("checked")) return null;

  return (
    <div className="w-full flex items-center justify-between">
      <div className="max-md:hidden flex gap-4 items-center">
        <Transition
          show
          classNames={{
            from: "opacity-0 scale-0",
            to: "opacity-100 scale-100 transition",
            exit: "opacity-0",
          }}
        >
          <div className="bg-white w-20 aspect-square grid place-items-center rounded-full">
            {status === "checked-correct" ? <Correct /> : <Incorrect />}
          </div>
        </Transition>
        {status === "checked-correct" ? (
          <div className="flex flex-col gap-2">
            <Text
              styles={{
                color: "darkgreen",
                variant: "h3",
              }}
            >
              Nice job!
            </Text>
            <Button variant="ghost" className="flex gap-2 text-darkgreen px-0 text-sm">
              <GreenFlag />
              REPORT
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div>
              <Text
                styles={{
                  color: "darkred",
                  variant: "h3",
                }}
              >
                Correct Solution:
              </Text>
              <Text
                styles={{
                  color: "darkred",
                }}
                className="font-light"
              >
                {questions[progress].correctAnswer}
              </Text>
            </div>
            <Button variant="ghost" className="flex gap-2 text-darkred px-0 text-sm">
              <RedFlag />
              REPORT
            </Button>
          </div>
        )}
      </div>
      <Transition
        show
        classNames={{
          default: clsx(
            "absolute left-0 w-full md:hidden",
            status === "checked-correct" && "-top-20 h-20",
            status === "checked-wrong" && "-top-24 h-24"
          ),
          from: "translate-y-1/2",
          to: "translate-y-0 transition duration-150",
          exit: "opacity-0",
        }}
      >
        <div
          className={clsx(
            "h-full w-full flex px-4 pb-4 gap-4 items-end justify-between",
            status === "checked-correct" && "bg-lightgreen",
            status === "checked-wrong" && "bg-lightred"
          )}
        >
          {status === "checked-correct" ? (
            <>
              <Text
                styles={{
                  color: "darkgreen",
                  variant: "h2",
                }}
              >
                Nice job!
              </Text>
              <Button variant="ghost" className="flex gap-2 text-darkgreen px-0 text-sm">
                <GreenFlag />
              </Button>
            </>
          ) : (
            <>
              <div>
                <Text
                  styles={{
                    color: "darkred",
                    variant: "h2",
                  }}
                >
                  Correct Solution:
                </Text>
                <Text
                  styles={{
                    color: "darkred",
                    variant: "h2",
                  }}
                  className="font-normal"
                >
                  {questions[progress].correctAnswer}
                </Text>
              </div>
              <Button variant="ghost" className="flex gap-2 text-darkred px-0 text-sm">
                <RedFlag />
              </Button>
            </>
          )}
        </div>
      </Transition>
      <Button
        variant={status === "checked-correct" ? "green" : "red"}
        size="large"
        className="max-md:w-full z-10"
        onClick={nextQuestion}
      >
        CONTINUE
      </Button>
    </div>
  );
}

function CheckButton() {
  const status = useQuizStatus();
  const selected = useQuizSelected();

  const { checkAnswer } = useQuizActions();

  if (status !== "started") return null;

  return (
    <Button disabled={selected === null} variant="green" size="large" className="max-md:w-full" onClick={checkAnswer}>
      CHECK
    </Button>
  );
}

function ContinueButton() {
  const status = useQuizStatus();
  const { updateStatus, updateProgress } = useQuizActions();

  if (status !== "onboarding") return null;

  return (
    <Button
      size="large"
      className="max-md:w-full"
      onClick={() => {
        updateStatus("started");
        updateProgress(0);
      }}
    >
      CONTINUE
    </Button>
  );
}
