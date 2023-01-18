<script lang="ts">
  import { TodoFiltersEnum } from '$root/types';
  import { capitalize } from '$root/utils';
  import { tick } from 'svelte';

  export let activeFilter: TodoFiltersEnum;
  export let setFiltering: (value: boolean) => void;

  const filters = Object.values(TodoFiltersEnum);

  async function selectFilter(filter: TodoFiltersEnum) {
    setFiltering(true);
    activeFilter = filter;
    await tick();
    setFiltering(false);
  }
</script>

<div class="filters">
  {#each filters as filter}
    <button
      type="button"
      class="filter"
      class:filter--active={activeFilter === filter}
      on:click={() => selectFilter(filter)}
    >
      {capitalize(filter)}
    </button>
  {/each}
</div>

<style>
  .filters {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .filter {
    border: 1px solid black;
    border-radius: 3px;
    cursor: pointer;
  }

  .filter--active {
    border-color: purple;
  }
</style>
