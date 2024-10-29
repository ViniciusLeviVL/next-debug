import MenuModal from "@/app/[...magazine]/components/Modals/MenuModal"
import { MenuIcon } from "lucide-react"

export default function MenuTrigger() {
  return (
    <MenuModal>
      <button>
        <MenuIcon className="size-5 cursor-pointer text-neutral-600 hover:text-neutral-900 dark:text-neutral-50 dark:hover:text-neutral-50/90" />
      </button>
    </MenuModal>
  )
}
