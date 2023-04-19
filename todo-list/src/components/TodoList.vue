<!-- src/components/TodoList.vue -->
<template>
  <div>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" @change="toggleTodo(todo)" />
        {{ todo.title }} ({{ todo.estimatedHours }}h) - {{ todo.responsible.name }}
        <button @click="deleteTodo(todo.id)">Supprimer</button>
      </li>
    </ul>
    <div><strong>Nombre total de tâches :</strong> {{ todos.length }}</div>
    <div><strong>Tâches sélectionnées :</strong> {{ selectedTodos.length }}</div>
    <button @click="deleteSelectedTodos">Supprimer les tâches sélectionnées</button>
    <br />
    <label>
      <input type="radio" value="all" v-model="filter" @change="setFilter(filter)" /> Toutes
    </label>
    <label>
      <input type="radio" value="selected" v-model="filter" @change="setFilter(filter)" />
      Sélectionnées
    </label>
    <label>
      <input type="radio" value="unselected" v-model="filter" @change="setFilter(filter)" /> Non
      sélectionnées
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '../store'

const store = useTodoStore()

const todos = store.todos
const responsables = store.responsables
const filter = store.filter

const filteredTodos = computed(() => {
  return store.filteredTodos
})

const selectedTodos = computed(() => {
  return store.selectedTodos
})

const toggleTodo = (todo) => {
  store.updateTodo({
    ...todo,
    completed: !todo.completed
  })
}

const deleteTodo = (todoId) => {
  store.deleteTodo(todoId)
}

const deleteSelectedTodos = () => {
  selectedTodos.value.forEach((todo) => {
    store.deleteTodo(todo.id)
  })
}

const setFilter = (filter) => {
  store.setFilter(filter)
}
</script>
