'use client'
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";

const page = () => {
  return (
    <div>
 <Authenticated>
        <UserButton />
        <div>Hello</div>
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>

    </div>
  )
}

export default page