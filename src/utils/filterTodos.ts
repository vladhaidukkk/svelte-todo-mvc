import { TodoFiltersEnum } from '$root/types';
import type { TodoType } from '$root/types';

export function filterTodos(todos: TodoType[], filter: TodoFiltersEnum) {
  switch (filter) {
    case TodoFiltersEnum.all:
      return todos;
    case TodoFiltersEnum.active:
      return todos.filter((todo) => !todo.completed);
    case TodoFiltersEnum.completed:
      return todos.filter((todo) => todo.completed);
  }
}
