import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
    args:{
        clerkId: v.string(),
        fullname: v.string(),
        pfp: v.optional(v.string()),
        username: v.string(),
        email: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("users", {
            clerkId: args.clerkId,
            fullname: args.fullname,
            pfp: args.pfp,
            username: args.username,
            email: args.email,
        }); 
    }
})

export const deleteUser = mutation({
    args:{
        clerkId: v.string(),
    },
    handler: async (ctx,args) => {
        const user = await ctx.db.query('users').withIndex('byClerkId', q => q.eq('clerkId',args.clerkId)).unique();

        if(!user){
            console.log('User not found for deletion with clerkId: ' + args.clerkId);
            return;
        }
        await ctx.db.delete(user._id);
        console.log('User deleted with clerkId: ' + args.clerkId);
    }
})

export const updateUser = mutation({
  args: {
    clerkId: v.string(),
    fullname: v.optional(v.string()),
    pfp: v.optional(v.string()),
    username: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkId", q => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      console.log(`User not found for update: ${args.clerkId}`);
      return;
    }

    await ctx.db.patch(user._id, {
      ...(args.fullname !== undefined && { fullname: args.fullname }),
      ...(args.pfp !== undefined && { pfp: args.pfp }),
      ...(args.username !== undefined && { username: args.username }),
      ...(args.email !== undefined && { email: args.email }),
    });
  },
});
