import { action, internalMutation, mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from '../convex/_generated/api'


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


export const upsertUser = internalMutation({
  args: {
    clerkId: v.string(),
    fullname: v.string(),
    pfp: v.optional(v.string()),
    username: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("byClerkId", q => q.eq("clerkId", args.clerkId))
      .unique();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        fullname: args.fullname,
        pfp: args.pfp,
        username: args.username,
        email: args.email,
      });
      return existingUser._id;
    } else {
      const id = await ctx.db.insert("users", {
        clerkId: args.clerkId,
        fullname: args.fullname,
        pfp: args.pfp,
        username: args.username,
        email: args.email,
      });
      return id;
    }
  },
});


export const UpsertUserClerkWebhook = action({
    args:{
        clerkId: v.string(),
        fullname: v.string(),
        pfp: v.optional(v.string()),
        username: v.string(),
        email: v.string(),
    },
    handler: async (ctx,args) => {
        await ctx.runMutation(internal.users.upsertUser,args)
    }
})