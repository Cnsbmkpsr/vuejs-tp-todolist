<template>
  <div>
    <h1>Ma liste de tâches</h1>
    <TodoForm />
    <TodoCounter />
    <TodoFilter />
    <ul>
      <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../store'
import TodoForm from './TodoForm.vue'
import TodoCounter from './TodoCounter.vue'
import TodoFilter from './TodoFilter.vue'
import TodoItem from './TodoItem.vue'

const store = useStore()

const filteredTodos = computed(() => {
  // Appliquer le filtre sélectionné
})
</script>
