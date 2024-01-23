import { RetrieveTasksQuery } from '../../../types';

export type Task = RetrieveTasksQuery['tasks'][0];

export type TaskAction = 'create' | 'update';
