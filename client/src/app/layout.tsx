'use client';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

import { ReactNode, useRef } from 'react';

import { ApolloProvider } from '@apollo/client';
import { ColorSchemeScript, MantineProvider, Table, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Roboto } from 'next/font/google';

import { useApolloClient } from '@/hooks';

const font = Roboto({
  subsets: ['latin'],
  weight: '400',
});

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const { getApolloClient } = useApolloClient();

  const apolloClient = useRef(
    getApolloClient({
      apiBaseUrl: String(process.env.NEXT_PUBLIC_API_BASE_URL),
      gqlEndpointPath: String(process.env.NEXT_PUBLIC_API_ENDPOINT_PATH_GRAPHQL),
    }),
  );

  const theme = createTheme({
    /** Put your mantine theme override here */
    colors: {
      gray: ['#fdfdfd', '#e8f0f2', '#dde6e9', '#c1d4da', '#97b5be', '#658598', '#537386', '#3d5c6f', '#2c4a5c', '#1a3545'],
      red: ['#fffafa', '#ffe1e1', '#ffcaca', '#ffa3a3', '#ff6f6f', '#ff4646', '#ff1f1f', '#e00f0f', '#ad1010', '#8f0a0a'],
    },
    components: {
      Table: Table.extend({
        styles({ fontSizes }) {
          return {
            thead: {
              fontSize: fontSizes.sm,
            },
          };
        },
      }),
    },
  });

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <meta content="initial-scale=1, minimum-scale=1, width=device-width, user-scalable=no" name="viewport" />
      </head>
      <body className={font.className}>
        <MantineProvider theme={theme}>
          <ApolloProvider client={apolloClient.current}>{children}</ApolloProvider>
          <Notifications position="top-center" />
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
