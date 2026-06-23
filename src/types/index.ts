export type RoleType = 'user' | 'ai'
export type ThemeType = 'dark' | 'light'

export interface MessageType {
  id: string
  role: RoleType
  content: string
  timestamp: string
  like?: boolean
  dislike?: boolean
  isTyping?: boolean
}

export interface ChatType {
  id: string
  title: string
  createdAt: string
  updatedAt: string
}

export interface PresetType {
  id: string
  name: string
  description: string
}
