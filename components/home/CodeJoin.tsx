import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { CirclePlus } from "lucide-react";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import CreateRoomButton from "./CreateRoomButton";
import { auth } from "@clerk/nextjs/server";



export default async function CodeJoin() {
  const { userId } = await auth();
  return (
    <Dialog>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            <CirclePlus />
          </TooltipTrigger>
          <TooltipPopup>Join</TooltipPopup>
        </Tooltip>
      </DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <Form className="contents">
          <DialogHeader>
            <DialogTitle>Join a Room</DialogTitle>
            <DialogDescription>
              Enter a room code to join or create a new room.
            </DialogDescription>
          </DialogHeader>
          <DialogPanel className="grid gap-4 items-center justify-center">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </DialogPanel>

          <DialogFooter>
            <CreateRoomButton clerkId={ userId } />

            <Button type="button">Join</Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
