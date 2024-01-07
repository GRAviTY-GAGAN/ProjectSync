'use client';
import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

const MainContainerWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Box w="100%" minH="100vh">
      {children}
    </Box>
  );
};

export default MainContainerWrapper;
