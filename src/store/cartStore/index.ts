// Types
import CartStates from "./types/CartState"
import CartActions from "./types/CartActions"
// Zustand
import { create } from "zustand"
import { persist } from "zustand/middleware"
// Others
import { toast } from "sonner"

export const useCartStore = create<CartStates & CartActions>()(
  persist(
    (set, get) => ({
      lastCart: [],
      cartItems: [],
      addToCart: (newItem) => {
        const existingItemIndex = get().cartItems.findIndex(
          (item) =>
            item.id === newItem.id &&
            item.code === newItem.code &&
            item.color === newItem.color &&
            item.size === newItem.size
        )
        if (existingItemIndex !== -1) {
          set((state) => ({
            cartItems: state.cartItems.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            )
          }))
        } else {
          set((state) => ({
            cartItems: [...state.cartItems, newItem]
          }))
        }
        // Toast
        toast.success(
          newItem.quantity === 1
            ? "1 item adicionado à sacola"
            : `${newItem.quantity} itens adicionados à sacola`,
          {
            duration: 4000,
            description: newItem.description,
            action: {
              label: "Desfazer",
              onClick: () => {
                if (existingItemIndex !== -1) {
                  set((state) => ({
                    cartItems: state.cartItems.map((item, index) =>
                      index === existingItemIndex
                        ? {
                            ...item,
                            quantity: item.quantity - newItem.quantity
                          }
                        : item
                    )
                  }))
                } else {
                  set((state) => ({
                    cartItems: state.cartItems.filter(
                      (item) =>
                        !(
                          item.id === newItem.id &&
                          item.reference === newItem.reference &&
                          item.size === newItem.size &&
                          item.color === newItem.color
                        )
                    )
                  }))
                }
              }
            }
          }
        )
      },
      updateQuantity: (item, amount) => {
        const { id, code, color, size, quantity } = item
        const updatedCartItems = get().cartItems.map((item) => {
          if (
            item.id === id &&
            item.code === code &&
            item.color === color &&
            item.size === size
          ) {
            if (amount === -1 && quantity === 1) {
              return item
            }
            return {
              ...item,
              quantity: quantity + amount // Update quantity directly
            }
          }
          return item
        })
        set(() => ({
          cartItems: updatedCartItems
        }))
      },
      removeFromCart: (item) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (_item) =>
              !(
                _item.id === item.id &&
                _item.reference === item.reference &&
                _item.size === item.size &&
                _item.color === item.color
              )
          )
        }))
        // Toast
        toast.error(
          item.quantity === 1
            ? "1 item removido da sacola"
            : `${item.quantity} itens removidos da sacola`,
          {
            duration: 2000,
            description: item.description,
            action: {
              label: "Desfazer",
              onClick: () => {
                set((state) => ({
                  cartItems: [...state.cartItems, item]
                }))
              }
            }
          }
        )
      },
      clearCart: () => {
        set(() => ({ cartItems: [] }))
      },
      saveLastCart: () => {
        if (get().cartItems.length > 0) {
          set(() => ({ lastCart: get().cartItems }))
        }
      },
      restoreLastCart: () => {
        set(() => ({ cartItems: get().lastCart }))
      }
    }),
    { name: "cartItems" }
  )
)
