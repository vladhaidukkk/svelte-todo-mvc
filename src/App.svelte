<script lang="ts">
  import {
    ClearTodos,
    CreateTodo,
    Todo,
    TodoFilters,
    TodosLeft,
  } from '$root/components';
  import { filterTodos } from '$root/utils';
  import { todos } from '$root/store';
  import { TodoFiltersEnum } from './types';

  let activeFilter: TodoFiltersEnum = TodoFiltersEnum.all;

  $: todosAmount = $todos.length;
  $: filteredTodos = filterTodos($todos, activeFilter);
</script>

<main class="wrapper">
  <CreateTodo />

  {#if todosAmount > 0}
    <ul class="todos">
      {#each filteredTodos as todo (todo.id)}
        <Todo {todo} />
      {/each}
    </ul>

    <div class="actions">
      <TodosLeft />
      <TodoFilters bind:activeFilter />
      <ClearTodos />
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
</style>
