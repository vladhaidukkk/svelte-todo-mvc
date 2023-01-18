<script lang="ts">
  import { todos } from '$root/store';

  $: completedTodos = $todos.filter((todo) => todo.completed).length;
</script>

<button
  type="button"
  class="clear-btn"
  class:clear-btn--hidden={completedTodos === 0}
  on:click={todos.removeCompleted}
>
  Clear completed
</button>

<style>
  .clear-btn {
    visibility: visible;
    cursor: pointer;
  }

  .clear-btn--hidden {
    visibility: hidden;
  }
</style>
