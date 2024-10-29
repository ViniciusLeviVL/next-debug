import ClickableMask from "./ClickableMask"
import Pin from "./Pin"

export default interface Catalog {
  id: number
  company_id: number
  title: string
  pagesOrder: string[]
  pins?: Pin[]
  clickableMasks?: ClickableMask[]
  welcomePreferences: WelcomePreferences
}

export interface WelcomePreferences {
  nameIsRequired?: boolean
  phoneIsRequired?: boolean
}
