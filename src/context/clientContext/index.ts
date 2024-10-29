// Types
import ClientState from "./types/ClientState"
import ClientActions from "./types/ClientActions"
// Zustand
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useClientContext = create<ClientState & ClientActions>()(
  persist(
    (set) => ({
      setName: (name) => {
        set(() => ({ name }))
      },
      setPhoneNumber: (phoneNumber) => {
        set(() => ({ phoneNumber }))
      }
    }),
    { name: "client/v1" }
  )
)
