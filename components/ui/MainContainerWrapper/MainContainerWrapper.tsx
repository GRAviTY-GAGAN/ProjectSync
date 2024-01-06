'use client';
import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import './index.scss';

const MainContainerWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Box w="100%" minH="100vh" className="main-container-wrapper">
      {children}
    </Box>
  );
};

export default MainContainerWrapper;
