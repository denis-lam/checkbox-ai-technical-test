import { faker } from '@faker-js/faker';
import { createId } from '@paralleldrive/cuid2';
import { PrismaClient, Task } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

(async () => {
  const seedTestDataTotalTaskRecords = Number(process.env.SEED_TEST_DATA_TOTAL_TASK_RECORDS);

  const { date, word } = faker;

  await prisma.task.deleteMany();

  await prisma.task.createMany({
    data: Array.from(
      {
        length: !isNaN(seedTestDataTotalTaskRecords) ? seedTestDataTotalTaskRecords : 100,
      },
      (): Task => ({
        createdAtUtc: date.between({
          from: dayjs().startOf('year').toDate(),
          to: dayjs().endOf('year').toDate(),
        }),
        dueAtUtc: date.between({
          from: dayjs().startOf('year').toDate(),
          to: dayjs().endOf('year').toDate(),
        }),
        description: word.words({
          count: {
            max: 30,
            min: 10,
          },
        }),
        id: createId(),
        name: word.words({
          count: {
            max: 5,
            min: 1,
          },
        }),
      }),
    ),
  });
})()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
