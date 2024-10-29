"use client"

import ShareModal from "@/app/[...magazine]/components/Modals/ShareModal"
import { isRunningStandalone } from "@/lib/utils"
import { Share2Icon } from "lucide-react"
import { useEffect, useState } from "react"

export default function ShareTrigger() {
  const [shouldBeVisible, setShouldBeVisible] = useState(false)

  useEffect(() => {
    const isPWA = isRunningStandalone()
    setShouldBeVisible(
      (isPWA && window.innerWidth > 400) || !isPWA || window.innerWidth < 350
    )
  }, [])

  if (!shouldBeVisible) return null

  return (
    <ShareModal>
      <button>
        <Share2Icon className="size-5 text-neutral-600 hover:text-neutral-900 dark:text-neutral-50 dark:hover:text-neutral-50/90" />
      </button>
    </ShareModal>
  )
}
