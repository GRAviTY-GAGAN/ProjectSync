'use client';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './Navigator.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlineSortDescending } from 'react-icons/hi';
import { BiUser } from 'react-icons/bi';
import { LuFilter } from 'react-icons/lu';

const Navigator = () => {
  let pathName = usePathname();
  pathName = pathName.split('/').join('');
  !pathName && (pathName = 'Board');
  const [currentScreen, setCurrentScreen] = useState<string>(pathName);

  return (
    <Box className="kanban-board-header">
      <Menu>
        <MenuButton>
          <Text
            as="b"
            className="current-screen-indicator"
            fontSize={'x-large'}
          >
            <Text casing={'capitalize'}>{currentScreen}</Text>
            <Text>
              <FaChevronDown className="icon-size-extra-small down" />
            </Text>
          </Text>
        </MenuButton>
        <MenuList>
          <Link href={'/'} onClick={() => setCurrentScreen('Board')}>
            <MenuItem>Board</MenuItem>
          </Link>
          <Link href={'/backlog'} onClick={() => setCurrentScreen('Backlog')}>
            <MenuItem>Backlog</MenuItem>
          </Link>
        </MenuList>
      </Menu>
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
    </Box>
  );
};

export default Navigator;
