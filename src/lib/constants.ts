export interface Post {
  userId: string
  content: string
  mood: number
  title?: string
}
export interface PatchEntry {
  title?: string
  content?: string
  mood?: number
}

export interface Data {
  id: string
  title?: string
  content?: string
  mood?: number
}

export interface PageProps {
  params: Promise<{ slug: string }>
}

export interface Entry {
  title: string
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  content: string
  mood: number
}

export interface SearchProp {
  icon: React.ReactNode
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export type User = { id: string; email: string } | null

export interface NavbarProps {
  serverUser?: User | null
}
