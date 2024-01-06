import { Box, Divider, Input, Tag } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { Column, ID } from '../../utils/types';
import './index.scss';
import TaskCard from '../TaskCard/TaskCard';

interface Props {
  column: Column;
  updateColumnTitle: (id: ID, title: string) => void;
  // TODO: change type of Task
  tasks: any[];
}

const ColumnContainer = (props: Props) => {
  const { column, updateColumnTitle, tasks } = props;

  const [editMode, setEditMode] = useState(false);
  const {
    setNodeRef,
    transition,
    transform,
    attributes,
    listeners,
    isDragging
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    },
    disabled: editMode
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };
  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className="column-container-overlay">
        <Tag colorScheme={column.color_scheme} className="column-header-title">
          {column.title}
        </Tag>
        <Divider my={2} />
        <Box className="tasks-container"></Box>
      </div>
    );
  }
  return (
    <Box className="column-container" ref={setNodeRef} style={style}>
      <div
        {...attributes}
        {...listeners}
        style={{ cursor: 'pointer' }}
        onClick={() => setEditMode(true)}
      >
        {!editMode && (
          <Tag
            colorScheme={column.color_scheme}
            className="column-header-title"
          >
            {column.title}
          </Tag>
        )}
        {editMode && (
          <Input
            size={'sm'}
            borderRadius={4}
            value={column.title}
            onChange={e => updateColumnTitle(column.id, e.target.value)}
            autoFocus
            onBlur={() => setEditMode(false)}
            onKeyDown={e => {
              if (e.key !== 'Enter') return;
              setEditMode(false);
            }}
          />
        )}
      </div>
      <Divider my={2} />
      <Box className="tasks-container">
        {tasks &&
          tasks.length > 0 &&
          tasks.map((task: any) => <TaskCard task={task} key={task.id} />)}
      </Box>
    </Box>
  );
};

export default ColumnContainer;
