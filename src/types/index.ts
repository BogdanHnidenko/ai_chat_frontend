export type RoleType = 'user' | 'ai'
export type ThemeType = 'dark' | 'light'

export interface MessageType {
  id: string
  role: RoleType
  content: string
  timestamp: Date
  isTyping?: boolean
}

export interface ChatType {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
}

export interface PresetType {
  id: string
  name: string
  description: string
}
