<!-- src/components/TodoItem.vue -->
<template>
  <div>
    <input type="checkbox" v-model="todo.completed" @change="updateTodo" />
    {{ todo.title }} - {{ todo.estimatedHours }} heures - {{ todo.responsible.name }}
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmit } from 'vue'
import { Todo } from '../types'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmit(['update-todo'])

const updateTodo = () => {
  emit('update-todo', props.todo)
}
</script>
