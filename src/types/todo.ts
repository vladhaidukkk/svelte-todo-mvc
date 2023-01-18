export type TodoType = {
  id: string;
  text: string;
  completed: boolean;
};

export enum TodoFilters {
  all = 'all',
  active = 'active',
  completed = 'completed',
}
