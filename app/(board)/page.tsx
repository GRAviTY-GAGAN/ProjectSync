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
import { useMemo, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import ColumnContainer from '@/components/ColumnContainer/ColumnContainer';
import { Column, ID } from '@/types';
import { createPortal } from 'react-dom';
import './index.scss';

const KanbanBoard = () => {
  const initialColumns = [
    {
      id: 1,
      title: 'TO DO',
      color_scheme: 'red'
    },
    {
      id: 2,
      title: 'IN PROGRESS',
      color_scheme: 'red'
    },
    {
      id: 3,
      title: 'DONE',
      color_scheme: 'red'
    }
  ];
  const [columns, setColumns] = useState(initialColumns);
  const columnsId = useMemo(() => columns.map(col => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddColumn = (data: any) => {
    let v = 4;
    setColumns(prev => [
      ...prev,
      {
        id: v,
        title: data.title,
        color_scheme: data.color_scheme
      }
    ]);
    v = v + 1;
  };
  const onDragStart = (event: DragStartEvent) => {
    console.log(event);
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  };
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(
        col => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(col => col.id === overColumnId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3 //3px
      }
    })
  );
  const updateColumnTitle = (id: ID, title: string) => {
    const newColumns = columns.map(col => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumns(newColumns);
  };
  return (
    <Box minW="100%" p={8} className="kanban-board-container">
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
      <Divider />
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <Flex className="horizontal-scroll-column-wrapper">
          <SortableContext items={columnsId}>
            {columns.length > 0 &&
              columns.map(col => (
                <ColumnContainer
                  updateColumnTitle={updateColumnTitle}
                  column={col}
                  key={col.id}
                />
              ))}
          </SortableContext>
          <Button onClick={onOpen}>+</Button>
          <AddBoardColumnModal
            onCancel={onClose}
            onClose={onClose}
            onSubmit={handleAddColumn}
            isOpen={isOpen}
          />
        </Flex>
        {/* {createPortal(
          <DragOverlay>
            {activeColumn && <ColumnContainer column={activeColumn} />}
          </DragOverlay>,
          window.document.body
        )} */}
      </DndContext>
    </Box>
  );
};

export default KanbanBoard;
