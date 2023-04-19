<template>
  <li>
    <input v-model="todo.title" @blur="updateTodo" />
    <button @click="deleteTodo">Supprimer</button>
  </li>
</template>

<script setup lang="ts">
import { useStore } from '../store'
import { Todo } from '../types'

const store = useStore()
const props = defineProps<{ todo: Todo }>()

const updateTodo = () => {
  // Mettre à jour la tâche dans le store
}

const deleteTodo = () => {
  // Supprimer la tâche du store
}
</script>
