"use server";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";


export const createRoomAction = async () => {
  const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
  const roomCode = await fetchMutation(api.room.createRoom, { clerkId: userId });
  console.log("roomcode: " + roomCode);
  redirect(`room/${roomCode}`);
};

export const joinRoomAction = async () => {};
