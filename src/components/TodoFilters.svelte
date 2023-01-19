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

<div class="flex items-center gap-2">
  {#each filters as filter}
    <button
      type="button"
      class="rounded border px-2"
      class:border-blue-600={activeFilter === filter}
      on:click={() => selectFilter(filter)}
    >
      {capitalize(filter)}
    </button>
  {/each}
</div>
