import { Button } from "@/components/Button";
import { prefetchLottie } from "@/components/Lottie";
import { Text } from "@/components/Text";
import Image from "next/image";
import { useRouter } from "next/navigation";

prefetchLottie("duo-loading");
prefetchLottie("progress-bar-splash");

export default function HomePage() {
  const router = useRouter();
  return (
    <main className="mx-auto max-w-3xl p-4 sm:p-8">
      <Text
        styles={{
          variant: "h1",
        }}
        as="h1"
      >
        Todays Parenting Quiz
      </Text>

      <div className="flex mt-6 gradient rounded-2xl h-80 w-full overflow-hidden">
        <div className="flex-1 px-6 pt-6 pb-8 h-full flex flex-col justify-between">
          <div>
            <Text
              styles={{
                variant: "h2",
                color: "white",
              }}
              as="h2"
            >
              Strengthen Your Parenting Knowledge
            </Text>

            <Text
              className="mt-3"
              styles={{
                color: "white",
              }}
            >
              Test your understanding with this quick quiz to reinforce key parenting strategies
            </Text>
          </div>

          <Button variant="secondary" onClick={() => router.push("/practice")}>
            START QUIZ
          </Button>
        </div>

        <div className="relative translate-x-1 min-w-[30%] flex items-end justify-end">
          <Image
            src="https://d35aaqx5ub95lt.cloudfront.net/images/practiceHub/6a52992125c91e4966ac4df34af93f57.svg"
            alt="parenting quiz"
            width={164}
            height={253}
          />
        </div>
      </div>
    </main>
  );
}
