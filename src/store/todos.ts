import type { TodoType } from '$root/types';
import { writable } from 'svelte/store';

function createTodos() {
  const rawTodos = localStorage.getItem('todos');
  const initialTodos: TodoType[] = rawTodos
    ? (JSON.parse(rawTodos) as TodoType[])
    : [];

  const { subscribe, update } = writable(initialTodos);

  subscribe((todosValue) => {
    localStorage.setItem('todos', JSON.stringify(todosValue));
  });

  function create(text: string) {
    const newTodo: TodoType = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    update((todos) => [...todos, newTodo]);
  }

  function toggleCompleted(id: string) {
    update((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  }

  function updateText(id: string, newText: string) {
    update((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText };
        }
        return todo;
      })
    );
  }

  function updateAllCompleted(completed: boolean) {
    update((todos) => todos.map((todo) => ({ ...todo, completed })));
  }

  function remove(id: string) {
    update((todos) => todos.filter((todo) => todo.id !== id));
  }

  function removeCompleted() {
    update((todos) => todos.filter((todo) => !todo.completed));
  }

  return {
    subscribe,
    create,
    toggleCompleted,
    updateText,
    updateAllCompleted,
    remove,
    removeCompleted,
  };
}

export const todos = createTodos();
