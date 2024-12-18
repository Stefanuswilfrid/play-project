import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { Transition } from "@/components/Transition";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const cards = [
  {
    title: "Hello",
    desc: "This is a description",
  },
  {
    title: "Hello Word",
    desc: "This is a description 2",
  },
  {
    title: "Hello all",
    desc: "This is a description 3",
  },
  {
    title: "Hello 123",
    desc: "This is a description 4",
  },
];

export default function Experiment() {
  const [progress, setProgress] = React.useState(0);
  const card = cards[progress];

  console.log("render");
  return (
    <div className="py-16 mx-auto max-w-3xl">
      <Text
        styles={{
          variant: "h1",
        }}
      >
        Experiment
      </Text>

      <div className="relative w-full h-80">
        {/* <AnimatePresence>
          <motion.div
            key={progress}
            className="absolute w-full h-full"
            initial={{
              position: "absolute",
              opacity: 0,
              x: 32,
            }}
            animate={{
              position: "absolute",
              opacity: 1,
              x: 0,
              transition: {
                delay: 0.5,
              },
            }}
            exit={{
              position: "absolute",
              opacity: 0,
              x: -32,
            }}
          >
            <Card title={card.title} desc={card.desc} />
          </motion.div>
        </AnimatePresence> */}
        {cards.map((card, i) => {
          return (
            <Transition
              show={progress === i}
              key={i}
              classNames={{
                default: "absolute w-full h-full",
                from: "opacity-0 translate-x-32",
                to: "opacity-100 translate-x-0 delay-500",
                exit: "opacity-0 -translate-x-32",
              }}
            >
              <Card title={card.title} desc={card.desc} />
            </Transition>
          );
        })}
      </div>

      <Button onClick={() => setProgress((progress + 1) % cards.length)}>NEXT</Button>
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <Text
        styles={{
          variant: "h2",
        }}
      >
        {title}
      </Text>
      <Text>{desc}</Text>
    </div>
  );
}
