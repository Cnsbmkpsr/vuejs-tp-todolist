<!-- src/components/TodoList.vue -->
<template>
  <div>
    <h1>Ma liste de tâches</h1>
    <TodoForm />
    <TodoCounter />
    <TodoFilter />
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" />
        <span
          >{{ todo.title }} - {{ todo.estimatedHours }} heures - {{ todo.responsible.name }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../store'
import TodoForm from './TodoForm.vue'
import TodoCounter from './TodoCounter.vue'
import TodoFilter from './TodoFilter.vue'

const store = useStore()

const filteredTodos = computed(() => {
  switch (store.filter) {
    case 'all':
      return store.todos
    case 'selected':
      return store.todos.filter((todo) => todo.completed)
    case 'unselected':
      return store.todos.filter((todo) => !todo.completed)
    default:
      return store.todos
  }
})

// Enregistrement des composants ici
import { defineExpose } from 'vue'
defineExpose({ components: { TodoForm, TodoCounter, TodoFilter } })
</script>
