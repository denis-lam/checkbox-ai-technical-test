export interface TablePageSizeFormData {
  pageSize: number;
}

export interface TablePageSizeFormProps<T> {
  onInputChange: (pageSize: TablePageSizeFormData['pageSize']) => void;
  values: T;
}
