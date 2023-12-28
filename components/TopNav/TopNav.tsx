'use client';
import { Avatar, Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';
import React from 'react';
import AddTaskModal from '../addTaskModal/addTaskModal';

const TopNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex alignItems={'center'} p={4} justifyContent={'flex-end'} gap={4}>
      <Button onClick={onOpen}> + Add Task</Button>
      <AddTaskModal isOpen={isOpen} onClose={onClose} />
      <FiBell className="icon-size" />
      <Avatar name="Home" size={'sm'} />
    </Flex>
  );
};

export default TopNav;
