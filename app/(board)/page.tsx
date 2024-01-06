'use client';
import useCustomToast, { StatusEnum } from '@/Hooks/useCustomToast';
import AddBoardColumnModal from '@/components/AddBoardColumnModal/AddBoardColumnModal';
import ColumnContainer from '@/components/ColumnContainer/ColumnContainer';
import {
  ADD_UPDATE_COLUMN_TO_PROJECT,
  GET_PROJECT_COLUMNS
} from '@/graphql/queries';
import { generateId } from '@/utils';
import { Column, ID } from '@/utils/types';
import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useDisclosure
} from '@chakra-ui/react';
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
import { useEffect, useMemo, useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { HiOutlineSortDescending } from 'react-icons/hi';
import { LuFilter } from 'react-icons/lu';
import './index.scss';
import { TasksMockData } from '@/utils/mockdata';

const getColumnsStructuredData = (
  columns: any[]
): { title: any; id: any; color_scheme: any }[] => {
  return columns.map((col: { title: any; id: any; color_scheme: any }) => ({
    title: col.title,
    id: col.id,
    color_scheme: col.color_scheme
  }));
};

const KanbanBoard = () => {
  const [updateColumns] = useMutation(ADD_UPDATE_COLUMN_TO_PROJECT);
  const { loading, error, data } = useQuery(GET_PROJECT_COLUMNS, {
    variables: { id: '65957be9b778ba77dcc9fbaf' }
  });

  const [columns, setColumns] = useState<Column[] | []>([]);
  const [tasks, setTasks] = useState<any[]>(TasksMockData);

  const columnsId = useMemo(() => columns?.map(col => col?.id), [columns]);

  useEffect(() => {
    if (!loading && !error && data) {
      const columnsData = getColumnsStructuredData(
        data.getProjectById.data.columns
      );
      setColumns(columnsData);
    }
  }, [loading, error, data]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [callToast] = useCustomToast();

  const handleAddColumn = async (data: any) => {
    try {
      const newColumn = {
        id: generateId().toString(),
        title: data.title.toUpperCase(),
        color_scheme: data.color_scheme
      };

      setColumns(prevColumns => [...prevColumns, newColumn]);
      const updateColumnsDto = {
        project_id: '65957be9b778ba77dcc9fbaf',
        columns: [...columns, newColumn]
      };

      const response = await updateColumns({ variables: { updateColumnsDto } });

      const responseData = response.data?.updateColumnsInProject;
      callToast({
        title: responseData.message,
        status: responseData.status ? StatusEnum.success : StatusEnum.warning
      });
    } catch (err) {
      console.error(err);
      callToast({
        title: 'Something went wrong while updating columns!!',
        status: StatusEnum.error
      });
    } finally {
      onClose();
    }
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
    }
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns(prevColumns => {
      const updatedColumns = arrayMove(
        prevColumns,
        prevColumns.findIndex(col => col.id === activeColumnId),
        prevColumns.findIndex(col => col.id === overColumnId)
      );

      const updateColumnsDto = {
        project_id: '65957be9b778ba77dcc9fbaf',
        columns: updatedColumns
      };

      updateColumns({ variables: { updateColumnsDto } });
      return updatedColumns;
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3
      }
    })
  );

  const updateColumnTitle = (id: ID, title: string) => {
    setColumns(prevColumns =>
      prevColumns.map(col => (col.id !== id ? col : { ...col, title }))
    );
  };

  return (
    <Box className="kanban-board-container">
      <Box className="kanban-board-header">
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
      </Box>
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <Flex className="horizontal-scroll-column-wrapper">
          {columns && columns?.length > 0 && (
            <SortableContext items={columnsId}>
              {columns?.map(col => (
                <ColumnContainer
                  updateColumnTitle={updateColumnTitle}
                  column={col}
                  key={col.id}
                  tasks={tasks.filter(task => task.column_id === col.id)}
                />
              ))}
            </SortableContext>
          )}
          <Button onClick={onOpen}>+</Button>
          <AddBoardColumnModal
            onCancel={onClose}
            onClose={onClose}
            onSubmit={handleAddColumn}
            isOpen={isOpen}
          />
        </Flex>
        {activeColumn && (
          <DragOverlay>
            <ColumnContainer
              column={activeColumn}
              updateColumnTitle={updateColumnTitle}
              tasks={tasks.filter(task => task.column_id === activeColumn.id)}
            />
          </DragOverlay>
        )}
      </DndContext>
    </Box>
  );
};

export default KanbanBoard;
