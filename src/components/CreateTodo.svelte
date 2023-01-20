<script lang="ts">
  import { todos } from '$root/store';

  let newTodoText = '';

  $: todosAmount = $todos.length;
  $: uncompletedTodos = $todos.filter((todo) => !todo.completed).length;

  function handleSubmit() {
    if (newTodoText) {
      todos.create(newTodoText);
      newTodoText = '';
    }
  }

  function toggleTodosCompleted(event: MouseEvent) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    todos.updateAllCompleted(checked);
  }
</script>

<form
  class="flex h-16 items-center gap-2.5 pl-2.5"
  class:border-b={todosAmount > 0}
  on:submit|preventDefault={handleSubmit}
>
  {#if todosAmount > 0}
    <input
      type="checkbox"
      checked={uncompletedTodos === 0}
      on:click={toggleTodosCompleted}
    />
  {/if}
  <!-- svelte-ignore a11y-autofocus -->
  <input
    type="text"
    bind:value={newTodoText}
    placeholder="What needs to be done?"
    class="h-full flex-1 border-none focus:ring-0"
    autofocus
  />
</form>
