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

<form on:submit|preventDefault={handleSubmit}>
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
    autofocus
  />
</form>
