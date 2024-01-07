export type ID = string | number;

export type Column = {
  id: ID;
  title: string;
  color_scheme: string;
};

export type Task = {
  id: ID;
  columnId: ID;
  content: string;
};
