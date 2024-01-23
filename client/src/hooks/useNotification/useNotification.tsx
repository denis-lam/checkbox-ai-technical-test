import { Text, useMantineTheme } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

import { UseNotification } from './useNotification.types';

const useNotification = (): UseNotification => {
  const { colors } = useMantineTheme();

  const displayErrorNotification: UseNotification['displayErrorNotification'] = (options) => {
    const { id, message, title = 'Error' } = options ?? {};

    showNotification({
      color: colors.red[8],
      icon: <IconX />,
      id,
      message: (
        <Text c={colors.red[8]} size="sm">
          {message}
        </Text>
      ),
      title: (
        <Text c={colors.red[8]} fw={700} size="sm">
          {title}
        </Text>
      ),
      withBorder: true,
    });
  };

  const displaySuccessNotification: UseNotification['displaySuccessNotification'] = (options) => {
    const { id, message, title = 'Success' } = options ?? {};

    showNotification({
      color: 'green',
      icon: <IconCheck />,
      id,
      message: (
        <Text c="green" size="sm">
          {message}
        </Text>
      ),
      title: (
        <Text c="green" fw={700} size="sm">
          {title}
        </Text>
      ),
      withBorder: true,
    });
  };

  return {
    displayErrorNotification,
    displaySuccessNotification,
  };
};

export { useNotification };
