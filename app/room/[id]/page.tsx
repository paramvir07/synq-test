import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@base-ui/react";
import { Crown, Group, Menu, Play, User } from "lucide-react";

const page = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger className="left-0 top-0 absolute p-4">
          <Menu />
        </SheetTrigger>
        <SheetPopup side="left">
          <SheetHeader>
            <SheetTitle className="font-bold"># Room 234165</SheetTitle>
            <div className="flex items-center gap-3 mt-5">
              <Play size={20} />
              <div>PLAYBACK PERMISSIONS</div>
            </div>

                      <div className="flex gap-4">
                          <Button><User/>Everyone</Button>
                          <Button><Crown /> Admins</Button>
                      </div>
                      <Separator className="border-2 border-white/10 w-full"/>
          </SheetHeader>
          <SheetPanel>Content</SheetPanel>
          <SheetFooter>
            <SheetClose>Close</SheetClose>
          </SheetFooter>
        </SheetPopup>
      </Sheet>
    </>
  );
};

export default page;
