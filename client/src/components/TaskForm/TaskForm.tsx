import { FC } from 'react';

import { Button, Flex, Stack, TextInput, Textarea } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '../ErrorMessage';
import { TextInputRightSection } from '../TextInputRightSection';

import { calculateMinDate, taskFormZodResolver } from './TaskForm.helpers';
import { TaskFormData, TaskFormProps } from './TaskForm.types';

import { useEnvironmentVariables } from '@/hooks';

const TaskForm: FC<TaskFormProps<TaskFormData>> = ({ defaultValues, onSubmit, submitButtonText = 'Save' }) => {
  const { parseEnvironmentVariable } = useEnvironmentVariables();

  const {
    formState: { errors, isDirty, isValid },
    handleSubmit,
    register,
    setValue,
    trigger,
    watch,
  } = useForm<TaskFormData>({
    defaultValues,
    mode: 'onChange',
    resolver: taskFormZodResolver(defaultValues.dueAtUtc),
  });

  return (
    <form
      id="task-form"
      style={{
        height: '100%',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack h="100%" justify="center" w="100%">
        <Stack h="100%" mt="md" w="100%">
          <TextInput
            {...register('name')}
            error={errors.name ? <ErrorMessage message={errors.name.message} /> : null}
            label="Name"
            rightSection={errors.name ? <TextInputRightSection error={errors.name} value={watch('name')} /> : null}
            size="sm"
            w="100%"
          />

          <Textarea
            {...register('description')}
            error={errors.description ? <ErrorMessage message={errors.description.message} /> : null}
            label="Description"
            rightSection={errors.description ? <TextInputRightSection error={errors.description} value={watch('description')} /> : null}
            rows={5}
            size="sm"
            w="100%"
          />

          <DatePickerInput
            {...register('dueAtUtc')}
            error={errors.dueAtUtc ? <ErrorMessage message={errors.dueAtUtc.message?.toString()} /> : null}
            label="Due date"
            leftSection={<IconCalendar size={20} stroke={1} />}
            leftSectionPointerEvents="none"
            minDate={calculateMinDate(defaultValues.dueAtUtc)}
            placeholder="Please select a due date"
            rightSection={errors.dueAtUtc ? <TextInputRightSection error={errors.dueAtUtc} value={watch('dueAtUtc')} /> : null}
            size="sm"
            value={watch('dueAtUtc') ? watch('dueAtUtc') : undefined}
            valueFormat={String(
              parseEnvironmentVariable({
                key: 'NEXT_PUBLIC_DATE_FORMAT',
                value: String(process.env.NEXT_PUBLIC_DATE_FORMAT),
              }),
            )}
            w="100%"
            withAsterisk
            onChange={(value) => {
              setValue('dueAtUtc', value ? dayjs(value).toDate() : undefined, {
                shouldDirty: true,
              });
              trigger('dueAtUtc');
            }}
          />
        </Stack>

        <Flex justify="right" mt="md" w="100%">
          <Button disabled={!(isDirty && isValid)} type="submit">
            {submitButtonText}
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};

export { TaskForm };
