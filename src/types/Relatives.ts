import Product from "./Product"

export default interface Relatives {
  value: string
  changes: Partial<Product>
}
