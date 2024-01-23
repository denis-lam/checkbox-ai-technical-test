import { FC, useEffect } from 'react';

import { ActionIcon, Group, TextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { TableFilterFormData, TableFilterFormProps } from './TableFilterForm.types';

import { DEBOUNCE_TIME_IN_MILLISECONDS } from '@/constants';

const TableFilterForm: FC<TableFilterFormProps<TableFilterFormData>> = ({ onInputChange, onInputClear, placeholderText, values }) => {
  const { register, reset, setFocus, setValue, watch } = useForm<TableFilterFormData>({
    mode: 'onChange',
    values,
  });

  const handleClearButtonClick = () => {
    onInputClear();
    reset();
    setFocus('filterString');
  };

  const handleInputChange = (filterString: string) => {
    if (filterString) {
      onInputChange(filterString);
      return;
    }

    handleClearButtonClick();
  };

  useEffect(() => {
    setFocus('filterString');
  }, [setFocus]);

  const debouncedFilterInputChange = useDebouncedCallback(handleInputChange, DEBOUNCE_TIME_IN_MILLISECONDS);

  return (
    <form
      id="table-filter-form"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Group justify="right" w={300} wrap="nowrap">
        <TextInput
          {...register('filterString')}
          leftSection={<IconSearch size={18} />}
          placeholder={placeholderText}
          rightSection={
            watch('filterString') ? (
              <ActionIcon onClick={handleClearButtonClick}>
                <IconX size={14} />
              </ActionIcon>
            ) : null
          }
          w="100%"
          onChange={({ target: { value } }) => {
            setValue('filterString', value);
            debouncedFilterInputChange(value);
          }}
        />
      </Group>
    </form>
  );
};

export { TableFilterForm };
