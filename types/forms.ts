import type { EventSumary } from './events'

export enum QuestionType {
  FreeText,
  MultipleChoice,
  SingleChoice,
}

export interface FormQuestion {
  name: string
  field: string
  description?: string
  isRequired: boolean
  type: QuestionType
  options?: any[]
}

export interface Form {
  id: number
  name: string
  isActive: boolean
  coverImage: string | null | File
  createdAt: string
  updatedAt: string
  eventId: number
  event: EventSumary
}
