<script lang="ts">
  import { TodoFiltersEnum } from '$root/types';
  import { capitalize } from '$root/utils';

  export let activeFilter: TodoFiltersEnum;

  const filters = Object.values(TodoFiltersEnum);

  async function selectFilter(filter: TodoFiltersEnum) {
    activeFilter = filter;
  }
</script>

<div class="flex items-center gap-2.5 font-thin text-gray-900">
  {#each filters as filter}
    <button
      type="button"
      class="rounded-sm border border-transparent px-1.5 transition-colors hover:border-blue-600 hover:bg-blue-50"
      class:border-blue-600={activeFilter === filter}
      class:bg-blue-50={activeFilter === filter}
      on:click={() => selectFilter(filter)}
    >
      {capitalize(filter)}
    </button>
  {/each}
</div>
