<template>
  <div>
    <p>Tâches totales : {{ todosCount }}</p>
    <p>Tâches sélectionnées : {{ selectedTodosCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../store'

const store = useStore()

const todosCount = computed(() => store.todos.length)
const selectedTodosCount = computed(() => store.todos.filter((todo) => todo.selected).length)
</script>
