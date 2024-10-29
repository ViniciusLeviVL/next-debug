/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { XCircle } from "lucide-react"
import WelcomeForm from "./components/WelcomeForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog-without-close-button"
import { useEffect, useState } from "react"
import { useClientContext } from "@/context/clientContext"
import { z } from "zod"
import { toast } from "sonner"
import { getWelcomeFormSchema } from "./components/WelcomeForm/schemas/FormSchema"
import { useCatalog } from "@/app/[...magazine]/hooks/useCatalog"
import { useParams } from "next/navigation"
import { saveWelcomeData } from "@/entities/company"

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [setName, setPhone] = useClientContext((s) => [
    s.setName,
    s.setPhoneNumber
  ])
  const preferences = useCatalog()?.welcomePreferences
  const [company_id] = useParams<{
    magazine: [company_id: string, catalog_name: string]
  }>().magazine

  useEffect(() => {
    if (!preferences) return
    const clientJson = localStorage.getItem("client/v1")

    if (!clientJson) {
      setIsOpen(true)
      return
    }

    const name = JSON.parse(clientJson).state.name
    const phone = JSON.parse(clientJson).state.phoneNumber

    if (
      (!name && preferences.nameIsRequired) ||
      (!phone && preferences.phoneIsRequired)
    )
      setIsOpen(true)
  }, [preferences])

  if (!preferences) return

  const formSchema = getWelcomeFormSchema(preferences)

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const { name, phoneNumber } = data

      await saveWelcomeData({
        company_id: Number(company_id),
        name,
        phone: phoneNumber
      })

      setName(name)
      setPhone(phoneNumber)
      setIsOpen(false)

      toast.success("Seus dados foram salvos com sucesso!", {
        action: {
          label: "Desfazer",
          onClick: () => {
            setName(undefined)
            setPhone(undefined)
            setIsOpen(true)
          }
        }
      })
    } catch (error) {
      console.error(error)
      toast.error("Não foi possível salvar os seus dados!")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-11/12 max-w-80 overflow-hidden rounded-md px-2">
        <button
          className="absolute right-2 top-2 items-center justify-end text-neutral-500 hover:text-neutral-700"
          onClick={() => setIsOpen(false)}
        >
          <XCircle strokeWidth={1} />
        </button>
        <DialogHeader>
          <DialogTitle className="text-center">SEJA BEM-VINDO/A</DialogTitle>
          <DialogDescription className="text-center">
            Fique por dentro de todas as novidades!
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto">
          <WelcomeForm onSubmit={onSubmit} preferences={preferences} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
