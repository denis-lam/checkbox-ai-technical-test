import { FC, useEffect } from 'react';

import { Group, NumberInput, Text } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { TextInputRightSection } from '../TextInputRightSection';

import { tablePageSizeFormZodResolver } from './TablePageSizeForm.helpers';
import { TablePageSizeFormData, TablePageSizeFormProps } from './TablePageSizeForm.types';

import { DEBOUNCE_TIME_IN_MILLISECONDS } from '@/constants';
import { useEnvironmentVariables } from '@/hooks';

const TablePageSizeForm: FC<TablePageSizeFormProps<TablePageSizeFormData>> = ({ defaultValues, onInputChange }) => {
  const { parseEnvironmentVariable } = useEnvironmentVariables();

  const maxPageSize = Number(
    parseEnvironmentVariable({
      key: 'NEXT_PUBLIC_MAX_TABLE_PAGE_SIZE',
      value: Number(process.env.NEXT_PUBLIC_MAX_TABLE_PAGE_SIZE),
    }),
  );

  const {
    formState: { errors },
    register,
    setFocus,
    setValue,
    trigger,
  } = useForm<TablePageSizeFormData>({
    defaultValues,
    mode: 'onChange',
    resolver: tablePageSizeFormZodResolver(maxPageSize),
  });

  const handleInputChange = (pageSize: number) => {
    onInputChange(pageSize);
  };

  useEffect(() => {
    setFocus('pageSize');
    trigger('pageSize');
  }, [setFocus, trigger]);

  const debouncedFilterInputChange = useDebouncedCallback(handleInputChange, DEBOUNCE_TIME_IN_MILLISECONDS);

  return (
    <form
      id="table-page-size-form"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Group gap="xs" w={300} wrap="nowrap">
        <Text size="sm">Page size</Text>

        <NumberInput
          {...register('pageSize')}
          allowNegative={false}
          hideControls={false}
          max={maxPageSize}
          maxLength={4}
          min={1}
          rightSection={errors.pageSize ? <TextInputRightSection error={errors.pageSize} /> : null}
          rightSectionWidth={40}
          size="sm"
          step={10}
          thousandSeparator=","
          value={defaultValues?.pageSize}
          w={100}
          onChange={(value) => {
            const castedPageSize = Number(value);

            if (isNaN(castedPageSize) || !castedPageSize) {
              return;
            }

            setValue('pageSize', castedPageSize, {
              shouldValidate: true,
            });

            if (castedPageSize > maxPageSize) {
              return;
            }

            debouncedFilterInputChange(castedPageSize);
          }}
        />
      </Group>
    </form>
  );
};

export { TablePageSizeForm };
