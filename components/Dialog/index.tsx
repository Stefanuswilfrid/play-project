import * as RadixDialog from "@radix-ui/react-dialog";
import React from "react";

import { useDialogState } from "./hook";
import { cn } from "@/utils/cn";

type DialogContextProps = {
  canEscape: boolean;
  overlayRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  closeDialog: () => void;
  openDialog: () => void;
  needAuth?: boolean;
};

const DialogContext = React.createContext({} as DialogContextProps);

export function useDialog() {
  return React.useContext(DialogContext);
}

type DialogProps = {
  children: React.ReactNode;
  canEscape?: boolean;
  triggerKey?: string;
  needAuth?: boolean;
};

export function Dialog({ children, canEscape = true, triggerKey, needAuth }: DialogProps) {
  const { open, onOpenChange, overlayRef, contentRef } = useDialogState();

  // Toggle the menu when ⌘[trigger_key] is pressed
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === triggerKey && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [triggerKey, onOpenChange, open]);

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <DialogContext.Provider
        value={{
          canEscape,
          overlayRef,
          contentRef,
          needAuth,
          closeDialog: () => onOpenChange(false),
          openDialog: () => onOpenChange(true),
        }}
      >
        {children}
      </DialogContext.Provider>
    </RadixDialog.Root>
  );
}

type DialogContentProps = {
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
};

function DialogContent({ children, className, overlayClassName }: DialogContentProps) {
  const { overlayRef, contentRef, canEscape, closeDialog } = useDialog();

  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay
        ref={overlayRef}
        data-dialog-overlay
        data-dialog-state="initial"
        className={cn("fixed inset-0 z-30 w-full h-full bg-black/60 brightness-0", overlayClassName)}
      />
      <RadixDialog.Content
        ref={contentRef}
        data-dialog-content
        data-dialog-state="initial"
        className={cn(
          "fixed z-30 top-1/2 left-1/2 shadow-md",
          "max-h-dialog overflow-y-auto scrollbar",

          // default
          "w-full max-w-[540px] rounded-md",

          // desktop styles override
          "w-[calc(100%-1rem)] xs:w-[calc(100%-2rem)]",
          "[--scale-from:1] [--scale-to:1]",
          "[--y-from:-50%] [--y-to:-50%]",

          // mobile styles override
          // "max-xs:[--y-from:100%] max-xs:[--y-to:0%]",
          className
        )}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
          if (canEscape) closeDialog();
        }}
        onPointerDownOutside={(e) => {
          e.preventDefault();
          if (canEscape) closeDialog();
        }}
        onInteractOutside={(e) => {
          e.preventDefault();
          if (canEscape) closeDialog();
        }}
      >
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

Dialog.Content = DialogContent;

Dialog.Trigger = RadixDialog.Trigger;

Dialog.Close = RadixDialog.Close;
