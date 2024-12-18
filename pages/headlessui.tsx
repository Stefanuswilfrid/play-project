import React from "react";
// import { Transition } from "@headlessui/react";
import { TransitionChild } from "@/components/TransitionChild";
import clsx from "clsx";

const colors = [
  "bg-black",
  "bg-gray",
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
];

export default function Headlessui() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  return (
    <div className="max-w-5xl mx-auto p-12">
      <div className="relative w-80 h-80">
        {colors.map((color, i) => {
          return (
            // <Transition
            //   enter="absolute duration-300"
            //   enterFrom="translate-x-1/2 opacity-0"
            //   enterTo="translate-x-0 opacity-100"
            //   leave="absolute duration-300"
            //   leaveFrom="translate-x-0 opacity-100"
            //   leaveTo="-translate-x-1/2 opacity-0"
            //   key={color}
            //   show={currentIndex === i}
            // >
            //   <div className={clsx("w-80 h-80 rounded-lg", color)}></div>
            // </Transition>
            <TransitionChild
              key={color}
              show={currentIndex === i}
              classNames={{
                from: "absolute translate-x-1/2 opacity-0",
                to: "absolute translate-x-0 opacity-100 delay-300",
                exit: "absolute -translate-x-1/2 opacity-0",
              }}
            >
              <div className={clsx("w-80 h-80 rounded-lg", color)}></div>
            </TransitionChild>
          );
        })}
      </div>

      <button onClick={() => setCurrentIndex(currentIndex + 1)}>NEXT</button>
    </div>
  );
}
