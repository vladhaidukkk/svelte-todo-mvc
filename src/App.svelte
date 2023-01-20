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

<main class="flex min-h-screen flex-col items-center gap-5 bg-gray-100 py-20">
  <h1 class="text-8xl font-thin text-blue-500">todos</h1>

  <section
    class="w-[550px] bg-white shadow-3xl"
    class:shadow-pages={todosAmount > 0}
  >
    <CreateTodo />

    {#if todosAmount > 0}
      <ul class="grid auto-rows-[minmax(56px,max-content)]">
        {#each filteredTodos as todo (todo.id)}
          <Todo {todo} />
        {/each}
      </ul>

      <div
        class="flex h-12 items-center justify-between gap-2.5 px-3.5 text-sm"
      >
        <TodosLeft />
        <TodoFilters bind:activeFilter />
        <ClearTodos />
      </div>
    {/if}
  </section>
</main>

<style>
  .shadow-pages {
    position: relative;
  }

  .shadow-pages::before {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: 0 1px 1px rgb(0 0 0 / 20%), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgb(0 0 0 / 20%), 0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgb(0 0 0 / 20%);
    pointer-events: none;
  }
</style>
