import type { Metadata } from 'next';
import './globals.css';
import { Box, ChakraProvider, Divider, Flex } from '@chakra-ui/react';
import { ApolloWrapper } from '@/graphql/ApolloClient';
import ReduxProvider from '@/redux/ReduxProvider';
import TopNav from '@/components/TopNav/TopNav';
import MainContainerWrapper from '@/components/ui/MainContainerWrapper/MainContainerWrapper';
import SideNav from '@/components/SideNav/SideNav';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = false;
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <ChakraProvider>
            <ReduxProvider>
              <MainContainerWrapper>
                {isLoggedIn ? (
                  <Flex>
                    <SideNav />
                    <Divider
                      orientation="vertical"
                      height={'100vh'}
                      width={'2px'}
                    />
                    <Box w="83vw">
                      <TopNav />
                      <Divider width={'100%'} height={'2px'} />
                      {children}
                    </Box>
                  </Flex>
                ) : (
                  <div>{children}</div>
                )}
              </MainContainerWrapper>
            </ReduxProvider>
          </ChakraProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
