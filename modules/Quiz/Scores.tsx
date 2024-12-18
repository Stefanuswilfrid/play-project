import { Text } from "@/components/Text";
import { useQuizScore } from "./store";
import { questions } from "./data";

export function Scores() {
  const score = useQuizScore();

  return (
    <Text
      styles={{
        variant: "h2",
      }}
      className="md:text-center"
    >
      Congratulations! Your score is: {score} / {questions.length}
    </Text>
  );
}
