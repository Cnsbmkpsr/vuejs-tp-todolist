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
import { useStore } from '../store'

const store = useStore()

const title = ref('')
const estimatedHours = ref('')
const selectedResponsible = ref(null)

const responsables = store.responsables

const submitForm = () => {
  // Validation du formulaire
  console.log(estimatedHours)
  console.log(title)
  console.log(selectedResponsible)
  if (
    !title.value ||
    !estimatedHours.value ||
    !selectedResponsible.value ||
    isNaN(+estimatedHours.value)
  ) {
    alert('Veuillez remplir correctement tous les champs')
    return
  }

  // Vérification du nombre de tâches et des heures pour le responsable sélectionné
  const tasksOfResponsible = store.todos.filter(
    (todo) => todo.responsible.id === selectedResponsible.value.id
  )

  // Ajout de la tâche
  const todo = {
    id: Date.now().toString(),
    title: title.value,
    estimatedHours: +estimatedHours.value,
    responsible: selectedResponsible.value,
    completed: false
  }
  store.addTodo(todo)

  // Réinitialisation du formulaire
  title.value = ''
  estimatedHours.value = ''
  selectedResponsible.value = ''
}
</script>
