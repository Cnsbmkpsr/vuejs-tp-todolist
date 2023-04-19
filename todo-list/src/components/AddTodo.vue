// src/components/AddTodo.vue
<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" v-model="title" placeholder="Titre" required />
    <input type="number" v-model.number="estimatedHours" placeholder="Heures estimées" required />
    <select v-model="selectedResponsible">
      <option disabled value="">Responsable</option>
      <option v-for="responsible in responsables" :key="responsible.id" :value="responsible">
        {{ responsible.name }}
      </option>
    </select>
    <button type="submit">Ajouter</button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore, canAssignTask } from '../store'
import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
  setup() {
    const store = useStore()
    const title = ref('')
    const estimatedHours = ref(0)
    const responsible = ref(null)
    const error = ref('')

    const handleSubmit = () => {
      if (!canAssignTask(responsible.value, estimatedHours.value)) {
        error.value = "Le responsable a atteint la limite de tâches ou d'heures."
        return
      }

      const newTodo = {
        id: uuidv4(),
        title: title.value,
        estimatedHours: estimatedHours.value,
        responsible: responsible.value,
        completed: false
      }

      store.addTodo(newTodo)
      title.value = ''
      estimatedHours.value = 0
      responsible.value = null
      error.value = ''
    }

    return {
      responsables: store.responsables,
      title,
      estimatedHours,
      responsible,
      error,
      handleSubmit
    }
  }
})
</script>
