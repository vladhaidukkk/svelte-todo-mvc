<svelte:options immutable />

<script lang="ts">
  import type { TodoType } from '$root/types';

  export let todo: TodoType;
  export let toggleTodo: (id: string) => void;
  export let deleteTodo: (id: string) => void;
</script>

<li class="todo" class:todo--completed={todo.completed}>
  <input
    type="checkbox"
    checked={todo.completed}
    on:change={() => toggleTodo(todo.id)}
  />
  <span class="todo-text">{todo.text}</span>
  <button
    type="button"
    aria-label="Delete todo"
    class="delete-btn"
    on:click={() => deleteTodo(todo.id)}
  >
    x
  </button>
</li>

<style>
  .todo {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 0;
    border-bottom: 1px solid;
  }

  .todo-text {
    flex: 1;
  }

  .todo--completed .todo-text {
    opacity: 0.5;
    text-decoration: line-through;
  }

  .delete-btn {
    visibility: hidden;
    cursor: pointer;
  }

  .todo:hover .delete-btn {
    visibility: visible;
  }
</style>
