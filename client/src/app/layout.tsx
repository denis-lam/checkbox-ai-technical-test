'use client';

import { ReactNode } from 'react';

import { Roboto } from 'next/font/google';

const font = Roboto({
  subsets: ['latin'],
  weight: '400',
});

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <meta content="initial-scale=1, minimum-scale=1, width=device-width, user-scalable=no" name="viewport" />
      </head>
      <body className={font.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
