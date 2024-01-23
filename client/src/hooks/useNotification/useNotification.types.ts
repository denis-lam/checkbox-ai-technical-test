import { NotificationData } from '@mantine/notifications';

export interface UseNotification {
  displayErrorNotification: (options?: NotificationData) => void;
  displaySuccessNotification: (options?: NotificationData) => void;
}
