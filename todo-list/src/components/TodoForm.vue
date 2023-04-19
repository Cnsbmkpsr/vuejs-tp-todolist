<!-- src/components/TodoForm.vue -->
<template>
  <form @submit.prevent="submitForm">
    <input v-model="title" placeholder="Titre" />
    <input v-model="estimatedHours" placeholder="Heures estimées" />
    <select v-model="selectedResponsible">
      <option v-for="responsible in responsables" :key="responsible.id" :value="responsible">
        {{ responsible.name }}
      </option>
    </select>
    <button type="submit">Ajouter</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../store'

const store = useTodoStore()

const title = ref('')
const estimatedHours = ref('')
const selectedResponsible = ref(store.responsables[0])

const responsables = store.responsables

const submitForm = () => {
  if (
    !title.value ||
    !estimatedHours.value ||
    !selectedResponsible.value ||
    isNaN(+estimatedHours.value)
  ) {
    alert('Veuillez remplir correctement tous les champs')
    return
  }

  const tasksOfResponsible = store.todos.filter(
    (todo) => todo.responsible.id === selectedResponsible.value.id
  )

  if (
    tasksOfResponsible.length >= 3 ||
    tasksOfResponsible.reduce((acc, curr) => acc + curr.estimatedHours, 0) + +estimatedHours.value >
      10
  ) {
    alert("Le responsable a atteint la limite de tâches ou d'heures")
    return
  }

  const todo = {
    id: Date.now().toString(),
    title: title.value,
    estimatedHours: +estimatedHours.value,
    responsible: selectedResponsible.value,
    completed: false
  }
  store.addTodo(todo)

  title.value = ''
  estimatedHours.value = ''
  selectedResponsible.value = store.responsables[0]
}
</script>
