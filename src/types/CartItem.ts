export default interface CartItem {
  id: number
  description: string
  price: number
  reference: string
  page: string
  color?: string
  size?: string
  code?: string
  quantity: number
}
