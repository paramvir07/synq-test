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