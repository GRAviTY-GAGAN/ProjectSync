'use client';
import AddTaskModal from '@/components/addTaskModal/addTaskModal';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';

const Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      page
      <Box>
        <Button onClick={onOpen}>Add Task</Button>
        <AddTaskModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </div>
  );
};

export default Page;
