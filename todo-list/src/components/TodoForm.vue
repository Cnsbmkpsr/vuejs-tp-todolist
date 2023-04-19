<template>
  <form @submit.prevent="submitTodo">
    <input v-model="title" type="text" placeholder="Titre de la tâche" />
    <input v-model.number="estimatedHours" type="number" placeholder="Heures estimées" />
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
const estimatedHours = ref(0)
const selectedResponsible = ref(store.responsables[0])

const submitTodo = () => {
  // Vérifier les conditions de soumission, puis ajouter la tâche
}
</script>
