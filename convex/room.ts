import { v } from "convex/values";
import { mutation, query, MutationCtx } from "./_generated/server";

const generateRandomRoomCode = async (ctx: MutationCtx) => {
  while (true) {
    const randomRoomCode = Math.floor(100000 + Math.random() * 900000);

    const existingRoom = ctx.db
      .query("room")
      .withIndex("byRoomCode", (q) => q.eq("roomCode", randomRoomCode))
      .unique();

    if (!existingRoom) return randomRoomCode;
  }
};

export const getRooms = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const createRoom = mutation({
  args: {
    clerkId: v.string(),
  },
    handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      console.log("User not found for creating room with clerkId: " + args.clerkId);
      return;
    }

    const roomcode = await generateRandomRoomCode(ctx);

    await ctx.db.insert("room", {
      roomCode: roomcode,
      hostId: user._id,
      createdAt: Date.now(),
      currentSongState: false,
      currentLoopState: "none",
      currentSongProgress: 0.0,
      joinedUsers: [user._id],
    });

    return roomcode;
  },
});

export const joinRoom = mutation({
  args: {
    roomCode: v.number(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();
    if (!user) {
      console.log("User not found joining room with clerkId: " + args.clerkId);
      return;
    }

    const room = await ctx.db
      .query("room")
      .withIndex("byRoomCode", (q) => q.eq("roomCode", args.roomCode))
      .unique();

    if (!room)
      return console.log(`room not found with room code: ${args.roomCode}`);

    await ctx.db.patch(room._id, {
      joinedUsers: [user._id],
    });
  },
});

export const leaveRoom = mutation({
  args: {
    roomCode: v.number(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();
    if (!user) {
      console.log("User not found while leaving room with clerkId: " + args.clerkId);
      return;
    }

    const room = await ctx.db
      .query("room")
      .withIndex("byRoomCode", (q) => q.eq("roomCode", args.roomCode))
      .unique();
    if (!room)
      return console.log(`room not found with room code: ${args.roomCode}`);

    const updatedUsers = room.joinedUsers.filter(
      (userId) => userId !== user._id
    );
    await ctx.db.patch(room._id, {
      joinedUsers: updatedUsers,
    });
  },
});
