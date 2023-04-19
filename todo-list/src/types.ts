// src/types.ts

export interface Todo {
  id: string
  title: string
  estimatedHours: number
  responsible: Responsible
  selected: boolean
}

export interface Responsible {
  id: string
  name: string
}
