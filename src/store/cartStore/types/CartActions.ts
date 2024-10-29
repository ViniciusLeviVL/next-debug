import CartItem from "../../../types/CartItem"

export default interface CartActions {
  addToCart: (item: CartItem) => void
  updateQuantity: (item: CartItem, amount: number) => void
  removeFromCart: (item: CartItem) => void
  saveLastCart: () => void
  restoreLastCart: () => void
  clearCart: () => void
}
