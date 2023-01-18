export type TodoType = {
  id: string;
  text: string;
  completed: boolean;
};

export enum TodoFiltersEnum {
  all = 'all',
  active = 'active',
  completed = 'completed',
}
