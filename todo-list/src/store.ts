// src/store.ts
import { reactive } from 'vue'
import { Todo, Responsible } from './types'

export const state = reactive({
  todos: [] as Todo[],
  responsables: [
    {
      id: '1',
      name: 'Billy'
    }
  ] as Responsible[],
  filter: 'all'
})

export const addTodo = (todo: Todo) => {
  state.todos.push(todo)
}

export const canAssignTask = (responsible: Responsible, estimatedHours: number): boolean => {
  const tasks = state.todos.filter((todo) => todo.responsible.id === responsible.id)
  if (tasks.length >= 3) {
    return false
  }

  const totalHours = tasks.reduce((total, task) => total + task.estimatedHours, 0)
  return totalHours + estimatedHours <= 10
}

export const updateTodo = (todo: Todo) => {
  const index = state.todos.findIndex((t) => t.id === todo.id)
  if (index !== -1) {
    state.todos[index] = todo
  }
}

export const deleteTodo = (todoId: string) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId)
}

export const useStore = () => {
  return {
    todos: state.todos,
    responsables: state.responsables,
    filter: state.filter,
    addTodo,
    updateTodo,
    deleteTodo
  }
}
