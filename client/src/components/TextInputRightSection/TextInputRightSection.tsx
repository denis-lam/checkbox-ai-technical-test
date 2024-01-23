import { FC } from 'react';

import { IconAlertCircle, IconCheck } from '@tabler/icons-react';

import { TextInputRightSectionProps } from './TextInputRightSection.types';

const TextInputRightSection: FC<TextInputRightSectionProps> = ({ error, value }) => {
  if (error) {
    return <IconAlertCircle color="#e00f0f" size={20} />;
  }

  if (value) {
    return <IconCheck color="green" size={20} />;
  }

  return null;
};

export { TextInputRightSection };
