import { v } from "convex/values";
import { mutation, query, MutationCtx } from "./_generated/server";

const generateRandomRoomCode = async (ctx: MutationCtx) => {
  for (let i = 0; i < 10; i++) {
    // try 10 times max
    const randomRoomCode = Math.floor(100000 + Math.random() * 900000);
    const existingRoom = await ctx.db
      .query("room")
      .withIndex("byRoomCode", (q) => q.eq("roomCode", randomRoomCode))
      .unique();
    if (!existingRoom) return randomRoomCode;
  }
  throw new Error("Could not generate unique 6-digit room code after 10 tries");
};

export const getRooms = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("room").collect();
  },
});

// export const createRoom = mutation({
//   args: {
//     clerkId: v.string(),
//   },
//   handler: async (ctx, args) => {

//     const roomcode = await generateRandomRoomCode(ctx);

//     await ctx.db.insert("room", {
//       roomCode: roomcode,
//       hostId: user._id,
//       createdAt: Date.now(),
//       currentSongState: false,
//       currentLoopState: "none",
//       currentSongProgress: 0.0,
//       joinedUsers: [user._id],
//     });

//     return roomcode;
//   },
// });
