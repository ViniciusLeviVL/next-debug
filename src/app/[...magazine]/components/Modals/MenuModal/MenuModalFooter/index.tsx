import { Mail } from "lucide-react"
import LinkButton from "../LinkButton"
import { WhatsappIcon } from "@/../public/assets/img/copyright-icons"

export default function MenuModalFooter() {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <h2 className="font-semibold">CONTATO</h2>
      <ul className="flex gap-7">
        <li className="flex items-center">
          <LinkButton
            HoverContent={
              <p className="rounded bg-neutral-50 px-1 py-0.5 font-medium shadow-sm dark:bg-black">
                (21) 9 7904-0595
              </p>
            }
          >
            <a
              href="https://api.whatsapp.com/send?phone=5521979040595&text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20cat%C3%A1logos"
              target="_blank"
              rel="noreferrer"
              className="text-green-600 hover:text-green-700"
            >
              <WhatsappIcon className="size-6" />
            </a>
          </LinkButton>
        </li>
        <li className="flex items-center">
          <LinkButton
            HoverContent={
              <p className="rounded bg-neutral-50 px-1 py-0.5 font-medium shadow-sm dark:bg-black">
                suporte@ecfacil.com.br
              </p>
            }
          >
            <a
              href="mailto:suporte@ecfacil.com.br"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-800 hover:text-neutral-950 dark:text-neutral-50 dark:hover:bg-neutral-50/80"
            >
              <Mail />
            </a>
          </LinkButton>
        </li>
      </ul>
    </div>
  )
}
