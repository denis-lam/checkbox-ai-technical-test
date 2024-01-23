import { Suspense } from 'react';

import { Loader } from '@mantine/core';

export const metadata = {
  title: 'Checkbox.ai - Tasks',
};

const ClientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default ClientLayout;
