import Relatives from "./Relatives"

export default interface Product {
  id: number
  description: string
  price: number
  reference: string
  page: string
  codes?: string[]
  colors?: string[]
  sizes?: string[]
  relatives?: Relatives[]
}
