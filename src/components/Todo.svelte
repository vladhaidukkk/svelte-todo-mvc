<svelte:options immutable />

<script lang="ts">
  import type { TodoType } from '$root/types';
  import { todos } from '$root/store';

  export let todo: TodoType;

  let editing = false;

  function toggleEditing() {
    editing = !editing;
  }

  function handleKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;

    switch (event.key) {
      case 'Enter':
        target.blur();
        break;
      case 'Escape':
        target.blur();
        break;
    }
  }

  function handleBlur(event: FocusEvent) {
    const target = event.target as HTMLInputElement;
    const newText = target.value;

    todos.updateText(todo.id, newText);
    editing = false;
  }
</script>

<li class="group flex items-center gap-2.5 border-b pl-2.5 pr-5">
  {#if !editing}
    <input
      type="checkbox"
      checked={todo.completed}
      on:change={() => todos.toggleCompleted(todo.id)}
    />
    <span
      class="flex-1 break-all pl-2.5 text-xl font-thin text-gray-900 decoration-1"
      class:opacity-20={todo.completed}
      class:line-through={todo.completed}
      on:dblclick={toggleEditing}>{todo.text}</span
    >
    <button
      type="button"
      aria-label="Delete todo"
      class="invisible flex items-center justify-center text-red-600 opacity-0 transition-all hover:scale-110 group-hover:visible group-hover:opacity-100"
      on:click={() => todos.remove(todo.id)}
    >
      <span class="icon-[carbon--close] h-5 w-5" />
    </button>
  {:else}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="text"
      value={todo.text}
      class="ml-[25px] -mr-5 h-full w-full px-2.5 text-xl font-thin text-gray-900"
      on:keydown={handleKeydown}
      on:blur={handleBlur}
      autofocus
    />
  {/if}
</li>
