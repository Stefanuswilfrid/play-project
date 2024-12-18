import { useLottieData } from "@/components/Lottie";
import { Transition } from "@/components/Transition";
import { Text } from "@/components/Text";
import * as React from "react";

export function useLoading() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return isLoading;
}

export function Loader({ show }: { show: boolean }) {


  return (
    <Transition
      show={show}
      classNames={{
        default: "fixed inset-0 w-screen h-screen bg-white z-50 px-4 flex flex-col items-center justify-center",
        from: "opacity-0",
        to: "opacity-100 delay-500",
        exit: "opacity-0",
      }}
    >
      
      <Text
        styles={{
          color: "gray",
        }}
        className="mt-12 font-bold tracking-wide"
      >
        LOADING...
      </Text>
      <Text className="text-center mt-4">
      Our quizzes help parents reinforce key learnings from video courses on child development and well-being.
      </Text>
    </Transition>
  );
}
