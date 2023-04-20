<!-- src/components/EditTodoForm.vue -->
<template>
  <div v-if="editingTodo && editingTodo.value">
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
import { ref, watch, watchEffect, defineEmits } from 'vue'
import { useTodoStore } from '../store'
const emit = defineEmits(['submit-form', 'cancel-edit'])

const store = useTodoStore()

const editingTodo = ref(null)

watchEffect(() => {
  editingTodo.value = store.editingTodo.value
})

const title = ref('')
const estimatedHours = ref('')
const selectedResponsible = ref(null)

const responsables = store.responsables

watchEffect(() => {
  editingTodo.value = store.editingTodo
})

// Watch for changes in editingTodo and update form fields accordingly
watchEffect(() => {
  if (editingTodo && editingTodo.value) {
    title.value = editingTodo.value.title
    estimatedHours.value = editingTodo.value.estimatedHours
    selectedResponsible.value = editingTodo.value.responsible
  } else {
    title.value = ''
    estimatedHours.value = ''
    selectedResponsible.value = null
  }
})

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
    id: editingTodo.value.id,
    title: title.value,
    estimatedHours: +estimatedHours.value,
    responsible: selectedResponsible.value,
    completed: editingTodo.value.completed
  }

  console.log('updatedTodo:', updatedTodo)

  store.updateTodo(updatedTodo)
  store.setEditingTodo(null)
  emit('submit-form', updatedTodo)
}

const cancelEdit = () => {
  store.setEditingTodo(null)
}
</script>
