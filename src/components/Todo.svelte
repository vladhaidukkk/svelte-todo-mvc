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

<li class="todo" class:todo--completed={todo.completed}>
  {#if !editing}
    <input
      type="checkbox"
      checked={todo.completed}
      on:change={() => todos.toggleCompleted(todo.id)}
    />
    <span class="todo-text" on:dblclick={toggleEditing}>{todo.text}</span>
    <button
      type="button"
      aria-label="Delete todo"
      class="delete-btn"
      on:click={() => todos.remove(todo.id)}
    >
      x
    </button>
  {:else}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="text"
      value={todo.text}
      on:keydown={handleKeydown}
      on:blur={handleBlur}
      autofocus
    />
  {/if}
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
