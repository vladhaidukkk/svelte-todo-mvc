<script lang="ts">
  import { todos } from '$root/store';

  $: completedTodos = $todos.filter((todo) => todo.completed).length;
</script>

<button
  type="button"
  class="decoration-gray-900 underline-offset-2 hover:underline"
  class:invisible={completedTodos === 0}
  on:click={todos.removeCompleted}
>
  Clear completed
</button>
