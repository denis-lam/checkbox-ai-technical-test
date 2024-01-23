import { FC } from 'react';

import { Loader, Text } from '@mantine/core';

import { CbLoaderProps } from './CbLoader.types';

const CbLoader: FC<CbLoaderProps> = ({ message }) => {
  return (
    <>
      <Loader mt="md" variant="dots" />
      <Text mt="md" size="sm">
        {message}
      </Text>
    </>
  );
};

export { CbLoader };
