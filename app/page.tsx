import { SignedIn, UserButton } from "@clerk/nextjs"

const page = () => {
  return (
    <div>
      <SignedIn>
        <UserButton/>
      </SignedIn>

    </div>
  )
}

export default page