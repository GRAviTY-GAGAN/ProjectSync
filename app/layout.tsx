import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ApolloWrapper } from '@/GraphQL/ApolloClient';
import ReduxProvider from '@/Redux/ReduxProvider';
import { ChakraProvider } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <ChakraProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </ChakraProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
