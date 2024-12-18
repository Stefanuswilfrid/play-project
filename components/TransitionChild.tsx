import { cn } from "@/utils/cn";
import * as React from "react";

export const TransitionChild = React.memo(_TransitionChild, (prev, curr) => prev.show === curr.show);

function _TransitionChild({
  children,
  initial = true,
  show,
  classNames,
  ...rest
}: {
  children: React.ReactNode;
  initial?: boolean;
  show?: boolean;
  classNames: {
    default?: string;
    from: string;
    to: string | string[];
    exit: string;
  };
} & React.ComponentPropsWithoutRef<"div">) {
  const [transitionState, setTransitionState] = React.useState<"from" | "to" | "exit" | "exited">("exited");

  const ref = React.useRef<HTMLDivElement>(null);

  // Sequential transitions
  const currentIndex = React.useRef(0);
  const isSequential = Array.isArray(classNames.to);

  const isFirst = React.useRef(true);

  React.useEffect(() => {
    if (show) {
      setTransitionState("from");
      if (isFirst.current) {
        isFirst.current = false;
      }
    } else {
      if (isFirst.current) return;
      setTransitionState("exit");
    }
  }, [show]);

  React.useEffect(() => {
    if (transitionState === "from") {
      // trigger reflow (https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
      ref.current?.offsetHeight;
      setTransitionState("to");
    }
  }, [transitionState]);

  const notMounted = transitionState === "from";
  const mounted = transitionState === "to";

  const isExiting = transitionState === "exit";

  if (transitionState === "exited") return null;

  return (
    <div
      {...rest}
      ref={ref}
      onTransitionEnd={() => {
        if (transitionState === "exit") {
          setTransitionState("exited");
          currentIndex.current = 0;
        }

        const isEnded = currentIndex.current === (isSequential ? classNames.to.length - 1 : 0);

        if (transitionState === "to" && isSequential && !isEnded) {
          currentIndex.current += 1;
          ref.current?.classList?.remove(...classNames.to[currentIndex.current - 1].split(" "));
          ref.current?.classList?.add(...classNames.to[currentIndex.current].split(" "));
        }
      }}
      className={cn(
        // default styles
        "duration-300 relative",
        classNames.default,

        initial && {
          // from
          [classNames.from]: notMounted,

          // to
          [typeof classNames.to === "string" ? classNames.to : ""]: mounted,
        },

        // exit
        isExiting && classNames.exit
      )}
    >
      {children}
    </div>
  );
}
