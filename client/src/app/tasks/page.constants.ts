import { MantineColor } from '@mantine/core';

import { TaskStatus } from './page.types';

const TASK_STATUS_TO_MANTINE_COLOR_MAP = Object.freeze<Record<TaskStatus, MantineColor>>({
  DueSoon: 'orange',
  NotUrgent: 'green',
  Overdue: 'red',
});

export { TASK_STATUS_TO_MANTINE_COLOR_MAP };
