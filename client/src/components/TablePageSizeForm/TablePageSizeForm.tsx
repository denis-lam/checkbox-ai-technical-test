import { FC, useEffect } from 'react';

import { Group, NumberInput, Text } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { TablePageSizeFormData, TablePageSizeFormProps } from './TablePageSizeForm.types';

import { DEBOUNCE_TIME_IN_MILLISECONDS } from '@/constants';

const TablePageSizeForm: FC<TablePageSizeFormProps<TablePageSizeFormData>> = ({ onInputChange, values }) => {
  const { register, setFocus, setValue } = useForm<TablePageSizeFormData>({
    mode: 'onChange',
    values,
  });

  const handleInputChange = (pageSize: number) => {
    onInputChange(pageSize);
  };

  useEffect(() => {
    setFocus('pageSize');
  }, [setFocus]);

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
          max={undefined}
          min={1}
          size="sm"
          thousandSeparator=","
          value={values.pageSize}
          w={100}
          onChange={(value) => {
            const castedPageSize = Number(value);

            if (isNaN(castedPageSize) || !castedPageSize) {
              return;
            }

            setValue('pageSize', castedPageSize);
            debouncedFilterInputChange(castedPageSize);
          }}
        />
      </Group>
    </form>
  );
};

export { TablePageSizeForm };
