import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { Dialog } from "@/components/Dialog";
import { useRouter } from "next/navigation";
import { CloseIcon } from "@/components/Svg";

export function ExitDialog() {
  const router = useRouter();
  return (
    <Dialog>
      <Dialog.Trigger className="shrink-0">
        <CloseIcon />
      </Dialog.Trigger>
      <Dialog.Content className="max-w-[384px] flex flex-col items-center bg-white rounded-2xl px-8 pt-8 pb-4">
        <Text
          styles={{
            variant: "h3",
            color: "softblack",
          }}
          className="mt-4"
        >
          Wait, don&apos;t go!
        </Text>
        <Text
          styles={{
            variant: "span",
          }}
          className="text-center mt-4"
          color="darkgray"
        >
          You&apos;re right on track! If you quit now, you&apos;ll lose your progress.
        </Text>
        <Dialog.Close asChild>
          <Button textSize="small" size="large" variant="sky" className="w-full mt-8">
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
