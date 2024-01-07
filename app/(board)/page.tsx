'use client';
import useCustomToast, { StatusEnum } from '@/Hooks/useCustomToast';
import AddBoardColumnModal from '@/components/AddBoardColumnModal/AddBoardColumnModal';
import ColumnContainer from '@/components/ColumnContainer/ColumnContainer';
import TaskCard from '@/components/TaskCard/TaskCard';
import { motion } from 'framer-motion';
import {
  ADD_UPDATE_COLUMN_TO_PROJECT,
  GET_PROJECT_COLUMNS
} from '@/graphql/queries';
import { generateId } from '@/utils';
import { TasksMockData } from '@/utils/mockdata';
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
  DragOverEvent,
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
  const [activeTask, setActiveTask] = useState<any | null>(null);
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
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = async (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
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
  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId);
        const overIndex = tasks.findIndex(t => t.id === overId);

        if (tasks[activeIndex].column_id != tasks[overIndex].column_id) {
          tasks[activeIndex].column_id = tasks[overIndex].column_id;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === 'Column';
    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId);
        tasks[activeIndex].column_id = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5 } }
  };
  const columnVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: (index: number) => ({
      x: 0,
      opacity: 1,
      transition: { ease: 'easeIn', delay: index * 0.5 }
    })
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
        onDragOver={onDragOver}
        sensors={sensors}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Flex className="horizontal-scroll-column-wrapper">
            {columns && columns?.length > 0 && (
              <SortableContext items={columnsId}>
                {columns?.map((col, i) => (
                  <motion.div key={i} variants={columnVariants} custom={i}>
                    <ColumnContainer
                      updateColumnTitle={updateColumnTitle}
                      column={col}
                      key={col.id}
                      tasks={tasks.filter(task => task.column_id === col.id)}
                    />
                  </motion.div>
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
        </motion.div>
        <DragOverlay>
          {activeColumn && (
            <ColumnContainer
              column={activeColumn}
              updateColumnTitle={updateColumnTitle}
              tasks={tasks.filter(task => task.column_id === activeColumn.id)}
            />
          )}
          {activeTask && <TaskCard task={activeTask} />}
        </DragOverlay>
      </DndContext>
    </Box>
  );
};

export default KanbanBoard;
