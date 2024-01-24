import { DefaultValues } from 'react-hook-form';

export interface TablePageSizeFormData {
  pageSize: number;
}

export interface TablePageSizeFormProps<T> {
  defaultValues: DefaultValues<T>;
  onInputChange: (pageSize: TablePageSizeFormData['pageSize']) => void;
}
