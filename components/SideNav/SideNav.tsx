import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import {
  TbBrandTrello,
  TbChartBar,
  TbMessage,
  TbNotes,
  TbSettings
} from 'react-icons/tb';
import './sidenav.scss';

const SideNav = () => {
  return (
    <Box className="side-nav-container">
      <Flex px={4} py={8} gap={4}>
        <Avatar
          borderRadius={3}
          bgGradient={'linear(to-r, #0f2027, #203a43, #2c5364)'}
          color={'white'}
          name="Project Sync"
        />
        <Box>
          <Text fontSize={'lg'} fontWeight={600}>
            Project Name
          </Text>
          <Text fontSize={'small'} color={'grey'}>
            Category
          </Text>
        </Box>
      </Flex>
      <Flex className="side-nav-item">
        <TbNotes className="icon-size" />
        <Text>Backlog</Text>
      </Flex>
      <Flex className="side-nav-item">
        <TbBrandTrello className="icon-size" />
        <Text>Board</Text>
      </Flex>
      <Flex className="side-nav-item">
        <TbChartBar className="icon-size" />
        <Text>Report</Text>
      </Flex>
      <Flex className="side-nav-item">
        <TbMessage className="icon-size" />
        <Text>Inbox</Text>
      </Flex>
      <Flex className="side-nav-item">
        <TbSettings className="icon-size" />
        <Text>Settings</Text>
      </Flex>
    </Box>
  );
};

export default SideNav;
