export interface TableColumn<T> {
  key: keyof T;
  label: string;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onEdit?: (item: T) => void;
  onDelete: (id: number) => void;
  modelType: string
}