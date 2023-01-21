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
    <label class="flex items-center justify-center">
      <input
        type="checkbox"
        checked={todo.completed}
        class="hidden"
        on:change={() => todos.toggleCompleted(todo.id)}
      />
      <span
        class="h-8 w-8 transition-all hover:scale-105"
        class:text-green-600={todo.completed}
        class:icon-[ph--check-circle-thin]={todo.completed}
        class:text-gray-200={!todo.completed}
        class:icon-[ph--circle-thin]={!todo.completed}
      />
    </label>
    <span
      class="flex-1 break-all py-2 text-xl font-thin text-gray-900 decoration-1"
      class:opacity-20={todo.completed}
      class:line-through={todo.completed}
      on:dblclick={toggleEditing}
    >
      {todo.text}
    </span>
    <button
      type="button"
      aria-label="Delete todo"
      class="invisible flex items-center justify-center text-red-600 opacity-0 transition-all hover:scale-110 group-hover:visible group-hover:opacity-100"
      on:click={() => todos.remove(todo.id)}
    >
      <span class="icon-[ph--x-thin] h-5 w-5" />
    </button>
  {:else}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="text"
      value={todo.text}
      class="-mr-5 ml-8 h-full w-full border-none px-2.5 text-xl font-thin text-gray-900 focus:ring-inset focus:ring-blue-600"
      on:keydown={handleKeydown}
      on:blur={handleBlur}
      autofocus
    />
  {/if}
</li>
