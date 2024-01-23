import { ReactNode } from 'react';

import { ModalProps } from '@mantine/core';

export interface CbModalProps extends ModalProps {
  shouldDisplayHeaderDivider?: boolean;
  subTitle?: ReactNode;
}
