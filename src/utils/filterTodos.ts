import { TodoFilters } from '$root/types';
import type { TodoType } from '$root/types';

export function filterTodos(todos: TodoType[], filter: TodoFilters) {
  switch (filter) {
    case TodoFilters.all:
      return todos;
    case TodoFilters.active:
      return todos.filter((todo) => !todo.completed);
    case TodoFilters.completed:
      return todos.filter((todo) => todo.completed);
  }
}
