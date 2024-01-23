import { FC } from 'react';

import { Divider, Modal, Stack } from '@mantine/core';

import { CbModalProps } from './CbModal.types';

const CbModal: FC<CbModalProps> = ({
  children,
  opened,
  onClose,
  shouldDisplayHeaderDivider = true,
  subTitle,
  title,
  withCloseButton,
  ...otherProps
}) => {
  return (
    <Modal.Root
      opened={opened}
      overlayProps={{
        blur: 5,
        opacity: 0.5,
      }}
      padding="2rem"
      transitionProps={{
        duration: 100,
        timingFunction: 'ease',
        transition: 'fade',
      }}
      centered
      onClose={onClose}
      {...otherProps}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header
          style={() => ({
            paddingBottom: 0,
          })}
        >
          <Stack w="100%">
            <Modal.Title
              style={({ fontSizes }) => ({
                fontSize: fontSizes.lg,
                fontWeight: 700,
              })}
            >
              {title}
            </Modal.Title>
            {subTitle}
          </Stack>
          {withCloseButton && <Modal.CloseButton />}
        </Modal.Header>
        <Modal.Body>
          {shouldDisplayHeaderDivider && <Divider mt="md" />}

          {children}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export { CbModal };
