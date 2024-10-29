"use client"

import ErrorImage from "@/../public/assets/img/404.png"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { AlertCircleIcon } from "lucide-react"

type ErrorCartProps = {
  messages: string[]
  handleClick: () => void
}

export default function ErrorCart({ messages, handleClick }: ErrorCartProps) {
  return (
    <div className="flex h-full flex-wrap content-center justify-center gap-y-10">
      <Image src={ErrorImage} alt="Imagem de Erro" />
      <div className="flex flex-col items-start space-y-2">
        {messages.map((msg, index) => (
          <p key={index} className="flex items-center gap-2">
            <AlertCircleIcon className="size-5" />
            <span className="max-w-[calc(100%-28px)]">{msg}</span>
          </p>
        ))}
      </div>
      <Button onClick={handleClick}>Voltar</Button>
    </div>
  )
}
