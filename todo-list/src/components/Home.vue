<!-- src/components/Home.vue -->
<template>
  <div class="home">
    <TodoForm @addTodo="addTodo" />
    <TodoFilter @applyFilter="applyFilter" @deleteSelected="deleteSelectedTodos" />
    <TodoCounter :totalCount="todos.length" :selectedCount="selectedTodosCount" />
    <div class="todo-list">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggleSelect="toggleSelect"
        @editTodo="editTodo"
        @deleteTodo="deleteTodo"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
