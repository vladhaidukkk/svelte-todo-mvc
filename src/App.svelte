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

  function deleteTodo(id: string) {
    todos = todos.filter((todo) => todo.id !== id);
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

<ul class="todos">
  {#each todos as todo (todo.id)}
    <li class="todo">
      <span>{todo.text}</span>
      <button
        type="button"
        aria-label="Delete todo"
        class="delete-btn"
        on:click={() => deleteTodo(todo.id)}>x</button
      >
    </li>
  {/each}
</ul>

<style>
  .todos {
    width: 300px;
    padding: 0;
    list-style: none;
  }

  .todo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    border-bottom: 1px solid;
  }

  .delete-btn {
    visibility: hidden;
    cursor: pointer;
  }

  .todo:hover .delete-btn {
    visibility: visible;
  }
</style>
