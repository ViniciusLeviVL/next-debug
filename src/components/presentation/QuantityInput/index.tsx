import { Minus, Plus } from "lucide-react"

type QuantityInputProps = {
  quantity: number
  onClickMinus: () => void
  onClickPlus: () => void
}

export default function QuantityInput({
  quantity,
  onClickMinus,
  onClickPlus
}: QuantityInputProps) {
  return (
    <div className="mx-2 flex items-center justify-center sm:mx-4">
      <button
        className="flex items-center justify-center text-xl no-underline opacity-25 transition-colors first:-top-2.5 hover:opacity-40 active:opacity-40"
        onClick={(e) => {
          e.preventDefault()
          onClickMinus()
        }}
      >
        <Minus />
      </button>
      <span className="mx-4 font-mono text-[#868686]">{quantity}</span>
      <button
        className="flex cursor-pointer items-center justify-center text-2xl no-underline opacity-25 transition-colors first:-top-2.5 hover:opacity-40 active:opacity-40"
        onClick={(e) => {
          e.preventDefault()
          onClickPlus()
        }}
      >
        <Plus />
      </button>
    </div>
  )
}
