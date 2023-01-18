<script lang="ts">
  import { TodoFiltersEnum } from '$root/types';
  import { capitalize } from '$root/utils';

  export let activeFilter: TodoFiltersEnum;

  const filters = Object.values(TodoFiltersEnum);

  function selectFilter(filter: TodoFiltersEnum) {
    activeFilter = filter;
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
