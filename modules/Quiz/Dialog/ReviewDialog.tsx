import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { Dialog, useDialog } from "@/components/Dialog";
import { useRouter } from "next/navigation";
import { useQuizStats } from "../store";
import React from "react";

export function ReviewDialog() {
  const router = useRouter();

  const { resetFalsesInARow } = useQuizStats();

  return (
    <Dialog canEscape={false}>
      <OpenReviewDialog />
      <Dialog.Content className="max-w-[384px] flex flex-col items-center bg-white rounded-2xl px-8 pt-8 pb-4">
        <Text
          styles={{
            variant: "h3",
            color: "softblack",
          }}
          className="mt-4"
        >
          Review notice:
        </Text>
        <Text
          styles={{
            variant: "span",
          }}
          className="text-center mt-4"
          color="darkgray"
        >
          You answered two incorrect questions in a row. Would you like to review the questions?
        </Text>

        <Dialog.Close asChild>
          <Button
            onClick={() => {
              resetFalsesInARow();
            }}
            textSize="small"
            size="large"
            variant="sky"
            className="w-full mt-8"
          >
            KEEP LEARNING
          </Button>
        </Dialog.Close>

        <Dialog.Close asChild>
          <Button
            onClick={() => {
              setTimeout(() => {
                router.back();
              }, 500);
            }}
            textSize="small"
            variant="ghost"
            size="large"
            className="w-full mt-2"
          >
            END SESSION
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog>
  );
}

function OpenReviewDialog() {
  const { falsesInARow } = useQuizStats();

  const { openDialog } = useDialog();

  React.useEffect(() => {
    if (falsesInARow === 2) {
      openDialog();
    }
  }, [falsesInARow, openDialog]);

  return null;
}
