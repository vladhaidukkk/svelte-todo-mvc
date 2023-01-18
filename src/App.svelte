<script lang="ts">
  import type { TodoType } from '$root/types';
  import { Todo } from '$root/components';

  let todos: TodoType[] = [
    {
      id: crypto.randomUUID(),
      text: 'Todo 1',
      completed: false,
    },
    {
      id: crypto.randomUUID(),
      text: 'Todo 2',
      completed: true,
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

  function toggleTodo(id: string) {
    todos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
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
    <Todo {todo} {toggleTodo} {deleteTodo} />
  {/each}
</ul>

<style>
  .todos {
    width: 300px;
    padding: 0;
    list-style: none;
  }
</style>
