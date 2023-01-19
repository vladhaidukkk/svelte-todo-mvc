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

  let filtering = false;
  let activeFilter: TodoFiltersEnum = TodoFiltersEnum.all;

  $: todosAmount = $todos.length;
  $: filteredTodos = filterTodos($todos, activeFilter);

  function setFiltering(value: boolean) {
    filtering = value;
  }
</script>

<main class="w-[500px] p-4">
  <CreateTodo />

  {#if todosAmount > 0}
    <ul>
      {#each filteredTodos as todo (todo.id)}
        <Todo {todo} slideIn={!filtering} />
      {/each}
    </ul>

    <div class="flex items-center justify-between gap-2 py-2">
      <TodosLeft />
      <TodoFilters bind:activeFilter {setFiltering} />
      <ClearTodos />
    </div>
  {/if}
</main>
