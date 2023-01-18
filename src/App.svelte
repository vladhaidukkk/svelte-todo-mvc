<script lang="ts">
  import type { TodoType } from '$root/types';

  let todos: TodoType[] = [
    {
      id: crypto.randomUUID(),
      text: 'Todo 1',
      completed: false,
    },
    {
      id: crypto.randomUUID(),
      text: 'Todo 2',
      completed: false,
    },
    {
      id: crypto.randomUUID(),
      text: 'Todo 3',
      completed: false,
    },
  ];
  let newTodoText = '';

  function createTodo(text: string) {
    const newTodo: TodoType = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    todos = [...todos, newTodo];
  }

  function handleSubmit() {
    if (newTodoText) {
      createTodo(newTodoText);
      newTodoText = '';
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <!-- svelte-ignore a11y-autofocus -->
  <input
    type="text"
    bind:value={newTodoText}
    placeholder="What needs to be done?"
    autofocus
  />
</form>

<ul>
  {#each todos as todo (todo.id)}
    <li>{todo.text}</li>
  {/each}
</ul>
