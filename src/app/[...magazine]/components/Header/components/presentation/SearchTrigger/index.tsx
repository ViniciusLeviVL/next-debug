import SearchModal from "@/app/[...magazine]/components/Modals/SearchModal"
import { SearchIcon } from "lucide-react"

export default function SearchTrigger() {
  return (
    <SearchModal>
      <button>
        <SearchIcon className="size-5 text-neutral-600 hover:text-neutral-900 dark:text-neutral-50 dark:hover:text-neutral-50/90" />
      </button>
    </SearchModal>
  )
}
