import { FC } from 'react';

import { Text } from '@mantine/core';

import { ErrorMessageProps } from './ErrorMessage.types';

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <Text
      size="sm"
      style={({ colors }) => ({
        color: colors.red[7],
      })}
    >
      {message}
    </Text>
  );
};

export { ErrorMessage };
