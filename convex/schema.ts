import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    fullname: v.string(),
    pfp: v.optional(v.string()),
    username: v.string(),
    email: v.string(),
}).index("byClerkId", ["clerkId"]).index("byUsername", ["username"]).index("byEmail", ["email"]),

  songs: defineTable({
    title: v.string(),
    artist: v.string(),
    coverImg: v.optional(v.string()),
    uploadedBy: v.string(),
    createdAt: v.number(),
  }).index("byTitle", ['title']).index("byArtist", ['artist']).index("byUploadedBy",['uploadedBy']),

  room: defineTable({
    roomCode: v.number(),
    hostId: v.string(),
    createdAt: v.number(),
    songsQueue: v.optional(v.array(v.string())),
    currentSong: v.optional(v.string()),
    currentSongState: v.boolean(), //default set to false
    currentLoopState: v.string(), //album or song or none
    currentSongProgress: v.number(),
    joinedUsers: v.array(v.string())
  }).index("byRoomCode", ["roomCode"]).index("byHostId", ["hostId"]),
});