import CartModal from "@/app/[...magazine]/components/Modals/CartModal"
import CartButton from "./components/CartButton"

export default function CartTrigger() {
  return (
    <CartModal>
      <button>
        <CartButton />
      </button>
    </CartModal>
  )
}
