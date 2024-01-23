import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export interface TextInputRightSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  value?: number | string;
}
