export default interface Pin {
  id: number
  category_id: number
  image_number: string
  button_number: string
  top: number
  left: number
  reference: string
  codes: string
  colors: string
  sizes: string
  type: number
  description: string
  price: number
  posicao_matriz: number
  size?: string
  animation?: string
  relatives?: string | null
}
