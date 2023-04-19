<!-- src/components/EditTodoForm.vue -->
<template>
  <div v-if="editingTodo">
    <h3>Modifier la todo</h3>
    <form @submit.prevent="submitForm">
      <input v-model="title" placeholder="Titre" />
      <input v-model="estimatedHours" placeholder="Heures estimées" />
      <select v-model="selectedResponsible">
        <option v-for="responsible in responsables" :key="responsible.id" :value="responsible">
          {{ responsible.name }}
        </option>
      </select>
      <button type="submit">Enregistrer</button>
      <button type="button" @click="cancelEdit">Annuler</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../store'

const store = useTodoStore()

const editingTodo = store.editingTodo

const title = ref(editingTodo?.title || '')
const estimatedHours = ref(editingTodo?.estimatedHours || '')
const selectedResponsible = ref(editingTodo?.responsible || '')

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

  const updatedTodo = {
    ...editingTodo,
    title: title.value,
    estimatedHours: +estimatedHours.value,
    responsible: selectedResponsible.value
  }
  store.updateTodo(updatedTodo)
  store.setEditingTodo(null)
}

const cancelEdit = () => {
  store.setEditingTodo(null)
}
</script>
