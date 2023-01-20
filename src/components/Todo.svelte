<svelte:options immutable />

<script lang="ts">
  import { slide } from 'svelte/transition';
  import type { TodoType } from '$root/types';
  import { todos } from '$root/store';

  export let todo: TodoType;
  export let slideIn: boolean;

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

<li
  class="group flex items-center gap-2.5 border-b pl-2.5 pr-5"
  in:slide={{ duration: slideIn ? 250 : 0 }}
>
  {#if !editing}
    <input
      type="checkbox"
      checked={todo.completed}
      on:change={() => todos.toggleCompleted(todo.id)}
    />
    <span
      class="flex-1"
      class:opacity-50={todo.completed}
      class:line-through={todo.completed}
      on:dblclick={toggleEditing}>{todo.text}</span
    >
    <button
      type="button"
      aria-label="Delete todo"
      class="invisible group-hover:visible"
      on:click={() => todos.remove(todo.id)}
    >
      x
    </button>
  {:else}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="text"
      value={todo.text}
      class="h-full w-full"
      on:keydown={handleKeydown}
      on:blur={handleBlur}
      autofocus
    />
  {/if}
</li>
