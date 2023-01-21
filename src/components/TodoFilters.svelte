<script lang="ts">
  import { TodoFiltersEnum } from '$root/types';
  import { capitalize } from '$root/utils';

  export let activeFilter: TodoFiltersEnum;

  const filters = Object.values(TodoFiltersEnum);

  async function selectFilter(filter: TodoFiltersEnum) {
    activeFilter = filter;
  }
</script>

<div class="flex items-center gap-1.5 sm:gap-2.5">
  {#each filters as filter}
    <button
      type="button"
      class="rounded-sm border border-transparent px-1 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 sm:px-1.5"
      class:border-blue-300={activeFilter === filter}
      class:bg-blue-50={activeFilter === filter}
      class:text-blue-600={activeFilter === filter}
      on:click={() => selectFilter(filter)}
    >
      {capitalize(filter)}
    </button>
  {/each}
</div>
