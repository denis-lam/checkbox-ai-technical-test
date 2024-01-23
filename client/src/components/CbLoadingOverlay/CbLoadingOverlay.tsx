import { FC } from 'react';

import { Loader, LoadingOverlay, Stack, Text } from '@mantine/core';

import { CbLoadingOverlayProps } from './CbLoadingOverlay.types';

const CbLoadingOverlay: FC<CbLoadingOverlayProps> = ({ message }) => {
  return (
    <LoadingOverlay
      loaderProps={{
        children: (
          <Stack align="center">
            <Loader mb="md" variant="dots" />
            {message && <Text size="sm">{message}</Text>}
          </Stack>
        ),
      }}
      overlayProps={{
        blur: 2,
      }}
      visible
    />
  );
};

export { CbLoadingOverlay };
