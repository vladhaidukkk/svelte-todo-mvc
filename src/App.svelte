<script lang="ts">
  import type { TodoType } from '$root/types';

  let todos: TodoType[] = [
    {
      id: crypto.randomUUID(),
      text: 'Todo 1',
      completed: false,
    },
    {
      id: crypto.randomUUID(),
      text: 'Todo 2',
      completed: false,
    },
    {
      id: crypto.randomUUID(),
      text: 'Todo 3',
      completed: false,
    },
  ];
</script>

<ul>
  {#each todos as todo (todo.id)}
    <li>{todo.text}</li>
  {/each}
</ul>
