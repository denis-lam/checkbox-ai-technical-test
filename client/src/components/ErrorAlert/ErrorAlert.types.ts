import { AlertProps } from '@mantine/core';

export interface ErrorAlertProps extends Omit<AlertProps, 'color' | 'icon' | 'variant'> {}
