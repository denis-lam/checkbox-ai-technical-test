import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const tablePageSizeFormZodResolver = (maxPageSize: number) => {
  return zodResolver(
    z.object({
      pageSize: z.number().min(1).max(maxPageSize),
    }),
  );
};

export { tablePageSizeFormZodResolver };
