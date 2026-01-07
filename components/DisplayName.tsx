"use client"
import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { AuroraText } from "./ui/aurora-text"
import { displayNameAtom } from "@/atoms/atoms"
import { generateRandomName } from "@/lib/generateName"
import { Button } from "./ui/button"

const DisplayName = () => {
    const [regenerate, setRegenerate] = useState(false)
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        if (!displayName) setDisplayName(generateRandomName());
    }, [displayName, setDisplayName, regenerate])

    useEffect(() => {
      setDisplayName(generateRandomName());
    }, [regenerate]);
    
    
    return (
      <>
        <div>
          Hi, <AuroraText>{displayName}</AuroraText>{" "}
            </div>
            <Button onClick={() => setRegenerate(v => !v)}> Regenerate </Button>
      </>
    );
}

export default DisplayName