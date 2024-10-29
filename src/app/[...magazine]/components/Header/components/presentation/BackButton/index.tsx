"use client"

import { isRunningStandalone } from "@/lib/utils"
import { UndoIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function BackButton() {
  const router = useRouter()
  const [isPWA, setIsPWA] = useState(false)

  useEffect(() => {
    setIsPWA(isRunningStandalone())
  }, [])

  return (
    <button className={isPWA ? "" : "hidden"} onClick={() => router.back()}>
      <UndoIcon className="h-5 w-5 text-neutral-600 hover:text-neutral-900 dark:text-neutral-50 dark:hover:text-neutral-50/90" />
    </button>
  )
}
