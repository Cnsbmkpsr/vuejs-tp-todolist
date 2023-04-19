<!-- src/components/TodoList.vue -->
<template>
  <div>
    <div v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)" />
      <span>{{ todo.title }} - {{ todo.estimatedHours }} heures - {{ todo.responsible.name }}</span>
      <button @click="deleteTodo(todo.id)">Supprimer</button>
    </div>
    <button @click="deleteSelectedTodos">Supprimer les tâches sélectionnées</button>
    <div>
      Filtres :
      <button @click="setFilter('all')">Tout afficher</button>
      <button @click="setFilter('selected')">Afficher les sélectionnés</button>
      <button @click="setFilter('unselected')">Afficher les non-sélectionnés</button>
    </div>
    <div>
      Tâches totales : {{ todos.length }} | Tâches sélectionnées : {{ selectedTodos.length }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '../store'

const store = useTodoStore()

const { todos, filteredTodos, selectedTodos } = store

const updateTodo = (todo) => {
  store.updateTodo({
    ...todo,
    completed: !todo.completed
  })
}

const deleteTodo = (todoId) => {
  store.deleteTodo(todoId)
}

const deleteSelectedTodos = () => {
  store.selectedTodos.forEach((todo) => {
    store.deleteTodo(todo.id)
  })
}

const setFilter = (filter) => {
  store.setFilter(filter)
}
</script>
