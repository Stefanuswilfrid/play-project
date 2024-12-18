import { cn } from "@/utils/cn";
import * as React from "react";

type TransitionState = "from" | "to" | "exit" | "exited";

type TransitionProps = {
  children: React.ReactNode;
  show?: boolean;
  classNames: {
    default?: string;
    from: string;
    to: string | string[];
    exit: string;
  };
  removeOnExit?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

export const Transition = React.memo(
  function Transition({ show, children, ...rest }: TransitionProps) {
    const transitionStateRef = React.useRef<TransitionState>("exited");
    const [_, rerender] = React.useState({});

    if (transitionStateRef.current === "exited" && !show) return null;

    return (
      <TransitionChild show={show} transitionStateRef={transitionStateRef} rerender={rerender} {...rest}>
        {children}
      </TransitionChild>
    );
  },
  (prev, curr) => prev.show === curr.show
);

function TransitionChild({
  children,
  classNames,
  show,
  removeOnExit,
  transitionStateRef,
  rerender,
  ...rest
}: {
  transitionStateRef: React.MutableRefObject<TransitionState>;
  rerender: React.Dispatch<React.SetStateAction<{}>>;
} & TransitionProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  // Sequential transitions
  const currentIndex = React.useRef(0);
  const isSequential = Array.isArray(classNames.to);

  const transitionTo = React.useCallback(
    (state: TransitionState) => {
      transitionStateRef.current = state;

      switch (state) {
        case "from":
          removeClassNames(ref, classNames.exit);
          addClassNames(ref, classNames.from);

          // trigger reflow (https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
          ref.current?.offsetHeight;
          transitionTo("to");
          break;

        case "to":
          removeClassNames(ref, classNames.from);

          if (typeof classNames.to === "string") {
            addClassNames(ref, classNames.to);
          } else {
            addClassNames(ref, classNames.to[0]);
          }
          break;

        case "exit":
          if (typeof classNames.to === "string") {
            removeClassNames(ref, classNames.to);
          } else {
            classNames.to.forEach((className) => {
              removeClassNames(ref, className);
            });
          }

          addClassNames(ref, classNames.exit);
          break;

        case "exited":
          removeClassNames(ref, classNames.exit);
          currentIndex.current = 0;
          rerender({});
          break;
      }
    },
    [classNames, transitionStateRef, rerender]
  );

  React.useEffect(() => {
    if (show) {
      transitionTo("from");
    } else {
      transitionTo("exit");
    }
  }, [show, transitionTo]);

  return (
    <div
      {...rest}
      ref={ref}
      onTransitionEnd={() => {
        if (transitionStateRef.current === "exit") {
          if (removeOnExit) {
            ref.current?.remove();
          } else {
            transitionTo("exited");
          }
        }

        const isEnded = currentIndex.current === (isSequential ? classNames.to.length - 1 : 0);

        if (transitionStateRef.current === "to" && isSequential && !isEnded) {
          currentIndex.current += 1;

          removeClassNames(ref, classNames.to[currentIndex.current - 1]);
          addClassNames(ref, classNames.to[currentIndex.current]);
        }
      }}
      className={cn(
        // default styles
        "duration-300 relative",
        classNames.default,

        // always true on initial mount
        classNames.from
      )}
    >
      {children}
    </div>
  );
}

function addClassNames(ref: React.RefObject<HTMLDivElement>, classNames: string) {
  ref.current?.classList.add(...classNames.split(" "));
}

function removeClassNames(ref: React.RefObject<HTMLDivElement>, classNames: string) {
  ref.current?.classList.remove(...classNames.split(" "));
}
