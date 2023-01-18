<script lang="ts">
  import { TodoFilters, type TodoType } from '$root/types';
  import { Todo } from '$root/components';
  import { filterTodos, capitalize } from '$root/utils';

  const filters = Object.values(TodoFilters);

  let todos: TodoType[] = JSON.parse(localStorage.getItem('todos') ?? '[]');
  let newTodoText = '';
  let selectedFilter: TodoFilters = TodoFilters.all;

  $: filteredTodos = filterTodos(todos, selectedFilter);
  $: todosAmount = todos.length;
  $: completedTodos = todos.filter((todo) => todo.completed).length;
  $: uncompletedTodos = todos.filter((todo) => !todo.completed).length;

  $: {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

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

  function editTodo(id: string, newText: string) {
    const todoIdx = todos.findIndex((todo) => todo.id === id);
    todos[todoIdx].text = newText;
  }

  function deleteTodo(id: string) {
    todos = todos.filter((todo) => todo.id !== id);
  }

  function toggleCompleted(event: MouseEvent) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    todos = todos.map((todo) => ({ ...todo, completed: checked }));
  }

  function clearCompleted() {
    todos = todos.filter((todo) => !todo.completed);
  }

  function selectFilter(filter: TodoFilters) {
    selectedFilter = filter;
  }
</script>

<main class="wrapper">
  <form on:submit|preventDefault={handleSubmit}>
    {#if todosAmount > 0}
      <input
        type="checkbox"
        checked={uncompletedTodos === 0}
        on:click={toggleCompleted}
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

  {#if todosAmount > 0}
    <ul class="todos">
      {#each filteredTodos as todo (todo.id)}
        <Todo {todo} {toggleTodo} {editTodo} {deleteTodo} />
      {/each}
    </ul>

    <div class="actions">
      <div>
        {uncompletedTodos}
        {uncompletedTodos === 1 ? 'item' : 'items'} left
      </div>
      <div class="filters">
        {#each filters as filter}
          <button
            type="button"
            class="filter"
            class:filter--active={selectedFilter === filter}
            on:click={() => selectFilter(filter)}
          >
            {capitalize(filter)}
          </button>
        {/each}
      </div>
      <button
        type="button"
        class="clear-btn"
        class:clear-btn--hidden={completedTodos === 0}
        on:click={clearCompleted}
      >
        Clear completed
      </button>
    </div>
  {/if}
</main>

<style>
  .wrapper {
    width: 400px;
  }

  .todos {
    padding: 0;
    list-style: none;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
  }

  .filter {
    border: 1px solid black;
    border-radius: 3px;
    cursor: pointer;
  }

  .filters {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .filter--active {
    border-color: purple;
  }

  .clear-btn {
    visibility: visible;
    cursor: pointer;
  }

  .clear-btn--hidden {
    visibility: hidden;
  }
</style>
