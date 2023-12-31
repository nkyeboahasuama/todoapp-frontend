export interface ITodoTypes {
  id: string;
  title: string;
  completed?: boolean;
  completedOn?: string;
}

export const todos: ITodoTypes[] = [
  {
    id: "1",
    title: "Get a shoe from Melcom",
    completed: false,
  },
  {
    id: "2",
    title: "Heat my rice",
    completed: true,
  },
  {
    id: "3",
    title: "Visit Jane",
    completed: true,
  },
  {
    id: "4",
    title: "Read my story book",
    completed: false,
  },
];
