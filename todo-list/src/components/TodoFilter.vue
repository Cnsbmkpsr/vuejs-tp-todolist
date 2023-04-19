<template>
  <div>
    <button @click="filterAll">Tout afficher</button>
    <button @click="filterSelected">Afficher les sélectionnés</button>
    <button @click="filterUnselected">Afficher les non-sélectionnés</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../store'

const store = useTodoStore()
const filter = ref('all')

const filterAll = () => {
  filter.value = 'all'
}

const filterSelected = () => {
  filter.value = 'selected'
}

const filterUnselected = () => {
  filter.value = 'unselected'
}
</script>
