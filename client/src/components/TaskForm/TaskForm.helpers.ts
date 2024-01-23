import { zodResolver } from '@hookform/resolvers/zod';
import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';

const calculateMinDate = (dueDate?: string) => {
  let actualDueDate: Dayjs | undefined;

  const currentDate = dayjs();

  if (dueDate) {
    const dayjsDueDate = dayjs(dueDate);

    if (currentDate < dayjsDueDate) {
      actualDueDate = currentDate;
    } else {
      actualDueDate = dayjsDueDate;
    }
  } else {
    actualDueDate = currentDate;
  }

  return actualDueDate.startOf('day').toDate();
};

const taskFormZodResolver = (dueDate?: string) => {
  return zodResolver(
    z.object({
      description: z.string().min(1, {
        message: 'Description is required',
      }),
      dueAtUtc: z
        .date({
          required_error: 'Please enter a due date',
        })
        .refine(
          (value) => {
            const minDate = calculateMinDate(dueDate);

            return value >= minDate;
          },
          {
            message: 'Due date must be today or later',
          },
        ),
      name: z.string().min(1, {
        message: 'Name is required',
      }),
    }),
  );
};

export { calculateMinDate, taskFormZodResolver };
