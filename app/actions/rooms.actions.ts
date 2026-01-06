"use server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const getclerkId = async() => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return userId
}

export const getRoomsAction = async () => {
  const rooms = fetchQuery(api.room.getRooms);
  console.log("rooms in server action: ", rooms)
}

export const createRoomAction = async () => {
    const clerkId = await getclerkId();

    const roomCode = await fetchMutation(api.room.createRoom, { clerkId });

    redirect(`/room/${roomCode}`);

};

export const joinRoomAction = async (formData: FormData) => {
    const clerkId = await getclerkId();

    const roomCode = Number(formData.get("roomCode"));
    if (!roomCode) throw new Error("Room Code not found");
    await fetchMutation(api.room.joinRoom, { roomCode, clerkId });

    redirect(`/room/${roomCode}`);
};


