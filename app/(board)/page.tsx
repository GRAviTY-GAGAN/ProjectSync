'use client';
import AddBoardColumnModal from '@/components/AddBoardColumnModal/AddBoardColumnModal';
import { HiOutlineSortDescending } from 'react-icons/hi';
import { LuFilter } from 'react-icons/lu';
import { BiUser } from 'react-icons/bi';
import {
  Box,
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';

const Column = ({ title }: { title: string }) => {
  return (
    <Box
      minW="20vw"
      minH="60vh"
      borderRadius={4}
      border="1px"
      borderColor="gray.200"
      backgroundColor={'#f8fafc'}
      overflowY={'scroll'}
      mr={3}
    >
      {title}
    </Box>
  );
};

const KanbanBoard = () => {
  const initialColumns = [
    {
      id: 1,
      title: 'TO DO'
    },
    {
      id: 2,
      title: 'IN PROGRESS'
    },
    {
      id: 3,
      title: 'DONE'
    }
  ];
  const [columns, setColumns] = useState(initialColumns);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddColumn = () => {
    let v = 4;
    setColumns(prev => [
      ...prev,
      {
        id: v,
        title: 'XYZ'
      }
    ]);
    v = v + 1;
  };
  return (
    <Box minW="100%" p={8}>
      <Flex alignItems={'center'} justifyContent={'space-between'} mb={4}>
        <Text as="b" fontSize={'x-large'}>
          Board
        </Text>
        <div>
          <Button
            leftIcon={<BiUser className="icon-size-small" />}
            variant={'ghost'}
            size="sm"
          >
            My Issues
          </Button>
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              size="sm"
              variant={'ghost'}
              leftIcon={<LuFilter className="icon-size-small" />}
            >
              Filter
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup type="checkbox">
                <MenuItemOption value="email">Filter 1</MenuItemOption>
                <MenuItemOption value="phone">Filter 2</MenuItemOption>
                <MenuItemOption value="country">Filter 3</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              size="sm"
              variant={'ghost'}
              leftIcon={<HiOutlineSortDescending className="icon-size-small" />}
            >
              Sort
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup type="radio">
                <MenuItemOption value="email">Sort 1</MenuItemOption>
                <MenuItemOption value="phone">Sort 2</MenuItemOption>
                <MenuItemOption value="country">Sort 3</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </div>
      </Flex>
      <Flex overflowX={'scroll'}>
        {columns.length > 0 &&
          columns.map(col => <Column title={col.title} key={col.id} />)}
        <Button onClick={onOpen}>+</Button>
        <AddBoardColumnModal
          onCancel={onClose}
          onClose={onClose}
          onSubmit={handleAddColumn}
          isOpen={isOpen}
        />
      </Flex>
    </Box>
  );
};

export default KanbanBoard;
