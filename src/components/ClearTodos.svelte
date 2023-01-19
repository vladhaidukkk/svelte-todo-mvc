<script lang="ts">
  import { todos } from '$root/store';

  $: completedTodos = $todos.filter((todo) => todo.completed).length;
</script>

<button
  type="button"
  class:invisible={completedTodos === 0}
  on:click={todos.removeCompleted}
>
  Clear completed
</button>
