import { createContext } from "react"

export type LinkContent = {
  link: any | null
  setNewLink: (c: string) => void,
  removeLink: () => void
}

export const LinkContext = createContext<any>(null)