import { RetrieveTasksQuery } from '../../../types';

const TASK_STATUS = ['DueSoon', 'NotUrgent', 'Overdue'] as const;

export type Task = RetrieveTasksQuery['tasks'][0] & {
  status: TaskStatus;
};

export type TaskAction = 'create' | 'update';

export type TaskStatus = (typeof TASK_STATUS)[number];
