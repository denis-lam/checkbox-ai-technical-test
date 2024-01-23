export interface TableFilterFormData {
  filterString: string | null;
}

export interface TableFilterFormProps<T> {
  onInputChange: (filterString: NonNullable<TableFilterFormData['filterString']>) => void;
  onInputClear: () => void;
  placeholderText: string;
  values: T;
}
