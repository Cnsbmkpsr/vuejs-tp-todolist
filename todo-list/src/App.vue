<!-- src/App.vue -->
<template>
  <div id="app">
    <h1>Todo List</h1>
    <TodoForm />
    <TodoList />
  </div>
</template>

<script>
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'

export default {
  components: {
    TodoForm,
    TodoList
  }
}
</script>
