<script lang="ts">
  import { todos } from '$root/store';

  $: uncompletedTodos = $todos.filter((todo) => !todo.completed).length;
</script>

<div class="font-thin text-gray-900">
  {uncompletedTodos}
  {uncompletedTodos === 1 ? 'item' : 'items'} left
</div>
