import { DefaultValues } from 'react-hook-form';

import { Task } from '../../../types';

export interface TaskFormData extends Pick<Task, 'description' | 'dueAtUtc' | 'name'> {}

export interface TaskFormProps<FormData> {
  defaultValues: DefaultValues<FormData>;
  onSubmit: (formData: FormData) => void;
  submitButtonText?: string;
}
