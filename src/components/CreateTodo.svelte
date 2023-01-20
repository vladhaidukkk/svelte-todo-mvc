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
  class:pl-13={todosAmount === 0}
  class:border-b={todosAmount > 0}
  on:submit|preventDefault={handleSubmit}
>
  {#if todosAmount > 0}
    <label class="flex h-8 w-8 items-center justify-center">
      <input
        type="checkbox"
        checked={uncompletedTodos === 0}
        class="hidden"
        on:click={toggleTodosCompleted}
      />
      <span
        class="icon-[ph--arrow-down-thin] h-6 w-6 transition-all hover:scale-110"
        class:text-gray-700={uncompletedTodos === 0}
        class:text-gray-300={uncompletedTodos > 0}
      />
    </label>
  {/if}
  <!-- svelte-ignore a11y-autofocus -->
  <input
    type="text"
    bind:value={newTodoText}
    placeholder="What needs to be done?"
    class="h-full flex-1 border-none pr-2.5 pl-0 text-2xl font-thin text-gray-900 placeholder:italic placeholder:text-gray-200 focus:ring-0"
    autofocus
  />
</form>
