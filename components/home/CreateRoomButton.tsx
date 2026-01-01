"use client";
import { CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";

const CreateRoomButton = ({ clerkId }: { clerkId: string | null }) => {
  const createRoom = useMutation(api.room.createRoom);

  const handleClick = async () => {
    if (!clerkId) throw new Error("Unauthorized");
    const roomCode = await createRoom({ clerkId });
    console.log("roomcode: " + roomCode);
    redirect(`room/${roomCode}`);
  };
  return (
    <Button variant={"outline"} onClick={handleClick}>
      <CirclePlus /> Create a Room
    </Button>
  );
};

export default CreateRoomButton;
