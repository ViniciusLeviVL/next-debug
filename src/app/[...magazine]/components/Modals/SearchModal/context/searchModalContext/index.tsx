// Zustand
import { create } from "zustand"

export type SearchModalContextType = {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  closeModal: () => void
}

export const useSearchModalContext = create<SearchModalContextType>()(
  (set) => ({
    isOpen: false,
    setIsOpen: (state) => {
      set(() => ({ isOpen: state }))
    },
    closeModal: () => {
      set(() => ({ isOpen: false }))
    }
  })
)
