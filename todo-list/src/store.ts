// src/store.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Todo {
  id: string
  title: string
  estimatedHours: number
  responsible: Responsible
  completed: boolean
}

interface Responsible {
  id: string
  name: string
}

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: [] as Todo[],
    responsables: [
      {
        id: '1',
        name: 'Billy'
      },
      {
        id: '2',
        name: 'David'
      }
    ] as Responsible[],
    filter: 'all' as 'all' | 'selected' | 'unselected',
    editingTodo: ref(null) as Todo | null
  }),
  getters: {
    filteredTodos() {
      if (this.filter === 'all') {
        return this.todos
      } else if (this.filter === 'selected') {
        return this.todos.filter((todo) => todo.completed)
      } else {
        return this.todos.filter((todo) => !todo.completed)
      }
    },
    selectedTodos() {
      return this.todos.filter((todo) => todo.completed)
    }
  },
  actions: {
    addTodo(todo: Todo) {
      this.todos.push(todo)
    },
    editingTodo(todo: Todo) {
      const index = this.todos.findIndex((t) => t.id === todo.id)
      if (index !== -1) {
        this.todos[index] = todo
      }
    },
    deleteTodo(todoId: string) {
      this.todos = this.todos.filter((todo) => todo.id !== todoId)
    },
    setFilter(filter: 'all' | 'selected' | 'unselected') {
      this.filter = filter
    },
    setEditingTodo(todo: Todo | null) {
      console.log('edit todo')
      this.editingTodo = todo
    }
  }
})
