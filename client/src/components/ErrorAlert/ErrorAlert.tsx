import { FC } from 'react';

import { Alert, Text, useMantineTheme } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

import { ErrorAlertProps } from './ErrorAlert.types';

const ErrorAlert: FC<ErrorAlertProps> = ({ children }) => {
  const { colors } = useMantineTheme();

  return (
    <Alert
      icon={<IconAlertCircle color={colors.red[8]} />}
      style={({ colors }) => ({
        backgroundColor: colors.red[2],
        border: `1px solid ${colors.red[8]}`,
        color: colors.red[8],
        overflow: 'unset',
      })}
      title="Error"
      variant="light"
    >
      <Text
        size="sm"
        style={({ colors }) => ({
          color: colors.red[8],
        })}
      >
        {children}
      </Text>
    </Alert>
  );
};

export { ErrorAlert };
